import { router } from "expo-router";
import React, { useState } from "react";
import {
  Animated,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { logo } from "@/icons";

import { SvgXml } from "react-native-svg";

import { SafeAreaView } from "react-native-safe-area-context";

const colors = ["#FFDAAD", "#CCD9F8", "#E6F5E0", "#FFD0DA"];

export default function index() {
  const [page, setPage] = useState(0);

  const handleNext = () => {
    page < 2 ? setPage(page + 1) : router.push("/set-password");
  };
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        flex: 1,
        backgroundColor: colors[page],
        justifyContent: "flex-start",
        paddingBottom: 20,
      }}
    >
      <SafeAreaView
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <View
          style={{
            width: "100%",
            height: 100,
            borderColor: "#fff",
            paddingHorizontal: 15,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SvgXml xml={logo()} width={200} height={50} />
        </View>
        <View
          style={{
            flex: 1,
            height: "100%",
          }}
        >
          <Content setPage={setPage} page={page} />
        </View>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 20,
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#100152",
              padding: 20,
              paddingHorizontal: 40,
              borderRadius: 10,
              display: "flex",
              width: "100%",
            }}
            onPress={handleNext}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: 500,
                fontFamily: "HostGroteskBold",
                textAlign: "center",
              }}
            >
              {page < 3 ? "NEXT" : "CREATE ACCOUNT"}
            </Text>
          </TouchableOpacity>
          <Pressable
            style={{
              paddingVertical: 20,
            }}
            onPress={() => router.push("/set-password")}
          >
            <Text
              style={{
                color: "#100152",
                fontWeight: 500,
                fontFamily: "HostGroteskBold",
              }}
            >
              SKIP
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

export const Content = ({ page, setPage }) => {
  switch (page) {
    case 0:
      return (
        <SliderOne
          page={page}
          setPage={setPage}
          image={
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Image
                source={require("@/assets/images/onboard/FirstCoin.png")}
                style={{
                  width: 96,
                  height: 96,
                  position: "absolute",
                  top: 60,
                  right: 23,
                  zIndex: 100,
                }}
              />
              <Image
                source={require("@/assets/images/onboard/First.png")}
                style={{
                  width: 260,
                  height: 260,
                  borderRadius: 25,
                }}
              />
            </View>
          }
          heading={"Easily Earn on Your Own Terms"}
          subHeading={
            "Accept ride bookings, deliver goods, or handle logistics all from one app."
          }
        />
      );
    case 1:
      return (
        <SliderOne
          page={page}
          setPage={setPage}
          image={
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Image
                source={require("@/assets/images/onboard/SecondCoin.png")}
                style={{
                  width: 96,
                  height: 96,
                  position: "absolute",
                  top: 50,
                  left: 23,
                  zIndex: 100,
                }}
              />
              <Image
                source={require("@/assets/images/onboard/Second.png")}
                style={{
                  width: 260,
                  height: 260,
                  borderRadius: 25,
                }}
              />
            </View>
          }
          heading={"How Do You Make Money"}
          subHeading={
            "Go online and receive nearby requests Complete rides, deliveries, or hires Get paid directly to your wallet"
          }
        />
      );
    case 2:
      return (
        <SliderOne
          page={page}
          setPage={setPage}
          image={
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Image
                source={require("@/assets/images/onboard/Three.png")}
                style={{
                  width: 260,
                  height: 260,
                  borderRadius: 25,
                }}
              />
            </View>
          }
          heading={"Earn More With Referrals"}
          subHeading={
            "Invite other riders or customers and earn a bonus for every completed trip they make."
          }
        />
      );
    default:
      break;
  }
};

export const SliderOne = ({ setPage, page, image, heading, subHeading }) => {
  return (
    <View
      style={{
        bottom: 0,
        left: 0,
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
        width: "100%",
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          position: "relative",
          width: "100%",
          height: "50%",
          //   borderWidth: 1,
          // backgroundColor: "#fbfbfb"
        }}
      >
        {image}
        <View
          style={{
            flexDirection: "row",
            gap: 12,
            // borderWidth: 1,
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          {colors.map((item, key) => (
            <Pressable key={key} onPress={() => setPage(key)}>
              <Animated.View
                style={{
                  width: key == page ? 30 : 6,
                  height: 6,
                  borderRadius: 100,
                  backgroundColor: key == page ? "#000" : "#808080",
                }}
              />
            </Pressable>
          ))}
        </View>
      </View>

      <View
        style={{
          bottom: 0,
          left: 0,
          // borderWidth: 1,
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text
          style={{
            fontFamily: "HostGroteskBold",
            fontSize: 45,
            // fontWeight: 700,
            lineHeight: 50,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          {heading}
        </Text>
        <Text
          style={{
            fontSize: 16,
            marginBottom: 30,
            lineHeight: 30,
            paddingHorizontal: 10,
            fontFamily: "HostGroteskBold",
            textAlign: "center",
          }}
        >
          {subHeading}
        </Text>
      </View>
    </View>
  );
};
