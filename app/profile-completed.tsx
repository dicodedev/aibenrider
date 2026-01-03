import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const colors = ["#ffe5f9", "#faeaef", "#fcede8", "#fff4e6"];

export default function profileCompleted() {
  const [page, setPage] = useState(0);

  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        flex: 1,
        backgroundColor: colors[page],
        justifyContent: "flex-start",
        paddingBottom: 20,
      }}
    >
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
            height: "35%",
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Image
            source={require("@/assets/images/check.png")}
            style={{
              width: 50,
              height: 50,
            }}
          />
          <Text
            style={{
              marginTop: 20,
              fontWeight: 600,
              fontSize: 26,
              fontFamily: "MontserratBold",
            }}
          >
            Setup Completed
          </Text>
        </View>
        <View
          style={{
            bottom: 0,
            left: 0,
            // borderWidth: 1,
            alignItems: "center",
            height: "50%",
            width: "100%",
          }}
        >
          <Image
            source={require("@/assets/images/3d-render-smartphone-black-hands-with-finger.png")}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#FBAF41",
            padding: 20,
            paddingHorizontal: 40,
            borderRadius: 10,
            display: "flex",
            width: "100%",
          }}
          onPress={() => router.replace("/account/marketplace")}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Montserrat",
                color: "#fff",
                margin: 0,
                padding: 0,
              }}
            >
              Go to Dashboard
            </Text>
            <FontAwesome
              style={{
                margin: 0,
                padding: 0,
              }}
              name="chevron-right"
              size={12}
              color="#fff"
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
