import { Pressable, Text, View } from "react-native";

import { arrowLeft } from "@/icons";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, SvgXml } from "react-native-svg";
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
                backgroundColor: "#fff",
                paddingHorizontal: 10,
                marginBottom: 10,
                borderRadius: 12,
                alignItems: "center",
              }}
              key={key}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 20,
                }}
              >
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "#FFE9CE",
                    borderRadius: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M12.6869 1.34782L15.1963 7.07137C15.2908 7.28673 15.4413 7.47282 15.6321 7.61022C15.823 7.74762 16.0472 7.83129 16.2814 7.85253L22.3946 8.40065C23.0863 8.50132 23.3622 9.3496 22.8607 9.83806L18.2557 13.7066C17.8829 14.0198 17.7132 14.512 17.8158 14.9874L19.1544 21.2534C19.2718 21.9414 18.5503 22.4671 17.9313 22.1409L12.5956 19.0162C12.3944 18.8981 12.1652 18.8358 11.9319 18.8358C11.6985 18.8358 11.4694 18.8981 11.2682 19.0162L5.9324 22.139C5.31531 22.4634 4.59194 21.9395 4.70939 21.2516L6.04799 14.9855C6.14867 14.5101 5.98088 14.0179 5.60801 13.7047L1.00121 9.83992C0.501563 9.35333 0.777486 8.50318 1.46729 8.40251L7.58049 7.85439C7.81469 7.83316 8.03891 7.74948 8.22976 7.61208C8.42061 7.47468 8.5711 7.2886 8.66554 7.07323L11.1749 1.34969C11.4863 0.723267 12.3775 0.723267 12.6869 1.34782Z"
                      fill="#FBAF41"
                    />
                    <Path
                      d="M12.4991 7.41457L12.074 3.19742C12.0573 2.96251 12.0088 2.55981 12.3854 2.55981C12.6837 2.55981 12.8459 3.18064 12.8459 3.18064L14.1211 6.5663C14.6021 7.85456 14.4045 8.29641 13.9402 8.55742C13.407 8.85572 12.6203 8.62267 12.4991 7.41457Z"
                      fill="#FFFF8D"
                    />
                    <Path
                      d="M17.7596 13.3319L21.4174 10.4776C21.5983 10.3266 21.9245 10.0861 21.6635 9.81203C21.4566 9.59577 20.8973 9.90711 20.8973 9.90711L17.6962 11.1581C16.7416 11.4881 16.1078 11.9765 16.0518 12.5918C15.9791 13.4121 16.7155 14.0441 17.7596 13.3319Z"
                      fill="#F4B400"
                    />
                  </Svg>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "HostGroteskBold",
                    }}
                  >
                    ₦500 bonus added! 🎉
                  </Text>
                  <Text
                    style={{
                      color: "#686868",
                      fontSize: 12,
                      fontFamily: "HostGroteskBold",
                    }}
                  >
                    Expires in 2days.
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "HostGroteskBold",
                }}
              >
                ₦2,000
              </Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
