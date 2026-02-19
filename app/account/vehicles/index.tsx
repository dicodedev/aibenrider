import { Pressable, ScrollView, Text, View } from "react-native";

import { appService } from "@/api/appService";
import { GlowBG } from "@/components/account/glow-bg";
import { ServiceCard } from "@/components/account/service-card";
import { CustomModal } from "@/components/custom-modal";
import ScalingDots from "@/components/scaling-dots";
import { arrowLeft } from "@/icons";
import { router, useFocusEffect, useNavigation } from "expo-router";
import { Skeleton } from "moti/skeleton";
import { useCallback, useEffect, useState } from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, G, Path, SvgXml } from "react-native-svg";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

import { sOptions } from "@/constants/app";

const options = ["My Vehicles", "Manage Services"];

export default function Vehicles() {
  const app = useSelector((state: any) => state.app);

  const user = app.user;

  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(user.services ?? []);

  const [vehicles, setVehicles] = useState(null);

  const [activeVehicle, setActiveVehicle] = useState(null);

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const fetchVehicles = async () => {
    const res = await appService.getVehicles();

    setActiveVehicle(res.data.find((i) => i.active == 1));
    setVehicles(res.data);
  };

  useEffect(() => {
    !visible && fetchVehicles();
  }, [visible]);

  useEffect(() => {
    (async () => {
      let payload = { services: selected };
      await appService.setServices(payload);
    })();
  }, [selected]);

  useFocusEffect(
    useCallback(() => {
      fetchVehicles();
    }, []),
  );

  return (
    <View style={{ flex: 1 }}>
      <GlowBG />
      <CustomModal
        setVisible={setVisible}
        visible={visible}
        content={<SuccessModal visible={visible} setVisible={setVisible} />}
      />
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
            <View>
              <Text
                style={{
                  fontSize: 45,
                  fontFamily: "HostGroteskBold",
                  lineHeight: 45,
                  width: 200,
                }}
              >
                Vehicle & Service
              </Text>
            </View>
            <Pressable
              onPress={() => navigation.openDrawer()}
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
              flexDirection: "row",
              gap: 30,
              marginVertical: 20,
            }}
          >
            {options.map((item, key) => (
              <Pressable
                onPress={() => setPage(key)}
                key={key}
                style={{
                  backgroundColor: key === page ? "#fff" : "#EAEAEA",
                  flexDirection: "row",
                  padding: 10,
                  paddingHorizontal: 15,
                  gap: 10,
                  alignItems: "center",
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "HostGroteskBold",
                  }}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
          {!page ? (
            <First
              activeVehicle={activeVehicle}
              vehicles={vehicles}
              setVisble={setVisible}
            />
          ) : (
            <Second selected={selected} setSelected={setSelected} />
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const First = ({ activeVehicle, vehicles, setVisble }) => {
  const dispatch = useDispatch();
  return (
    <>
      {activeVehicle ? (
        <>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 10,
              padding: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "HostGroteskBold",
                }}
              >
                {activeVehicle.category.name}
              </Text>
              <Pressable
                onPress={() =>
                  router.push(
                    "/account/vehicles/edit-vehicle/" + activeVehicle.id,
                  )
                }
                style={{
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                <Svg width="18" height="17" viewBox="0 0 18 17" fill="none">
                  <Path
                    d="M10.9792 2.72995L13.7824 5.53318M9.11038 15.8117H16.5857M1.63509 12.0741L0.700684 15.8117L4.43833 14.8773L15.2644 4.0512C15.6148 3.70075 15.8116 3.22549 15.8116 2.72995C15.8116 2.2344 15.6148 1.75915 15.2644 1.40869L15.1037 1.24797C14.7532 0.897621 14.278 0.700806 13.7824 0.700806C13.2869 0.700806 12.8116 0.897621 12.4612 1.24797L1.63509 12.0741Z"
                    stroke="black"
                    stroke-width="1.40162"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>

                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "HostGroteskBold",
                  }}
                >
                  Edit
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                alignItems: "center",
                marginTop: 20,
                justifyContent: "center",
              }}
            >
              <Image
                source={{ uri: activeVehicle.category.image }}
                style={{
                  width: 250,
                  height: 150,
                }}
              />
            </View>
            <View
              style={{
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: "HostGroteskBold",
                }}
              >
                {activeVehicle.plate_number}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "HostGrotesk",
                  fontStyle: "italic",
                }}
              >
                {`${activeVehicle.brand} ${activeVehicle.model} . ${activeVehicle.year} . ${activeVehicle.color}`}
              </Text>
              <View
                style={{
                  backgroundColor: "#100152",
                  paddingVertical: 5,
                  paddingHorizontal: 15,
                  borderRadius: 100,
                  alignSelf: "flex-start",
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "HostGroteskBold",
                    color: "#FFFFFF",
                  }}
                >
                  Active
                </Text>
              </View>
            </View>
          </View>
          <Pressable
            onPress={() => {
              router.push({
                pathname: "/account/vehicles/vehicle-details",
                params: {
                  id: activeVehicle.id,
                },
              });
            }}
            style={{
              flexDirection: "row",
              paddingVertical: 20,
              gap: 20,
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "HostGroteskBold",
                paddingLeft: 10,
              }}
            >
              Vehicle Images
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 20,
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
                    flexDirection: "row",
                    gap: 5,
                  }}
                >
                  {activeVehicle.images.slice(0, 3).map((item, key) => (
                    <Image
                      key={key}
                      source={{ uri: item.url }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 5,
                      }}
                    />
                  ))}
                </View>
                {activeVehicle.images.length > 3 && (
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "HostGroteskBold",
                      color: "#6A6A6A",
                    }}
                  >
                    +{activeVehicle.images.length - 3}More
                  </Text>
                )}
              </View>
              <Svg width="12" height="24" viewBox="0 0 12 24" fill="none">
                <Path
                  d="M1.99984 6.98081L3.06084 5.92081L8.83984 11.6978C8.93299 11.7904 9.00692 11.9005 9.05737 12.0217C9.10782 12.143 9.13379 12.273 9.13379 12.4043C9.13379 12.5356 9.10782 12.6657 9.05737 12.7869C9.00692 12.9082 8.93299 13.0182 8.83984 13.1108L3.06084 18.8908L2.00084 17.8308L7.42484 12.4058L1.99984 6.98081Z"
                  fill="black"
                />
              </Svg>
            </View>
          </Pressable>
        </>
      ) : (
        <View>
          <View
            style={{
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Svg width="72" height="72" viewBox="0 0 72 72" fill="none">
              <G opacity="0.6">
                <Path
                  d="M14.2031 14.3438H0V15.75H14.2031V14.3438Z"
                  fill="#C4C1AB"
                />
                <Path
                  d="M14.2031 19.2656H2.8125V20.6719H14.2031V19.2656Z"
                  fill="#C4C1AB"
                />
                <Path
                  d="M14.2031 24.1875H6.60938V25.5938H14.2031V24.1875Z"
                  fill="#C4C1AB"
                />
                <Path
                  d="M51.8484 11.25H10.5469V47.3062H51.8484V11.25Z"
                  fill="#C4C1AB"
                />
                <Path
                  d="M51.8484 47.2922H10.5469V54H51.8484V47.2922Z"
                  fill="#9E9E9E"
                />
                <Path
                  d="M31.317 51.4828L28.3779 48.9656H21.3326L18.3936 51.4828V54H31.317V51.4828Z"
                  fill="#888888"
                />
                <Path
                  d="M51.8486 27H65.4611L71.2971 40.5V54H51.8486V27Z"
                  fill="#9E9E9E"
                />
                <Path
                  d="M66.0514 51.4828L63.1123 48.9656H56.067L53.1279 51.4828V54H66.0514V51.4828Z"
                  fill="#888888"
                />
                <Path
                  d="M53.1283 27H51.8486V47.2922H53.1283V27Z"
                  fill="#888888"
                />
                <Path
                  d="M54.8857 30.2203H63.5623L67.2889 38.8406V40.9359H61.917L60.0889 37.7859H54.8857V30.2203Z"
                  fill="#C4C1AB"
                />
                <Path
                  d="M55.8281 31.0781H63.9562L63.5625 30.2344H54.8438V37.8281H55.8281V31.0781Z"
                  fill="#747E6C"
                />
                <Path
                  d="M58.2188 39.7969H54.8438V41.2031H58.2188V39.7969Z"
                  fill="#787878"
                />
                <Path
                  d="M71.2969 45H68.2031V49.5984H71.2969V45Z"
                  fill="#747E6C"
                />
                <Path
                  d="M71.2969 45.8578H69.1172V49.5844H71.2969V45.8578Z"
                  fill="#C4C1AB"
                />
                <Path
                  d="M24.8488 60.7641C27.7457 60.7641 30.0941 58.4157 30.0941 55.5187C30.0941 52.6218 27.7457 50.2734 24.8488 50.2734C21.9519 50.2734 19.6035 52.6218 19.6035 55.5187C19.6035 58.4157 21.9519 60.7641 24.8488 60.7641Z"
                  fill="#787878"
                />
                <Path
                  d="M27.3938 53.339C27.1688 55.8281 25.1578 57.839 22.6688 58.064C22.6547 58.064 22.6266 58.064 22.6125 58.064C21.6 58.1484 21.2766 59.4703 22.1485 60.0047C23.0203 60.525 24.061 60.8062 25.1719 60.75C27.8016 60.5953 29.9391 58.4578 30.0938 55.8281C30.1641 54.7172 29.8828 53.6765 29.3485 52.8047C28.8141 51.9328 27.4922 52.2422 27.4078 53.2687C27.4078 53.2969 27.4078 53.3109 27.3938 53.339Z"
                  fill="#828282"
                />
                <Path
                  d="M59.5832 60.7641C62.4801 60.7641 64.8285 58.4157 64.8285 55.5187C64.8285 52.6218 62.4801 50.2734 59.5832 50.2734C56.6863 50.2734 54.3379 52.6218 54.3379 55.5187C54.3379 58.4157 56.6863 60.7641 59.5832 60.7641Z"
                  fill="#787878"
                />
                <Path
                  d="M62.1282 53.339C61.9032 55.8281 59.8922 57.839 57.4032 58.064C57.3891 58.064 57.361 58.064 57.3469 58.064C56.3344 58.1484 56.011 59.4703 56.8828 60.0047C57.7547 60.525 58.7953 60.8062 59.9063 60.75C62.536 60.5953 64.6735 58.4578 64.8282 55.8281C64.8985 54.7172 64.6172 53.6765 64.0828 52.8047C63.5485 51.9328 62.2266 52.2422 62.1422 53.2687C62.1422 53.2969 62.1422 53.3109 62.1282 53.339Z"
                  fill="#828282"
                />
                <Path
                  d="M59.5824 57.5016C60.6775 57.5016 61.5652 56.6138 61.5652 55.5188C61.5652 54.4237 60.6775 53.5359 59.5824 53.5359C58.4873 53.5359 57.5996 54.4237 57.5996 55.5188C57.5996 56.6138 58.4873 57.5016 59.5824 57.5016Z"
                  fill="#828282"
                />
                <Path
                  d="M24.848 57.5016C25.9431 57.5016 26.8309 56.6138 26.8309 55.5188C26.8309 54.4237 25.9431 53.5359 24.848 53.5359C23.753 53.5359 22.8652 54.4237 22.8652 55.5188C22.8652 56.6138 23.753 57.5016 24.848 57.5016Z"
                  fill="#828282"
                />
                <Path
                  d="M48.1504 15.0609H14.2598V43.4813H48.1504V15.0609Z"
                  fill="#747E6C"
                />
                <Path
                  d="M48.1359 17.2266H16.1719V43.4813H48.1359V17.2266Z"
                  fill="#EBEADF"
                />
              </G>
            </Svg>
          </View>
          <Text
            style={{
              fontFamily: "HostGrotesk",
              color: "#9F9F9F",
              textAlign: "center",
              lineHeight: 20,
              marginBottom: 0,
            }}
          >
            You have no active vehicles,
          </Text>
          <Text
            style={{
              fontFamily: "HostGrotesk",
              color: "#9F9F9F",
              textAlign: "center",
              lineHeight: 20,
              marginBottom: 20,
            }}
          >
            activate a vehicle to bring it online
          </Text>
        </View>
      )}
      <View
        style={{
          paddingHorizontal: 10,
        }}
      >
        <Pressable
          style={{
            width: "100%",
            backgroundColor: "#100152",
            paddingVertical: 20,
            borderRadius: 12,
            marginTop: 10,
            gap: 20,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => router.push("/account/vehicles/add-vehicle")}
        >
          <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <Path
              d="M8 1V15M1 8H15"
              stroke="#F5F5F5"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </Svg>

          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontFamily: "HostGroteskBold",
              fontSize: 16,
            }}
          >
            Add Vehicle
          </Text>
        </Pressable>
      </View>

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
          Other Vehicles
        </Text>
      </View>
      <View
        style={{
          marginTop: 15,
          paddingBottom: 30,
          gap: 20,
        }}
      >
        {vehicles
          ? vehicles.map((item, key) => (
              <Card item={item} key={key} setVisible={setVisble} />
            ))
          : Array(3)
              .fill(1)
              .map((item, key) => (
                <View
                  key={key}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 20,
                    }}
                  >
                    <Skeleton
                      colorMode="light"
                      height={46}
                      width={46}
                      radius={100}
                    />
                    <View
                      style={{
                        paddingTop: 10,
                      }}
                    >
                      <Skeleton
                        colorMode="light"
                        height={12}
                        width={150}
                        radius={10}
                      />
                      <View
                        style={{
                          marginTop: 10,
                        }}
                      >
                        <Skeleton
                          colorMode="light"
                          height={10}
                          width={100}
                          radius={10}
                        />
                      </View>
                    </View>
                  </View>
                  <Skeleton
                    colorMode="light"
                    height={40}
                    width={80}
                    radius={8}
                  />
                </View>
              ))}
      </View>
    </>
  );
};

