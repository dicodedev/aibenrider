import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { arrowLeft } from "@/icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Path, SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

import { appService } from "@/api/appService";
import { ServiceCard } from "@/components/account/service-card";
import { CustomModal } from "@/components/custom-modal";
import ScalingDots from "@/components/scaling-dots";
import { Skeleton } from "moti/skeleton";
import { Image } from "react-native";
import Toast from "react-native-toast-message";

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

export default function SelectService() {
  const app = useSelector((state: any) => state.app);
  const data = app.vehiclePayload;

  console.log(data);

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);

  const [category, setCategory] = useState(null);

  const getCategory = async () => {
    const res = await appService.getCategory(data.category_id);

    setCategory(res.data);
  };

  useEffect(() => {
    getCategory();
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);

      let payload = { ...data, purpose: selected };

      console.log("payload", payload);

      await appService.addVehicle(payload);

      setVisible(true);
    } catch (error: any) {
      console.log("error", error);

      Toast.show({
        type: "error",
        text1: "Failed to register",
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
        flex: 1,
      }}
    >
      <CustomModal
        setVisible={setVisible}
        visible={visible}
        content={<SuccessModal setVisible={setVisible} />}
      />
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
            opacity: loading ? 0.6 : 1,
          }}
          onPress={onSubmit}
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
              SUBMIT FOR APRROVAL
            </Text>
          )}
        </Pressable>
      </View>
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingTop: 10,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
              // borderWidth: 1,
            }}
          >
            <Pressable
              onPress={() => router.back()}
              hitSlop={40}
              style={{
                height: 40,
                width: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SvgXml xml={arrowLeft()} width={21} height={16} />
            </Pressable>
            <Text
              style={{
                fontFamily: "HostGroteskBold",
                fontSize: 24,
              }}
            >
              Select Services
            </Text>
            <Pressable
              style={{
                width: 70,
                borderRadius: 100,
                backgroundColor: "transparent",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Pressable>
          </View>
          <View
            style={{
              marginBottom: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            {[1, 2].map((item, key) => (
              <View
                key={key}
                style={{
                  height: 7,
                  width: item == 2 ? 150 : 50,
                  borderRadius: 12,
                  backgroundColor: item == 2 ? "#FBAF41" : "#D9D9D9",
                }}
              ></View>
            ))}
          </View>
          <View
            style={{
              alignItems: "center",
              marginVertical: 40,
              justifyContent: "center",
            }}
          >
            {category ? (
              <Image
                source={{ uri: category.image}}
                style={{
                  width: 250,
                  height: 100,
                }}
              />
            ) : (
              <Skeleton
                colorMode="light"
                height={100}
                width={250}
                radius={10}
              />
            )}

            {category ? (
              <Text
                style={{
                  marginTop: 20,
                  fontSize: 14,
                  fontFamily: "HostGrotesk",
                }}
              >
                {category.name}
              </Text>
            ) : (
              <View
                style={{
                  marginTop: 20,
                }}
              >
                <Skeleton
                  colorMode="light"
                  height={15}
                  width={120}
                  radius={10}
                />
              </View>
            )}
          </View>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "HostGroteskBold",
            }}
          >
            Select Services for This Vehicle
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "HostGrotesk",
              fontStyle: "italic",
              marginBottom: 5,
            }}
          >
            (Multi-Select)
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "HostGrotesk",
              color: "#686868",
            }}
          >
            Choose services for your vehicle
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
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const SuccessModal = ({ setVisible }) => {
  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
      router.replace("/account/vehicles")
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
        Vehicle Added
      </Text>
    </View>
  );
};