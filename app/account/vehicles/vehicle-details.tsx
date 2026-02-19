import { Pressable, ScrollView, Text, View } from "react-native";

import { appService } from "@/api/appService";
import { GlowBG } from "@/components/account/glow-bg";
import { ServiceCard } from "@/components/account/service-card";
import { CustomModal } from "@/components/custom-modal";
import { arrowLeft } from "@/icons";
import { appSlice } from "@/store/appSlice";
import { router, useLocalSearchParams } from "expo-router";
import { Skeleton } from "moti/skeleton";
import { useEffect, useRef, useState } from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Path, SvgXml } from "react-native-svg";
import Swiper from "react-native-swiper";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

import ScalingDots from "@/components/scaling-dots";
import { sOptions } from "@/constants/app";

export default function VehicleDetails() {
  const app = useSelector((state: any) => state.app);

  const user = app.user;

  const { id } = useLocalSearchParams();

  const [selected, setSelected] = useState([]);

  const [vehicle, setVehicle] = useState(null);

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const swiperRef = useRef(null);

  const fetchVehicles = async () => {
    const res = await appService.getVehicle(id);

    setVehicle(res.data);
  };

  const activate = async () => {
    try {
      setLoading(true);

      await appService.activateVehicle(vehicle.id);

      setVisible("Vehicle Activated");
    } catch (error: any) {
      console.log("error", error);

      Toast.show({
        type: "error",
        text1: "Activation Failed",
        text2:
          (error.errors !== undefined && error.errors[0]
            ? error.errors[0]
            : error.message) || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    !visible && fetchVehicles();
  }, [visible]);

  useEffect(() => {
    if (!vehicle) return;

    setSelected(vehicle.purpose);
  }, [vehicle]);

  return (
    <View style={{ flex: 1 }}>
      <GlowBG />
      <CustomModal
        setVisible={setVisible}
        visible={visible}
        content={<SuccessModal visible={visible} setVisible={setVisible} />}
      />
      {vehicle && (
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
            gap: 20,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <Pressable
            onPress={
              vehicle?.active == 0 && vehicle.status == "live"
                ? () => activate()
                : () => {}
            }
            style={{
              width: "100%",
              backgroundColor: "#100152",
              paddingVertical: 20,
              borderRadius: 12,
              opacity:
                vehicle?.active == 0 && vehicle.status == "live" ? 1 : 0.6,
            }}
          >
            {loading ? (
              <ScalingDots
                dotCount={3}
                dotSize={9}
                dotColor="#ffffff"
                speed={300}
                style={{
                  marginVertical: 5,
                }}
                scaleRange={[1, 1.5]}
              />
            ) : (
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontFamily: "HostGroteskBold",
                  fontSize: 16,
                }}
              >
                Activate Vehicle
              </Text>
            )}
          </Pressable>
          <Pressable
            onPress={() =>
              router.push("/account/vehicles/edit-vehicle/" + vehicle?.id)
            }
            style={{
              width: "100%",
              backgroundColor: "#EEEEEE",
              paddingVertical: 20,
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "HostGroteskBold",
                fontSize: 16,
              }}
            >
              Edit Vehicle
            </Text>
          </Pressable>
        </View>
      )}

      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 10,
        }}
        edges={["left", "right", "top"]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 45,
                fontFamily: "HostGroteskBold",
                lineHeight: 45,
                width: 300,
              }}
            >
              {vehicle ? (
                vehicle.name
              ) : (
                <Skeleton
                  colorMode="light"
                  height={25}
                  width={150}
                  radius={5}
                />
              )}
            </Text>
            <Pressable
              onPress={() => router.back()}
              hitSlop={40}
              style={{
                height: 70,
                width: 70,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SvgXml xml={arrowLeft()} width={21} height={16} />
            </Pressable>
          </View>

          <View
            style={{
              alignItems: "center",
              marginTop: 30,
              paddingHorizontal: 15,
            }}
          >
            {vehicle ? (
              <View
                style={{
                  flex: 1,
                  marginBottom: 50,
                  position: "relative",

                  alignItems: "center",
                }}
              >
                <Pressable
                  onPress={() => swiperRef?.current?.scrollBy(-1)}
                  style={{
                    width: 32,
                    height: 32,
                    backgroundColor: "#5D5D5D",
                    borderRadius: "100%",
                    position: "absolute",
                    left: 10,
                    top: "50%",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1000,
                    transform: [
                      {
                        translateY: "-50%",
                      },
                    ],
                  }}
                >
                  <Svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                    <Path
                      d="M7.62144 12.7239L6.48794 13.8563L0.314036 7.68453C0.214516 7.58563 0.135536 7.46804 0.0816407 7.3385C0.0277454 7.20897 -6.18083e-07 7.07005 -6.05818e-07 6.92975C-5.93553e-07 6.78945 0.0277454 6.65053 0.0816407 6.521C0.135536 6.39146 0.214516 6.27387 0.314037 6.17497L6.48794 5.67194e-07L7.62037 1.13244L1.82573 6.92815L7.62144 12.7239Z"
                      fill="white"
                    />
                  </Svg>
                </Pressable>
                <Pressable
                  onPress={() => {
                    swiperRef?.current?.scrollBy(1);
                  }}
                  style={{
                    width: 32,
                    height: 32,
                    backgroundColor: "#5D5D5D",
                    borderRadius: "100%",
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1000,
                    transform: [
                      {
                        translateY: "-50%",
                      },
                    ],
                  }}
                >
                  <Svg width="7" height="13" viewBox="0 0 7 13" fill="none">
                    <Path
                      d="M2.86102e-05 0.987541L0.988526 -2.38419e-05L6.37262 5.38221C6.45941 5.46845 6.52829 5.571 6.57529 5.68397C6.62229 5.79693 6.64648 5.91808 6.64648 6.04043C6.64648 6.16278 6.62229 6.28393 6.57529 6.39689C6.52829 6.50986 6.45941 6.61241 6.37262 6.69865L0.988526 12.0837L0.00096035 11.0961L5.05431 6.04183L2.86102e-05 0.987541Z"
                      fill="white"
                    />
                  </Svg>
                </Pressable>
                <Swiper
                  style={{
                    height: 210,
                  }}
                  ref={swiperRef}
                  showsPagination={true}
                  paginationStyle={{
                    bottom: -40,
                    gap: 8,
                  }}
                  dot={
                    <View
                      style={{
                        height: 8,
                        width: 8,
                        backgroundColor: "#A09F9F",
                        borderRadius: 100,
                      }}
                    />
                  }
                  activeDot={
                    <View
                      style={{
                        height: 8,
                        width: 30,
                        backgroundColor: "#000000",
                        borderRadius: 100,
                      }}
                    />
                  }
                >
                  {(vehicle ? vehicle.images : []).map((item, key) => (
                    <View
                      style={{
                        flex: 1,
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <Pressable
                        onPress={() => {
                          if (!vehicle || !vehicle.images.length) return;

                          dispatch(appSlice.actions.setImages(vehicle?.images));

                          router.push({
                            pathname: "/account/vehicles/preview",
                            params: {
                              currentIndex: 0,
                            },
                          });
                        }}
                        key={key}
                        style={{
                          width: 320,
                          height: 210,
                          borderRadius: "100%",
                          overflow: "hidden",

                          alignItems: "center",
                        }}
                      >
                        <Image
                          source={{ uri: item.url }}
                          style={{
                            width: 210,
                            height: 210,
                            borderRadius: 100,
                          }}
                        />
                      </Pressable>
                    </View>
                  ))}
                </Swiper>
              </View>
            ) : (
              <Skeleton
                colorMode="light"
                height={210}
                width={210}
                radius={"100%"}
              />
            )}
          </View>
          <View
            style={{
              borderRadius: 10,
              paddingVertical: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
              }}
            >
              {vehicle ? (
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "HostGroteskBold",
                  }}
                >
                  {vehicle.category.name}
                </Text>
              ) : (
                <Skeleton
                  colorMode="light"
                  height={20}
                  width={100}
                  radius={5}
                />
              )}

              {vehicle ? (
                <Image
                  source={{ uri: vehicle.category.image }}
                  style={{
                    width: 70,
                    height: 40,
                  }}
                />
              ) : (
                <Skeleton colorMode="light" height={40} width={70} radius={2} />
              )}
            </View>
            <View
              style={{
                marginTop: 10,
              }}
            >
              {vehicle ? (
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: "HostGroteskBold",
                  }}
                >
                  {vehicle.plate_number}
                </Text>
              ) : (
                <View
                  style={{
                    marginBottom: 10,
                  }}
                >
                  <Skeleton
                    colorMode="light"
                    height={15}
                    width={150}
                    radius={5}
                  />
                </View>
              )}

              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "HostGrotesk",
                  fontStyle: "italic",
                }}
              >
                {vehicle ? (
                  vehicle.name + " . " + vehicle.color
                ) : (
                  <Skeleton
                    colorMode="light"
                    height={15}
                    width={250}
                    radius={5}
                  />
                )}
              </Text>
            </View>
            {vehicle && vehicle.description ? (
              <View>
                <Text
                  style={{
                    marginTop: 40,
                    fontSize: 20,
                    fontFamily: "HostGroteskBold",
                  }}
                >
                  Vehicle Description
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "HostGrotesk",
                    marginTop: 10,
                  }}
                >
                  {vehicle.description}
                </Text>
              </View>
            ) : (
              <></>
            )}
          </View>

          {vehicle && (
            <View
              style={{
                paddingBottom: 200,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 40,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "HostGroteskBold",
                    flex: 1,
                  }}
                >
                  Services enabled
                </Text>
              </View>
              <View
                style={{
                  gap: 20,
                  marginVertical: 20,
                  marginBottom: 40,
                }}
              >
                {sOptions.map((item, key) => (
                  <ServiceCard
                    editable={false}
                    key={key}
                    color={item.color}
                    icon={item.icon}
                    title={item.title}
                    borderColor={item.borderColor}
                    text={item.text}
                    active={selected.includes(item.title.toLowerCase())}
                    setSelected={setSelected}
                    index={key}
                  />
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const SuccessModal = ({ setVisible, visible }) => {
  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 1000);
  }, []);
  return (
    <View
      style={{
        backgroundColor: "#fff",
        width: "70%",
        borderRadius: 30,
        padding: 30,
        gap: 30,
        alignItems: "center",
      }}
    >
      <Svg width="103" height="103" viewBox="0 0 103 103" fill="none">
        <Circle cx="51.5" cy="51.5" r="51.5" fill="#E6F5E0" />
        <Path
          d="M31.3679 48.1029L41.6165 65.4476L76.0661 41.7638"
          stroke="#229D27"
          stroke-width="5.42609"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>

      <Text
        style={{
          color: "#000000",
          fontFamily: "HostGroteskBold",
          fontSize: 24,
          marginBottom: 3,
          textAlign: "center",
        }}
      >
        {visible}
      </Text>
    </View>
  );
};