const Second = ({ selected, setSelected }) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 16,
          fontFamily: "HostGrotesk",
        }}
      >
        You can enable or disable the services you’d like to receive requests
        for.
      </Text>
      <View
        style={{
          gap: 20,
          marginVertical: 20,
          marginBottom: 40,
        }}
      >
        {sOptions.map((item, key) => (
          <ServiceCard
            key={key}
            color={item.color}
            borderColor={item.borderColor}
            icon={item.icon}
            title={item.title}
            text={item.text}
            active={selected.includes(item.title.toLowerCase())}
            setSelected={setSelected}
            index={key}
          />
        ))}
      </View>
      <View
        style={{
          backgroundColor: "rgba(255, 218, 173, 0.6)",
          padding: 20,
          paddingHorizontal: 40,
          gap: 20,
          flexDirection: "row",
          borderRadius: 12,
        }}
      >
        <View
          style={{
            width: 26,
            height: 26,
            borderRadius: "100%",
            backgroundColor: "#FBAF41",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Svg width="15" height="17" viewBox="0 0 15 17" fill="none">
            <Path
              d="M14.25 3.5625C14.25 5.09042 13.0071 6.33334 11.4792 6.33334C9.95125 6.33334 8.70833 5.09042 8.70833 3.5625C8.70833 2.03459 9.95125 0.791671 11.4792 0.791671C13.0071 0.791671 14.25 2.03459 14.25 3.5625ZM12.6667 7.75042C12.2708 7.85334 11.875 7.91667 11.4792 7.91667C10.325 7.91458 9.21873 7.45516 8.40262 6.63905C7.58651 5.82294 7.12709 4.71666 7.125 3.5625C7.125 2.39875 7.58417 1.34584 8.3125 0.562087C8.16883 0.385974 7.98768 0.244131 7.78225 0.146893C7.57682 0.0496558 7.35228 -0.000526066 7.125 4.15838e-06C6.25417 4.15838e-06 5.54167 0.712504 5.54167 1.58334V1.81292C3.19042 2.50959 1.58333 4.67084 1.58333 7.125V11.875L0 13.4583V14.25H14.25V13.4583L12.6667 11.875V7.75042ZM7.125 16.625C8.00375 16.625 8.70833 15.9204 8.70833 15.0417H5.54167C5.54167 15.4616 5.70848 15.8643 6.00541 16.1613C6.30235 16.4582 6.70507 16.625 7.125 16.625Z"
              fill="black"
            />
          </Svg>
        </View>
        <Text
          style={{
            flex: 1,
            flexShrink: 1,
            gap: 10,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontFamily: "HostGroteskBold",
              marginRight: 10,
            }}
          >
            Busy at the peak times?
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "HostGrotesk",
              color: "#767676",
            }}
          >
            {" "}
            Enable more services to get additional requests.
          </Text>
        </Text>
      </View>
    </View>
  );
};

