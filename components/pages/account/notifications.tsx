import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import CustomSwitch from "@/components/account/custom-switch";
import { GlowBG } from "@/components/account/glow-bg";
import { arrowLeft } from "@/icons";
import { router } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Path, SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

const options = [
  {
    text: "General",
    options: [
      "Order Updates",
      "Promotions & Deals",
      "New Arrivals",
      "Recommendations",
      "App Announcements",
    ],
  },
  {
    text: "Email Notifications",
    options: ["Receive Email Updates"],
  },
];

export default function NoticationsComponent() {
  const app = useSelector((state: any) => state.app);
  const [search, setSearch] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <GlowBG />
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
          onPress={() =>
            router.push("/account/dashboard/account/add-location")
          }
          style={{
            width: "100%",
            backgroundColor: "#100152",
            paddingVertical: 20,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontFamily: "HostGroteskBold",
              fontSize: 16,
            }}
          >
            SAVE CHANGES
          </Text>
        </Pressable>
      </View>
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 15,
        }}
        edges={["left", "right", "top"]}
      >
        <ScrollView
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
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
              Notifications
            </Text>
            <Pressable
              style={{
                width: 70,
                height: 70,
                borderRadius: 100,
                backgroundColor: "#FFF7ED",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {}}
            >
              <Svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                <Path
                  d="M5.35206 18.242C5.78721 18.7922 6.34171 19.2364 6.97367 19.541C7.60564 19.8455 8.29855 20.0025 9.00006 20C9.70158 20.0025 10.3945 19.8455 11.0264 19.541C11.6584 19.2364 12.2129 18.7922 12.6481 18.242C10.2271 18.5697 7.77303 18.5697 5.35206 18.242ZM15.7501 7V7.704C15.7501 8.549 15.9901 9.375 16.4421 10.078L17.5501 11.801C18.5611 13.375 17.7891 15.514 16.0301 16.011C11.4338 17.3127 6.56635 17.3127 1.97006 16.011C0.211062 15.514 -0.560938 13.375 0.450062 11.801L1.55806 10.078C2.01128 9.36919 2.25178 8.54531 2.25106 7.704V7C2.25106 3.134 5.27306 0 9.00006 0C12.7271 0 15.7501 3.134 15.7501 7Z"
                  fill="black"
                />
              </Svg>
            </Pressable>
          </View>
          {options.map((item, key) => (
            <View
              key={key}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 10,
                paddingVertical: 12,
                marginTop: 30,
              }}
            >
              <Text
                style={{
                  fontFamily: "HostGroteskBold",
                  fontSize: 16,
                  color: "#2A2A2A",
                  marginBottom: 6,
                  paddingHorizontal: 12,
                }}
              >
                {item.text}
              </Text>
              {item.options.map((i, key) => (
                <View
                  key={key}
                  style={[
                    {
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 20,
                      justifyContent: "space-between",
                      paddingVertical: 13,
                      paddingHorizontal: 12,
                    },
                    key + 1 != item.options.length && {
                      borderBottomWidth: 1,
                      borderColor: "rgba(224, 224, 224, 1)",
                    },
                  ]}
                >
                  <Text
                    style={{
                      fontFamily: "HostGrotesk",
                      fontSize: 13,
                      color: "rgba(42, 42, 42, 1)",
                    }}
                  >
                    {i}
                  </Text>
                  <CustomSwitch />
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
