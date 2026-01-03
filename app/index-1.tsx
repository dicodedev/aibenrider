import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { logoFull, saleOne, saleTwo } from "@/icons";

import { SvgXml } from "react-native-svg";

import Swiper from "react-native-swiper";

export default function index() {
  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "flex-start",
        paddingBottom: 20,
      }}
    >
      <View
        style={{
          width: "100%",
          height: 60,
          borderColor: "#fff",
          alignItems: "center",
        }}
      >
        <SvgXml xml={logoFull()} width={200} height={50} />
      </View>
      <View
        style={{
          flex: 1,
          height: "100%",
        }}
      >
        <Swiper
          style={{
            height: "100%",
          }}
          showsPagination={true}
          dotColor="#ccc"
          activeDotColor="#100152"
        >
          <SliderOne />
          <SliderOne />
          <SliderOne />
          <SliderOne />
        </Swiper>
      </View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#FBAF41",
            padding: 20,
            paddingHorizontal: 60,
            borderRadius: 50,
            display: "flex",
            width: "f",
          }}
          onPress={() => router.push("/register")}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: 500,
              fontFamily: "Montserrat",
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export const SliderOne = () => {
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
          height: "50%",
          position: "relative",
          width: "100%",
          // borderWidth: 1,
          // backgroundColor: "#fbfbfb"
        }}
      >
        <SvgXml xml={saleOne()} height={"100%"} />
        <SvgXml
          style={{
            position: "absolute",
            right: -60,
            bottom: 0,
          }}
          xml={saleTwo()}
          height={"120"}
        />
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
            fontSize: 30,
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 30,
            lineHeight: 40,
            paddingHorizontal: 40,
            fontFamily: "MontserratBold",
          }}
        >
          Find items for sale in your region
        </Text>
        <Text
          style={{
            fontSize: 16,
            marginBottom: 30,
            lineHeight: 30,
            textAlign: "center",
            paddingHorizontal: 10,
            fontFamily: "Montserrat",
          }}
        >
          To use this app, you must be at least 18 years old. Please confirm
          that you are 18 years old or above by clicking on the bottom below.
        </Text>
      </View>
    </View>
  );
};
