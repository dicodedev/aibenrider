import { Pressable, ScrollView, Text, View } from "react-native";

import { appService } from "@/api/appService";
import { GlowBG } from "@/components/account/glow-bg";
import { ServiceCard } from "@/components/account/service-card";
import { CustomModal } from "@/components/custom-modal";
import ScalingDots from "@/components/scaling-dots";
import { arrowLeft } from "@/icons";
import { appSlice } from "@/store/appSlice";
import { router, useNavigation } from "expo-router";
import { Skeleton } from "moti/skeleton";
import { useEffect, useState } from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, G, Path, SvgXml } from "react-native-svg";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

const options = ["My Vehicles", "Manage Services"];
const sOptions = [
  {
    icon: (
      <Svg width="21" height="19" viewBox="0 0 21 19" fill="none">
        <Path
          d="M17.7374 16.694H3.13012V17.7374C3.13012 18.0141 3.02019 18.2795 2.82452 18.4751C2.62885 18.6708 2.36347 18.7807 2.08675 18.7807H1.04337C0.766654 18.7807 0.501268 18.6708 0.305597 18.4751C0.109927 18.2795 0 18.0141 0 17.7374V7.30362L2.58757 1.26457C2.74858 0.888955 3.01635 0.568888 3.35763 0.344084C3.69892 0.119281 4.0987 -0.000362643 4.50738 8.2569e-07H16.3601C16.7684 4.5921e-05 17.1678 0.119881 17.5086 0.344659C17.8495 0.569437 18.1169 0.889282 18.2778 1.26457L20.8675 7.30362V17.7374C20.8675 18.0141 20.7576 18.2795 20.5619 18.4751C20.3662 18.6708 20.1008 18.7807 19.8241 18.7807H18.7807C18.504 18.7807 18.2386 18.6708 18.043 18.4751C17.8473 18.2795 17.7374 18.0141 17.7374 17.7374V16.694ZM18.7807 9.39037H2.08675V14.6072H18.7807V9.39037ZM2.27038 7.30362H18.5971L16.3611 2.08675H4.50738L2.27038 7.30362ZM4.69518 13.5639C4.2801 13.5639 3.88202 13.399 3.58852 13.1055C3.29501 12.812 3.13012 12.4139 3.13012 11.9988C3.13012 11.5837 3.29501 11.1856 3.58852 10.8921C3.88202 10.5986 4.2801 10.4337 4.69518 10.4337C5.11026 10.4337 5.50834 10.5986 5.80185 10.8921C6.09535 11.1856 6.26024 11.5837 6.26024 11.9988C6.26024 12.4139 6.09535 12.812 5.80185 13.1055C5.50834 13.399 5.11026 13.5639 4.69518 13.5639ZM16.1723 13.5639C15.7572 13.5639 15.3591 13.399 15.0656 13.1055C14.7721 12.812 14.6072 12.4139 14.6072 11.9988C14.6072 11.5837 14.7721 11.1856 15.0656 10.8921C15.3591 10.5986 15.7572 10.4337 16.1723 10.4337C16.5874 10.4337 16.9855 10.5986 17.279 10.8921C17.5725 11.1856 17.7374 11.5837 17.7374 11.9988C17.7374 12.4139 17.5725 12.812 17.279 13.1055C16.9855 13.399 16.5874 13.5639 16.1723 13.5639Z"
          fill="#100152"
        />
      </Svg>
    ),
    color: "#CCD9F8",
    title: "Rides",
    text: "Pick up passengers and complete ride bookings.",
  },
  {
    icon: (
      <Svg width="21" height="20" viewBox="0 0 21 20" fill="none">
        <Path
          d="M11.3175 0.325331C10.5714 0.0384475 9.74537 0.0384475 8.99926 0.325331L1.60535 3.16892C1.16538 3.33819 0.787019 3.63681 0.52014 4.0254C0.253261 4.414 0.110388 4.87434 0.110352 5.34575V14.6115C0.110388 15.0829 0.253261 15.5432 0.52014 15.9318C0.787019 16.3204 1.16538 16.619 1.60535 16.7883L8.99926 19.6319C9.74537 19.9188 10.5714 19.9188 11.3175 19.6319L18.7114 16.7883C19.1514 16.619 19.5297 16.3204 19.7966 15.9318C20.0635 15.5432 20.2063 15.0829 20.2064 14.6115V5.34575C20.2063 4.87434 20.0635 4.414 19.7966 4.0254C19.5297 3.63681 19.1514 3.33819 18.7114 3.16892L11.3175 0.325331ZM9.51458 1.66531C9.92899 1.50601 10.3877 1.50601 10.8022 1.66531L17.4891 4.23688L14.8235 5.26321L7.49277 2.44259L9.51458 1.66531ZM5.49322 3.21055L12.824 6.03117L10.1584 7.05678L2.82762 4.23688L5.49322 3.21055ZM1.54794 5.28259L9.44065 8.31853V18.2639L2.12067 15.4483C1.95153 15.3832 1.80608 15.2684 1.70346 15.119C1.60084 14.9696 1.54587 14.7927 1.54578 14.6115V5.34575C1.54578 5.32422 1.5465 5.30317 1.54794 5.28259ZM10.8761 18.2639V8.31853L18.7688 5.28259L18.771 5.34575V14.6115C18.771 14.9825 18.542 15.3148 18.1961 15.4483L10.8761 18.2639Z"
          fill="#CA7A07"
          stroke="#CA7A07"
          stroke-width="0.220322"
        />
      </Svg>
    ),
    color: "#FFDAAD",
    title: "Delivery",
    text: "Deliver Packages and products to customers.",
  },
  {
    icon: (
      <Svg width="25" height="18" viewBox="0 0 25 18" fill="none">
        <Path
          d="M23.8214 6.57144H17.25V2.46429H21.6224C21.7866 2.46429 21.947 2.51349 22.083 2.60552C22.2189 2.69756 22.3241 2.82822 22.3851 2.98065L23.8214 6.57144Z"
          stroke="#49932C"
          stroke-width="1.64286"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M0.821289 9.03571H17.2499"
          stroke="#49932C"
          stroke-width="1.64286"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M18.4819 16.4286C19.8429 16.4286 20.9462 15.3253 20.9462 13.9643C20.9462 12.6033 19.8429 11.5 18.4819 11.5C17.1209 11.5 16.0176 12.6033 16.0176 13.9643C16.0176 15.3253 17.1209 16.4286 18.4819 16.4286Z"
          stroke="#49932C"
          stroke-width="1.64286"
          stroke-miterlimit="10"
        />
        <Path
          d="M6.16058 16.4286C7.52156 16.4286 8.62486 15.3253 8.62486 13.9643C8.62486 12.6033 7.52156 11.5 6.16058 11.5C4.79959 11.5 3.69629 12.6033 3.69629 13.9643C3.69629 15.3253 4.79959 16.4286 6.16058 16.4286Z"
          stroke="#49932C"
          stroke-width="1.64286"
          stroke-miterlimit="10"
        />
        <Path
          d="M16.0179 13.9643H8.625"
          stroke="#49932C"
          stroke-width="1.64286"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M3.69629 13.9643H1.64272C1.42486 13.9643 1.21593 13.8777 1.06188 13.7237C0.907832 13.5696 0.821289 13.3607 0.821289 13.1428V1.64284C0.821289 1.42498 0.907832 1.21605 1.06188 1.062C1.21593 0.907954 1.42486 0.821411 1.64272 0.821411H17.2499V11.8301V6.57141H23.8213V13.1428C23.8213 13.3607 23.7347 13.5696 23.5807 13.7237C23.4267 13.8777 23.2177 13.9643 22.9999 13.9643H20.9463"
          stroke="#49932C"
          stroke-width="1.64286"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    ),
    color: "#E0FAD5",
    title: "Logistics",
    text: "Move goods, loads and large items between locations.",
  },
];

export default function Vehicles() {
  const app = useSelector((state: any) => state.app);

  const user = app.user;

  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(user.services);

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
                  height: 100,
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
              if (!activeVehicle.images.length) return;

              dispatch(appSlice.actions.setImages(activeVehicle.images));

              router.push({
                pathname: "/account/vehicles/preview",
                params: {
                  currentIndex: 0,
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
    <View
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
            ) : (
              <></>
            )}
          </View>
        </View>
      </View>
      <Pressable
        style={{
          backgroundColor: item.status == "in-review" ? "#878787" : "#100152",
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 8,
          alignSelf: "flex-start",
        }}
        onPress={item.status != "in-review" ? () => activate() : () => {}}
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
    </View>
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
