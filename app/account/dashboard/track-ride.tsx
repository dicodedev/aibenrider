import {
  Animated,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Svg, { Circle, Path, Rect, SvgXml } from "react-native-svg";

import { appService } from "@/api/appService";
import { star } from "@/icons";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Image } from "react-native";
import MapView, { AnimatedRegion, Marker, Polyline } from "react-native-maps";
import { useSelector } from "react-redux";

import * as Location from "expo-location";

import ProfilePicture from "@/assets/images/account/profile-picture.png";
import { Chat } from "@/components/account/chat";

export default function TrackRide() {
  const app = useSelector((state: any) => state.app);
  const [call, setCall] = useState(false);
  const [chat, setChat] = useState(false);
  const [heading, setHeading] = useState(null);
  const [order, setOrder] = useState(null);
  const [chats, setChats] = useState(null);

  const {
    id,
    customer_longitude,
    customer_latitude,
    pickup_longitude,
    pickup_latitude,
    pickup_address,
    customer_address,
    distance,
    duration,
  } = useLocalSearchParams<{
    id: number;
    customer_longitude: number;
    customer_latitude: number;
    pickup_longitude: number;
    pickup_latitude: number;
    pickup_address: string;
    customer_address: string;
    distance: string;
    duration: string;
  }>();

  // console.log("dd", {
  //   customer_longitude,
  //   customer_latitude,
  //   pickup_longitude,
  //   pickup_latitude,
  //   pickup_address,
  //   customer_address,
  //   distance,
  //   duration,
  //   latitude: app?.latitude,
  //   longitude: app?.longitude,
  // });

  const roomId = `order_${id}`;

  const socketRef = useRef(null);

  const origin = {
    latitude: parseFloat(pickup_latitude),
    longitude: parseFloat(pickup_longitude),
  };
  const destination = {
    latitude: parseFloat(customer_latitude),
    longitude: parseFloat(customer_longitude),
  };

  const getOrderDetails = async () => {
    const res = await appService.getOrder(id);
    console.log("order", res.data.account_number, res.data.full_status);

    setOrder(res.data);
  };

  // console.log(origin, destination);
  const [routeCoords, setRouteCoords] = useState(null);
  const mapRef = useRef(null);

  const animatedRegion = useRef(
    new AnimatedRegion({
      latitude: app?.latitude ?? 0,
      longitude: app?.longitude ?? 0,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }),
  ).current;

  const headingAnim = useRef(new Animated.Value(0)).current;

  // const rotate = headingAnim.interpolate({
  //   inputRange: [0, 360],
  //   outputRange: ["0deg", "360deg"],
  // });

  const getBearing = (initial, current) => {
    const lat1 = (initial.latitude * Math.PI) / 180;
    const lon1 = (initial.longitude * Math.PI) / 180;
    const lat2 = (current.latitude * Math.PI) / 180;
    const lon2 = (current.longitude * Math.PI) / 180;

    const dLon = lon2 - lon1;

    const y = Math.sin(dLon) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

    const brng = Math.atan2(y, x);

    return ((brng * 180) / Math.PI + 360) % 360; //return heading
  };

  // Polyline decoder
  const decodePolyline = (t) => {
    let points = [];
    let index = 0,
      lat = 0,
      lng = 0;

    while (index < t.length) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      });
    }

    return points;
  };

  const getDirections = async (origin, destination) => {
    try {
      const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
      console.log("API_KEY", API_KEY);

      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${API_KEY}`;

      const { data } = await axios.get(url, { timeout: 10000 });
      // console.log("Directions:", data);

      // console.log("json", data, data?.routes?.length);

      if (data?.routes?.length) {
        setRouteCoords(
          decodePolyline(data?.routes[0].overview_polyline.points),
        );
      }
      return null;
    } catch (error) {
      console.log("error", error);
      return null;
    }
  };

  const fitMap = () => {
    if (mapRef.current && routeCoords?.length) {
      const coordinates = [origin, destination, ...routeCoords];

      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: {
          top: 80,
          right: 80,
          bottom: 80,
          left: 80,
        },
        animated: true,
      });
    }
  };

  const updatePosition = (coords) => {
    const { latitude, longitude, heading } = coords;

    console.log("current", coords);

    animatedRegion
      .timing({
        latitude,
        longitude,
        duration: 800,
        useNativeDriver: false,
      })
      .start();

    Animated.timing(headingAnim, {
      toValue: heading,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setHeading(heading);

    mapRef.current.animateCamera({
      center: {
        latitude,
        longitude,
      },
      zoom: 17,
    });
  };

  useEffect(() => {
    const socket = new WebSocket("wss://socket.aibenmart.com/ws");

    socket.onopen = () => {
      console.log("Connected to WebSocket server");

      socket.send(
        JSON.stringify({
          type: "init",
          user: app.user,
          roomId,
        }),
      );
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // console.log("data", data, data.data.coords);

      if (["dataSent"].includes(data.type)) {
        updatePosition(data.data.coords);
      }
    };

    socket.onerror = (error) => {
      console.log("WebSocket error:", error, error.message);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    socketRef.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  const sendData = (data) => {
    // console.log("sent data", data);

    socketRef.current?.send(
      JSON.stringify({
        type: "data", //location-change
        user: app.user,
        roomId,
        data, //cordinates
      }),
    );
  };

  useEffect(() => {
    let subscription;

    const startTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (location) => {
          sendData({
            coords: location.coords,
          });
        },
      );
    };

    startTracking();

    return () => {
      subscription?.remove();
    };
  }, []);

  useEffect(() => {
    getOrderDetails();
  }, []);

  useEffect(() => {
    if (!app.user) return;

    const fetchDirections = async () => {
      await getDirections(origin, destination);
    };

    fetchDirections();
  }, [app.user]);

  useEffect(() => {
    const timer = setTimeout(fitMap, 400);
    return () => clearTimeout(timer);
  }, [routeCoords]);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Pressable
        onPress={() => router.back()}
        style={{
          borderRadius: 6,
          backgroundColor: "#ffffff",
          position: "absolute",
          left: 20,
          top: 100,
          width: 50,
          height: 45,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 600,
        }}
      >
        <Svg width="24" height="18" viewBox="0 0 24 18" fill="none">
          <Path
            d="M22.3333 9L1 9M1 9L9 0.999999M1 9L9 17"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </Svg>
      </Pressable>
      {order && chats && order.rider && chat && (
        <Chat
          customer={app.user}
          user={order.rider}
          visible={chat}
          data={chats?.messages ?? []}
          roomId={`chat_${chats?.chat.id}`}
          setVisible={setChat}
        />
      )}
      <ScrollView
        style={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <MapView
          style={{
            flex: 1,
            height: 600,
            position: "absolute",
            zIndex: -1,
            top: 0,
            left: 0,
            width: "100%",
          }}
          ref={mapRef}
          onMapReady={fitMap}
          onLayout={fitMap}
          provider="google"
          overrideUserInterfaceStyle="light"
          initialRegion={{
            ...origin,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={destination} pinColor="#100152" title="Customer">
            {/* <View
                  style={{
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: 54,
                        height: 54,
                        borderRadius: "100%",
                        backgroundColor: "#FBAF41",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: "HostGroteskBold",
                          textAlign: "center",
                          lineHeight: 20,
                          margin: 0,
                        }}
                      >
                        {app.duration.split(" ")[0]}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "HostGroteskBold",
                          textAlign: "center",
                          lineHeight: 14,
                        }}
                      >
                        {app.duration.split(" ")[1]}
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 30,
                        width: 4,
                        backgroundColor: "#000000",
                      }}
                    ></View>
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "100%",
                        backgroundColor: "#FBAF41",
                      }}
                    ></View>
                  </View>
                </View> */}
          </Marker>
          <Marker coordinate={origin} pinColor="#ff0000" title="Pick Up">
            {/* <SvgXml xml={deliveryMark()} width={180} height={90} /> */}
          </Marker>
          <Marker.Animated
            coordinate={animatedRegion}
            anchor={{ x: 0.5, y: 0.5 }}
            tracksViewChanges={true}
            image={require("@/assets/images/car-small.png")}
            rotation={Number.isFinite(heading) ? heading : 0} // ✅
            flat={true}
          />
          {routeCoords && (
            <Polyline
              key={routeCoords.length}
              coordinates={routeCoords}
              strokeWidth={6}
              strokeColor="blue"
            />
          )}
        </MapView>
        <View
          style={{
            padding: 10,
            backgroundColor: "#F5F5F5",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            width: "100%",
            marginTop: 500,
          }}
        >
          <Four
            order={order}
            pickup_address={pickup_address}
            customer_address={customer_address}
            distance={distance}
            duration={duration}
            setChat={setChat}
          />
        </View>
      </ScrollView>
      {/* {step == 1 ? (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            backgroundColor: "#fff",
            width: "100%",
            paddingVertical: 30,
            paddingHorizontal: 15,
            zIndex: 1000,
          }}
        >
          <Pressable
            style={{
              width: "100%",
              backgroundColor: "#100152",
              paddingVertical: 20,
              borderRadius: 12,
            }}
            onPress={() => setStep(2)}
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontFamily: "HostGroteskBold",
                fontSize: 16,
              }}
            >
              SELECT RIDE
            </Text>
          </Pressable>
        </View>
      ) : (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            backgroundColor: "#fff",
            width: "100%",
            paddingVertical: 30,
            paddingHorizontal: 15,
            zIndex: 1000,
          }}
        >
          <Pressable
            style={{
              width: "100%",
              backgroundColor: "#100152",
              paddingVertical: 20,
              borderRadius: 12,
            }}
            onPress={() =>
              step != 4
                ? setStep(4)
                : router.push("/account/rides/make-payment")
            }
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontFamily: "HostGroteskBold",
                fontSize: 16,
              }}
            >
              {step != 4 ? "CONTINUE" : "MAKE PAYMENT"}
            </Text>
          </Pressable>
        </View>
      )} */}
    </View>
  );
}

const Four = ({
  order,
  pickup_address,
  customer_address,
  distance,
  duration,
  setChat,
}) => {
  return (
    <View
      style={{
        paddingBottom: 100,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          marginTop: 20,
          paddingRight: 20,
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "HostGroteskBold",
            fontSize: 24,
          }}
        >
          Driver on the way
        </Text>
        <Pressable onPress={() => {}}>
          <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <Path
              d="M1.125 16.875L9 9M9 9L16.875 1.125M9 9L1.125 1.125M9 9L16.875 16.875"
              stroke="black"
              stroke-width="2.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </Svg>
        </Pressable>
      </View>
      {order && order.completed ? (
        <View
          style={{
            backgroundColor: "#E6F5E0",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            paddingLeft: 20,
            paddingVertical: 5,
          }}
        >
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: "100%",
              backgroundColor: "#CDEFBF",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Svg width="21" height="19" viewBox="0 0 21 19" fill="none">
              <Path
                d="M17.7374 16.694H3.13012V17.7374C3.13012 18.0141 3.02019 18.2795 2.82452 18.4751C2.62885 18.6708 2.36347 18.7807 2.08675 18.7807H1.04337C0.766654 18.7807 0.501268 18.6708 0.305597 18.4751C0.109927 18.2795 0 18.0141 0 17.7374V7.30362L2.58757 1.26457C2.74858 0.888955 3.01635 0.568888 3.35763 0.344084C3.69892 0.119281 4.0987 -0.000362643 4.50738 8.2569e-07H16.3601C16.7684 4.5921e-05 17.1678 0.119881 17.5086 0.344659C17.8495 0.569437 18.1169 0.889282 18.2778 1.26457L20.8675 7.30362V17.7374C20.8675 18.0141 20.7576 18.2795 20.5619 18.4751C20.3662 18.6708 20.1008 18.7807 19.8241 18.7807H18.7807C18.504 18.7807 18.2386 18.6708 18.043 18.4751C17.8473 18.2795 17.7374 18.0141 17.7374 17.7374V16.694ZM18.7807 9.39037H2.08675V14.6072H18.7807V9.39037ZM2.27038 7.30362H18.5971L16.3611 2.08675H4.50738L2.27038 7.30362ZM4.69518 13.5639C4.2801 13.5639 3.88202 13.399 3.58852 13.1055C3.29501 12.812 3.13012 12.4139 3.13012 11.9988C3.13012 11.5837 3.29501 11.1856 3.58852 10.8921C3.88202 10.5986 4.2801 10.4337 4.69518 10.4337C5.11026 10.4337 5.50834 10.5986 5.80185 10.8921C6.09535 11.1856 6.26024 11.5837 6.26024 11.9988C6.26024 12.4139 6.09535 12.812 5.80185 13.1055C5.50834 13.399 5.11026 13.5639 4.69518 13.5639ZM16.1723 13.5639C15.7572 13.5639 15.3591 13.399 15.0656 13.1055C14.7721 12.812 14.6072 12.4139 14.6072 11.9988C14.6072 11.5837 14.7721 11.1856 15.0656 10.8921C15.3591 10.5986 15.7572 10.4337 16.1723 10.4337C16.5874 10.4337 16.9855 10.5986 17.279 10.8921C17.5725 11.1856 17.7374 11.5837 17.7374 11.9988C17.7374 12.4139 17.5725 12.812 17.279 13.1055C16.9855 13.399 16.5874 13.5639 16.1723 13.5639Z"
                fill="#49932C"
              />
            </Svg>
          </View>
          <Text
            style={{
              fontFamily: "HostGroteskBold",
              fontSize: 18,
              marginBottom: 3,
            }}
          >
            You have arrived
          </Text>
        </View>
      ) : (
        <View
          style={{
            backgroundColor: "#FFE9CE",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            paddingLeft: 20,
            paddingVertical: 5,
          }}
        >
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: "100%",
              backgroundColor: "#FFC176",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Svg width="21" height="19" viewBox="0 0 21 19" fill="none">
              <Path
                d="M17.7374 16.694H3.13012V17.7374C3.13012 18.0141 3.02019 18.2795 2.82452 18.4751C2.62885 18.6708 2.36347 18.7807 2.08675 18.7807H1.04337C0.766654 18.7807 0.501268 18.6708 0.305597 18.4751C0.109927 18.2795 0 18.0141 0 17.7374V7.30362L2.58757 1.26457C2.74858 0.888955 3.01635 0.568888 3.35763 0.344084C3.69892 0.119281 4.0987 -0.000362643 4.50738 8.2569e-07H16.3601C16.7684 4.5921e-05 17.1678 0.119881 17.5086 0.344659C17.8495 0.569437 18.1169 0.889282 18.2778 1.26457L20.8675 7.30362V17.7374C20.8675 18.0141 20.7576 18.2795 20.5619 18.4751C20.3662 18.6708 20.1008 18.7807 19.8241 18.7807H18.7807C18.504 18.7807 18.2386 18.6708 18.043 18.4751C17.8473 18.2795 17.7374 18.0141 17.7374 17.7374V16.694ZM18.7807 9.39037H2.08675V14.6072H18.7807V9.39037ZM2.27038 7.30362H18.5971L16.3611 2.08675H4.50738L2.27038 7.30362ZM4.69518 13.5639C4.2801 13.5639 3.88202 13.399 3.58852 13.1055C3.29501 12.812 3.13012 12.4139 3.13012 11.9988C3.13012 11.5837 3.29501 11.1856 3.58852 10.8921C3.88202 10.5986 4.2801 10.4337 4.69518 10.4337C5.11026 10.4337 5.50834 10.5986 5.80185 10.8921C6.09535 11.1856 6.26024 11.5837 6.26024 11.9988C6.26024 12.4139 6.09535 12.812 5.80185 13.1055C5.50834 13.399 5.11026 13.5639 4.69518 13.5639ZM16.1723 13.5639C15.7572 13.5639 15.3591 13.399 15.0656 13.1055C14.7721 12.812 14.6072 12.4139 14.6072 11.9988C14.6072 11.5837 14.7721 11.1856 15.0656 10.8921C15.3591 10.5986 15.7572 10.4337 16.1723 10.4337C16.5874 10.4337 16.9855 10.5986 17.279 10.8921C17.5725 11.1856 17.7374 11.5837 17.7374 11.9988C17.7374 12.4139 17.5725 12.812 17.279 13.1055C16.9855 13.399 16.5874 13.5639 16.1723 13.5639Z"
                fill="#D88814"
              />
            </Svg>
          </View>
          <Text
            style={{
              fontFamily: "HostGroteskBold",
              fontSize: 18,
              marginBottom: 3,
            }}
          >
            Trip in progress
          </Text>
        </View>
      )}
      {order && order.rider && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 20,
            marginTop: 20,
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 10,
            }}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: "100%",
                backgroundColor: "#A380FF",
                padding: 2,
              }}
            >
              <Image
                source={
                  order
                    ? order?.rider.picture && order?.rider.picture != "null"
                      ? { uri: order?.rider.picture }
                      : ProfilePicture
                    : ProfilePicture
                }
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 100,
                }}
              />
            </View>
            <View>
              <Text
                style={{
                  color: "#686868",
                  fontFamily: "HostGroteskBold",
                  fontSize: 14,
                  marginBottom: 3,
                }}
              >
                Your Rider
              </Text>
              <Text
                style={{
                  color: "#000000",
                  fontFamily: "HostGroteskBold",
                  fontSize: 16,
                  marginBottom: 8,
                }}
              >
                {order.rider.name}
              </Text>
              {order.type != "marketplace" && (
                <Text
                  style={{
                    fontFamily: "HostGroteskBold",
                    fontSize: 14,
                  }}
                >
                  {order.items[0].itemable.plate_number}
                </Text>
              )}
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                gap: 20,
                marginBottom: 10,
              }}
            >
              <Pressable
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "100%",
                  backgroundColor: "#CCD9F8",
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: order.full_status == "completed" ? 0.4 : 1,
                }}
                onPress={
                  order.full_status == "completed"
                    ? () => {}
                    : () => Linking.openURL(`tel:${order.rider.phone_number}`)
                }
              >
                <Svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <Path
                    d="M2.00816 6.25199L3.9989 4.26124C4.19668 4.06016 4.33657 3.80947 4.40385 3.53556C4.47114 3.26166 4.46331 2.97468 4.38121 2.70485C4.24171 2.24584 4.11846 1.78205 4.01172 1.31434C3.92425 0.904883 3.56456 0.565552 3.14529 0.565552H2.00816C1.17114 0.565552 0.482677 1.24723 0.574673 2.07972C1.27294 8.40787 6.29806 13.4322 12.6255 14.1305C13.4579 14.2225 14.1396 13.5348 14.1396 12.6978V11.5591C14.1396 11.1414 13.7988 10.7975 13.3871 10.7221C12.9345 10.6341 12.4878 10.5185 12.0493 10.376C11.471 10.192 10.8285 10.3217 10.3994 10.75L8.45319 12.697"
                    stroke="#100152"
                    stroke-width="1.1311"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              </Pressable>
              <Pressable
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "100%",
                  backgroundColor: "#E0FAD5",
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: order.full_status == "completed" ? 0.4 : 1,
                }}
                onPress={
                  order.full_status == "completed"
                    ? () => {}
                    : () => setChat(true)
                }
              >
                <Svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <Path
                    d="M8.35694 10.3671H16.8091M8.35694 14.8008H14.3846M12.583 22.284C14.6902 22.2835 16.7399 21.597 18.4221 20.3281C20.1044 19.0592 21.3277 17.277 21.9071 15.2511C22.4865 13.2251 22.3904 11.0656 21.6334 9.09913C20.8764 7.13265 19.4997 5.46615 17.7114 4.35167C15.9231 3.23718 13.8205 2.73533 11.7216 2.922C9.62274 3.10867 7.64173 3.97372 6.07819 5.38632C4.51465 6.79891 3.45361 8.68223 3.05553 10.7514C2.65746 12.8207 2.94401 14.9632 3.87184 16.8551C3.98509 17.0858 4.02285 17.3459 3.96517 17.5955L3.10947 21.3035C3.08534 21.4076 3.08811 21.5161 3.11751 21.6187C3.14691 21.7214 3.20196 21.815 3.2775 21.8905C3.35303 21.966 3.44655 22.0211 3.54925 22.0505C3.65195 22.0799 3.76044 22.0827 3.8645 22.0585L7.5715 21.2018C7.82178 21.147 8.08332 21.1803 8.31185 21.2962C9.64091 21.9488 11.1024 22.2868 12.583 22.284Z"
                    stroke="#49932C"
                    stroke-width="2.09731"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              </Pressable>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 3,
                }}
              >
                <SvgXml xml={star()} width={18} height={18} />
                <SvgXml xml={star()} width={18} height={18} />
                <SvgXml xml={star()} width={18} height={18} />
                <SvgXml xml={star()} width={18} height={18} />
              </View>
              <Text
                style={{
                  color: "#686868",
                  fontFamily: "HostGroteskBold",
                  fontSize: 14,
                }}
              >
                4.5
              </Text>
            </View>
          </View>
        </View>
      )}

      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: "10",
            alignItems: "center",
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderColor: "#DCDCDC",
            paddingBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 48,
                height: 48,
                backgroundColor: "#E0FAD5",
                borderRadius: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Svg width="26" height="22" viewBox="0 0 26 22" fill="none">
                <Path
                  d="M15.4583 9.04167C15.4583 9.81522 15.151 10.5571 14.6041 11.1041C14.0571 11.651 13.3152 11.9583 12.5417 11.9583C11.7681 11.9583 11.0263 11.651 10.4793 11.1041C9.93229 10.5571 9.625 9.81522 9.625 9.04167C9.625 8.26812 9.93229 7.52625 10.4793 6.97927C11.0263 6.43229 11.7681 6.125 12.5417 6.125C13.3152 6.125 14.0571 6.43229 14.6041 6.97927C15.151 7.52625 15.4583 8.26812 15.4583 9.04167Z"
                  stroke="#49932C"
                  stroke-width="1.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  d="M17.2084 0.875C20.1017 0.875 22.0967 1.323 23.1969 1.66367C23.8304 1.86083 24.2084 2.4605 24.2084 3.12317V14.504C24.2084 15.8048 22.7757 16.7837 21.497 16.5433C20.4004 16.3357 18.9712 16.17 17.2084 16.17C11.6667 16.17 10.3367 18.2758 2.21087 16.485C1.8297 16.3986 1.48949 16.1846 1.24655 15.8784C1.00362 15.5723 0.872544 15.1923 0.875035 14.8015V3.11617C0.875035 1.9775 1.94837 1.148 3.06603 1.36967C10.4382 2.8315 11.8662 0.875 17.2084 0.875Z"
                  stroke="#49932C"
                  stroke-width="1.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  d="M0.875 5.54165C3.15117 5.54165 5.1975 3.68081 5.45883 1.75465M20.125 1.45831C20.125 3.83831 22.1842 6.08881 24.2083 6.08881M24.2083 12.5416C21.9917 12.5416 19.845 14.07 19.6607 16.156M5.54167 16.6203C5.54167 15.3826 5.05 14.1957 4.17483 13.3205C3.29966 12.4453 2.11268 11.9536 0.875 11.9536M20.7083 19.8135C19.551 19.628 18.3804 19.5371 17.2083 19.5416C12.1987 19.5416 10.6307 21.4783 4.375 20.3618"
                  stroke="#49932C"
                  stroke-width="1.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </Svg>
            </View>
            <Text
              style={{
                fontFamily: "HostGroteskBold",
                fontSize: 20,
              }}
            >
              ₦ {Number(order?.total ?? 0).toLocaleString()}
            </Text>
          </View>
          {order && order.type != "marketplace" && (
            <Text
              style={{
                fontFamily: "HostGroteskBold",
                fontSize: 16,
                color: "#9F9F9F",
              }}
            >
              {order.items[0].itemable.category.name}
            </Text>
          )}
        </View>
      </View>
      <View
        style={{
          marginTop: 20,
          borderBottomWidth: 1,
          borderBottomColor: "#DCDCDC",
          paddingBottom: 60,
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "HostGroteskBold",
            fontSize: 20,
          }}
        >
          My route
        </Text>
        <View
          style={{
            position: "relative",
          }}
        >
          <Text
            style={{
              fontFamily: "HostGroteskBold",
              fontSize: 16,
              paddingVertical: 30,
              paddingLeft: 50,
              borderBottomWidth: 1,
              borderBottomColor: "#DCDCDC",
            }}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {pickup_address}
          </Text>
          <Text
            style={{
              fontFamily: "HostGroteskBold",
              fontSize: 16,
              paddingVertical: 30,
              paddingLeft: 50,
            }}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {customer_address}
          </Text>
          <View
            style={{
              width: 20,
              alignItems: "center",
              position: "absolute",
              left: 10,
              top: "50%",
              zIndex: 100,
              transform: [
                {
                  translateY: "-50%",
                },
              ],
            }}
          >
            <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <Rect width="22" height="22" rx="11" fill="#FBAF41" />
              <Circle cx="11" cy="11" r="8" fill="white" />
            </Svg>
            <View
              style={{
                width: 3,
                height: 65,
                backgroundColor: "#CDCACA",
              }}
            ></View>
            <Svg width="20" height="23" viewBox="0 0 20 23" fill="none">
              <Path
                d="M10.2281 21.2472C10.0439 21.3795 9.82276 21.4507 9.59591 21.4507C9.36907 21.4507 9.14794 21.3795 8.96369 21.2472C3.51191 17.3613 -2.27405 9.36817 3.57513 3.59237C5.18091 2.01278 7.34344 1.12798 9.59591 1.12897C11.8538 1.12897 14.0203 2.01521 15.6167 3.59125C21.4659 9.36704 15.6799 17.359 10.2281 21.2472Z"
                stroke="#1248C7"
                stroke-width="2.25793"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <Path
                d="M9.59583 11.2897C10.1947 11.2897 10.769 11.0518 11.1924 10.6283C11.6159 10.2049 11.8538 9.63058 11.8538 9.03174C11.8538 8.4329 11.6159 7.85858 11.1924 7.43514C10.769 7.01169 10.1947 6.7738 9.59583 6.7738C8.99698 6.7738 8.42267 7.01169 7.99922 7.43514C7.57578 7.85858 7.33789 8.4329 7.33789 9.03174C7.33789 9.63058 7.57578 10.2049 7.99922 10.6283C8.42267 11.0518 8.99698 11.2897 9.59583 11.2897Z"
                stroke="#1248C7"
                stroke-width="2.25793"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </Svg>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 30,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "HostGroteskBold",
              fontSize: 14,
              color: "#686868",
            }}
          >
            {distance}
          </Text>
          <Text
            style={{
              fontFamily: "HostGroteskBold",
              fontSize: 14,
              color: "#686868",
            }}
          >
            {duration}
          </Text>
        </View>

        <View
          style={{
            alignItems: "center",
            marginTop: 0,
          }}
        >
          {/* <Pressable
            style={{
              width: "100%",
              backgroundColor: "#E8E8E8",
              paddingVertical: 20,
              borderRadius: 12,
            }}
            onPress={() => {}}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "HostGroteskBold",
                fontSize: 16,
              }}
            >
              CANCEL RIDE
            </Text>
          </Pressable> */}
          {order && !order.paid ? (
            <Pressable
              style={{
                width: "100%",
                backgroundColor: "#100152",
                paddingVertical: 20,
                borderRadius: 12,
              }}
              onPress={() => {}}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontFamily: "HostGroteskBold",
                  fontSize: 16,
                }}
              >
                COMPLETED TRIP
              </Text>
            </Pressable>
          ) : (
            <></>
          )}
        </View>
      </View>
    </View>
  );
};
