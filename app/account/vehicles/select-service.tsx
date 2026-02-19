import { Pressable, ScrollView, Text, View } from "react-native";

import { arrowLeft } from "@/icons";
import { router, useLocalSearchParams } from "expo-router";
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

import { sOptions } from "@/constants/app";

export default function SelectService() {
  const app = useSelector((state: any) => state.app);
  const data = app.vehiclePayload;

  console.log("data", data);

  const { type } = useLocalSearchParams();

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(data.purpose ?? []);

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

      type == "edit"
        ? await appService.editVehicle(data.id, payload)
        : await appService.addVehicle(payload);

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
        content={<SuccessModal setVisible={setVisible} type={type} />}
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
                source={{ uri: category.image }}
                style={{
                  width: 250,
                  height: 150,
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
              paddingBottom: 100,
            }}
          >
            {sOptions.map((item, key) => (
              <ServiceCard
                key={key}
                color={item.color}
                icon={item.icon}
                borderColor={item.borderColor}
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

const SuccessModal = ({ setVisible, type }) => {
  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
      router.replace("/account/vehicles");
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
        Vehicle {type == "edit" ? "Updated" : "Added"}
      </Text>
    </View>
  );
};
