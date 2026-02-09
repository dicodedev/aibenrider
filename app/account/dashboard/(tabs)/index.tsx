import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { GlowBG } from "@/components/account/glow-bg";
import { Menu } from "@/components/account/menu";
import { RequestCard } from "@/components/account/request-card";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const colors = ["#FFE4C3", "#E0FAD5", "#FFD0DA", "#D4E0FF"];

export default function HomeScreen() {
  const app = useSelector((state: any) => state.app);
  const [search, setSearch] = useState("");

  return (
    <View style={{ flex: 1 }}>
      <GlowBG />
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: 60,
        }}
        edges={["left", "right"]}
      >
        <ScrollView
          style={{
            flex: 1,
            margin: 0,
            padding: 0,
            height: "100%",
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              paddingHorizontal: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 20,
                alignItems: "center",
              }}
            >
              <Menu />
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "100%",
                }}
              >
                <Image
                  source={{ uri: "https://avatar.iran.liara.run/public" }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 100,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                marginTop: 20,
                marginBottom: 10,
                flexDirection: "row",
                gap: 30,
                alignItems: "center",
              }}
            >
              <CustomSwitch />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "HostGrotesk",
                  fontStyle: "italic",
                }}
              >
                Available for trips
              </Text>
            </View>
            <View
              style={{
                marginTop: 20,
                marginBottom: 10,
                flexDirection: "row",
                gap: 3,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Outfit",
                }}
              >
                Welcome back,
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "OutfitBold",
                }}
              >
                Jacob
              </Text>
            </View>
            <Text
              style={{
                fontSize: 45,
                fontFamily: "HostGroteskBold",
                lineHeight: 55,
              }}
            >
              Pick up rides.
            </Text>
            <Text
              style={{
                fontSize: 45,
                lineHeight: 55,
                fontFamily: "HostGroteskBold",
              }}
            >
              Deliver goods.
            </Text>
            <Text
              style={{
                fontSize: 45,
                lineHeight: 55,
                fontFamily: "HostGroteskBold",
              }}
            >
              Get paid.
            </Text>

            {/* REQUESTS */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: "HostGroteskBold",
                  flex: 1,
                }}
              >
                Available Requests
              </Text>
              <Pressable
                onPress={() => router.push("/account/dashboard/trips")}
              >
                <Text
                  style={{
                    color: "#A09F9F",
                    fontSize: 16,
                    fontFamily: "HostGroteskBold",
                    width: 100,
                    textAlign: "right",
                  }}
                >
                  See All
                </Text>
              </Pressable>
            </View>
          </View>

          <View
            style={{
              marginTop: 15,
              paddingHorizontal: 15,
              paddingBottom: 15,
              gap: 10,
            }}
          >
            {[1, 2, 3, 4, 5].map((item, key) => (
              <RequestCard key={key} index={item} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function CustomSwitch() {
  const [on, setOn] = useState(false);
  const translateX = useRef(new Animated.Value(6)).current;

  const toggle = () => {
    Animated.timing(translateX, {
      toValue: on ? 6 : 70,
      duration: 200,
      useNativeDriver: true,
    }).start();

    setOn(!on);
  };

  return (
    <Pressable
      onPress={toggle}
      style={{
        width: 110,
        height: 40,
        borderRadius: 20,
        backgroundColor: on ? "#CCD9F8" : "#EAEAEA",
        position: "relative",
        justifyContent: "center",
      }}
    >
      {on ? (
        <Text
          style={{
            fontSize: 16,
            fontFamily: "HostGrotesk",
            paddingLeft: 15,
          }}
        >
          Online
        </Text>
      ) : (
        <Text
          style={{
            fontSize: 16,
            fontFamily: "HostGrotesk",
            textAlign: "right",
            paddingRight: 15,
          }}
        >
          Offline
        </Text>
      )}

      <Animated.View
        style={{
          width: 35,
          height: 35,
          borderRadius: 100,
          backgroundColor: on ? "#100152" : "#A4A4A4",
          position: "absolute",
          top: "50%",
          transform: [{ translateX }, { translateY: -17.5 }],
        }}
      />
    </Pressable>
  );
}
