import { Image, Pressable, Text, View } from "react-native";

import { arrowLeft } from "@/icons";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

export default function Earnings() {
  const app = useSelector((state: any) => state.app);
  const [search, setSearch] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 15,
        }}
        edges={["left", "right", "top"]}
      >
        {/* NAV */}
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
            All Earnings
          </Text>
          <View
            style={{
              width: 70,
              height: 70,
              borderRadius: 100,
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </View>
        <ScrollView
          contentContainerStyle={{
            marginTop: 15,
            marginBottom: 30,
          }}
        >
          {[1, 2, 3, 4, 5].map((item, key) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 10,
                paddingRight: 20,
                // backgroundColor: "#fff",
                paddingHorizontal: 10,
                marginBottom: 10,
                borderRadius: 12,
              }}
              key={key}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 20,
                }}
              >
                <Image
                  source={{ uri: "https://avatar.iran.liara.run/public" }}
                  style={{
                    width: 45,
                    height: 45,
                    borderRadius: 100,
                  }}
                />
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "HostGroteskBold",
                    }}
                  >
                    Elohor Sunday
                  </Text>
                  <Text
                    style={{
                      color: "#686868",
                      fontSize: 12,
                      fontFamily: "HostGroteskBold",
                    }}
                  >
                    Signed Up Commission
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "HostGroteskBold",
                }}
              >
                ₦500 Earned 🎉
              </Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