const Card = ({ item, setVisible }) => {
  const [loading, setLoading] = useState(false);

  const activate = async () => {
    try {
      setLoading(true);

      await appService.activateVehicle(item.id);

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
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/account/vehicles/vehicle-details",
          params: {
            id: item.id,
          },
        })
      }
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 20,
        }}
      >
        <Image
          source={{ uri: item.images[0]?.url }}
          style={{
            width: 46,
            height: 46,
            borderRadius: 100,
          }}
        />
        <View>
          <Text
            style={{
              fontSize: 17,
              fontFamily: "HostGroteskBold",
              marginBottom: 5,
            }}
          >
            {`${item.brand} ${item.model}`}
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: 20,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontFamily: "HostGroteskBold",

                color: "#6A6A6A",
              }}
            >
              {item.plate_number}
            </Text>
            {item.status == "in-review" ? (
              <View
                style={{
                  backgroundColor: "#FBAF41",
                  padding: 3,
                  borderRadius: 10,
                  paddingHorizontal: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 9,
                    fontFamily: "HostGroteskBold",
                  }}
                >
                  Pending
                </Text>
              </View>
            ) : item.status == "rejected" ? (
              <View
                style={{
                  backgroundColor: "#FF0a00",
                  padding: 3,
                  borderRadius: 10,
                  paddingHorizontal: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 9,
                    fontFamily: "HostGroteskBold",
                    color: "#fff",
                  }}
                >
                  Rejected
                </Text>
              </View>
            ) : (
              <></>
            )}
          </View>
        </View>
      </View>
      <Pressable
        style={{
          backgroundColor: ["in-review", "rejected"].includes(item.status)
            ? "#878787"
            : "#100152",
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 8,
          alignSelf: "flex-start",
        }}
        onPress={
          !["in-review", "rejected"].includes(item.status)
            ? () => activate()
            : () => {}
        }
      >
        {loading ? (
          <ScalingDots
            dotCount={3}
            dotSize={6}
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
              fontSize: 12,
              fontFamily: "HostGroteskBold",
              color: "#F5F5F5",
            }}
          >
            Activate
          </Text>
        )}
      </Pressable>
    </Pressable>
  );
};

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
