import { Pressable, Text, View } from "react-native";

import { arrowLeft } from "@/icons";
import { deleteToken } from "@/utils/secureStore";
import { router } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

export default function SignOutComponent() {
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
            Sign Out
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
        <View style={{ flex: 1, paddingTop: 100 }}>
          <View
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 10,
              paddingVertical: 30,
              paddingHorizontal: 20,
              marginTop: 30,
            }}
          >
            <Text
              style={{
                fontFamily: "HostGrotesk",
                fontSize: 14,
                color: "#2A2A2A",
                marginBottom: 30,
                paddingHorizontal: 12,
                textAlign: "center",
              }}
            >
              Are you sure you want to sign out of your account?
            </Text>
            <View style={{ gap: 15 }}>
              <Pressable
                onPress={() => {
                  deleteToken();
                  router.replace("/login");
                }}
                style={{
                  width: "100%",
                  backgroundColor: "#100152",
                  paddingVertical: 18,
                  borderRadius: 6,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    fontFamily: "HostGroteskBold",
                    fontSize: 14,
                  }}
                >
                  Sign Out
                </Text>
              </Pressable>
              <Pressable
                onPress={() => router.back()}
                style={{
                  width: "100%",
                  borderWidth: 1,
                  borderColor: "#100152",
                  paddingVertical: 18,
                  borderRadius: 6,
                }}
              >
                <Text
                  style={{
                    color: "#100152",
                    textAlign: "center",
                    fontFamily: "HostGroteskBold",
                    fontSize: 14,
                  }}
                >
                  Cancel
                </Text>
              </Pressable>
            </View>
            <Pressable
              style={{
                alignItems: "center",
                marginTop: 30,
              }}
              onPress={() => router.replace("/login")}
            >
              <Text
                style={{
                  fontFamily: "HostGrotesk",
                  fontSize: 12,
                  color: "#100152",
                  textAlign: "center",
                }}
              >
                Switch Account
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
