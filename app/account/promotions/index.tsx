import { Pressable, ScrollView, Text, View } from "react-native";

import { GlowBG } from "@/components/account/glow-bg";
import { arrowLeft } from "@/icons";
import { router, useNavigation } from "expo-router";
import { useState } from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

export default function Index() {
  const app = useSelector((state: any) => state.app);
  const [search, setSearch] = useState("");

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <GlowBG />
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
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 45,
                  fontFamily: "HostGroteskBold",
                  lineHeight: 55,
                }}
              >
                Referral
              </Text>
            </View>
            <Pressable
              onPress={() => navigation.openDrawer()}
              hitSlop={40}
              style={{
                height: 70,
                width: 70,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SvgXml xml={arrowLeft()} width={21} height={16} />
            </Pressable>
          </View>
          <View
            style={{
              marginTop: 20,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "HostGroteskBold",
                  marginBottom: 6,
                }}
              >
                Refer Drivers. Earn Commissions.
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "HostGrotesk",
                  color: "#686868",
                }}
              >
                Earn when drivers you invite complete trips on the paltform.
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Image
                source={require("@/assets/images/account/referral.png")}
                style={{
                  width: 380,
                  height: 180,
                }}
              />
            </View>
            <View
              style={{
                backgroundColor: "#fff",
                marginTop: 20,
                padding: 20,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#F2F2F2",
                  borderRadius: 10,
                  padding: 10,
                  gap: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#6A6A6A",
                    fontFamily: "HostGrotesk",
                  }}
                >
                  aibenmart/john1234
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#000000",
                      fontFamily: "HostGroteskBold",
                    }}
                  >
                    Copy
                  </Text>
                  <Svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                    <Path
                      d="M6.3666 0H10.1651C10.5539 0 10.9273 0.156104 11.2028 0.431582L13.2811 2.50991C13.5566 2.78539 13.7127 3.15882 13.7127 3.54755V10.2845C13.7127 11.0956 13.0546 11.7537 12.2435 11.7537H6.3666C5.55547 11.7537 4.89739 11.0956 4.89739 10.2845V1.46922C4.89739 0.658086 5.55547 0 6.3666 0ZM1.46922 3.91791H2.93843C3.47938 3.91791 3.91791 4.35644 3.91791 4.89739C3.91791 5.43834 3.47938 5.87687 2.93843 5.87687C2.39748 5.87687 1.95896 6.31539 1.95896 6.85634V10.7743C1.95896 12.3971 3.27454 13.7127 4.89739 13.7127H7.34608C7.61656 13.7127 7.83582 13.4934 7.83582 13.2229C7.83582 12.9525 8.05508 12.7332 8.32556 12.7332H8.8153C9.35625 12.7332 9.79478 13.1717 9.79478 13.7127V14.2024C9.79478 15.0136 9.13669 15.6716 8.32556 15.6716H1.46922C0.658086 15.6716 0 15.0136 0 14.2024V5.38713C0 4.576 0.658086 3.91791 1.46922 3.91791Z"
                      fill="black"
                    />
                  </Svg>
                </View>
              </View>
              <Pressable
                onPress={() => {}}
                style={{
                  width: "100%",
                  backgroundColor: "#100152",
                  paddingVertical: 14,
                  borderRadius: 10,
                  marginTop: 15,
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    textAlign: "center",
                    fontFamily: "HostGroteskBold",
                    fontSize: 14,
                  }}
                >
                  SHARE
                </Text>
              </Pressable>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "HostGrotesk",
                  color: "#686868",
                  marginTop: 13,
                }}
              >
                Referral earnings are paid directly into your wallet and can be
                withdrawn.
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#fff",
                marginTop: 20,
                paddingVertical: 16,
                paddingHorizontal: 20,
                borderRadius: 10,
                flexDirection: "row",
                gap: 10,
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
                    fontSize: 12,
                    fontFamily: "HostGrotesk",
                    marginBottom: 4,
                  }}
                >
                  Total Commissions
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "HostGroteskBold",
                  }}
                >
                  ₦20,000
                </Text>
              </View>
            </View>
            {/* EARNINGS */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 30,
                paddingHorizontal: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "HostGroteskBold",
                }}
              >
                Earnings
              </Text>
              <Pressable
                onPress={() => router.push("/account/promotions/earnings")}
              >
                <Text
                  style={{
                    color: "#A09F9F",
                    fontSize: 16,
                    fontFamily: "HostGroteskBold",
                  }}
                >
                  See All
                </Text>
              </Pressable>
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
