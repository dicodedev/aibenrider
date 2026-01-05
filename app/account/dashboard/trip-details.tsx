import { Image, Pressable, ScrollView, Text, View } from "react-native";

import { Call } from "@/components/account/call";
import { Chat } from "@/components/account/chat";
import { arrowLeft } from "@/icons";
import { router } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, Rect, SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

const products = [
  require("@/assets/images/landing/Shoe.png"),
  require("@/assets/images/landing/Bag.png"),
  require("@/assets/images/landing/Jug.png"),
  require("@/assets/images/landing/Banana.png"),
  require("@/assets/images/landing/Orange.png"),
  require("@/assets/images/landing/Nike.png"),
];

export default function TripDetails() {
  const app = useSelector((state: any) => state.app);
  const [call, setCall] = useState(false);
  const [chat, setChat] = useState(false);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {call && <Call setCall={setCall} />}

      <Chat visible={chat} setVisible={setChat} />

      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          backgroundColor: "#fff",
          width: "100%",
          paddingVertical: 20,
          paddingHorizontal: 15,
          zIndex: 1000,
        }}
      >
        <Pressable
          onPress={() => {}}
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
            COMPLETE TRIP
          </Text>
        </Pressable>
      </View>

      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingTop: 10,
          paddingBottom: 100,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 30,
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
            Delivery Trip Details
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
        <ScrollView
          style={{
            flex: 1,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flex: 1,
              paddingBottom: 30,
            }}
          >
            <Text
              style={{
                fontFamily: "HostGroteskBold",
                fontSize: 18,
              }}
            >
              Trip Information
            </Text>
            <View
              style={{
                backgroundColor: "#ffffff",
                padding: 20,
                paddingBottom: 0,
                borderRadius: 12,
                marginTop: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 15,
                }}
              >
                <View
                  style={{
                    width: 41,
                    height: 41,
                    borderRadius: "100%",
                    backgroundColor: "#FDCB8D",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Svg width="18" height="17" viewBox="0 0 18 17" fill="none">
                    <Path
                      d="M9.57664 0.275285C8.94529 0.0325262 8.24634 0.0325262 7.61498 0.275285L1.35832 2.68151C0.986017 2.82475 0.665852 3.07743 0.440021 3.40626C0.21419 3.73508 0.0932925 4.12462 0.0932617 4.52352V12.3641C0.0932925 12.763 0.21419 13.1525 0.440021 13.4814C0.665852 13.8102 0.986017 14.0629 1.35832 14.2061L7.61498 16.6123C8.24634 16.8551 8.94529 16.8551 9.57664 16.6123L15.8333 14.2061C16.2056 14.0629 16.5258 13.8102 16.7516 13.4814C16.9774 13.1525 17.0983 12.763 17.0984 12.3641V4.52352C17.0983 4.12462 16.9774 3.73508 16.7516 3.40626C16.5258 3.07743 16.2056 2.82475 15.8333 2.68151L9.57664 0.275285ZM8.05104 1.40916C8.40171 1.27436 8.78991 1.27436 9.14058 1.40916L14.799 3.58521L12.5434 4.45368L6.34021 2.06689L8.05104 1.40916ZM4.6482 2.71673L10.8514 5.10352L8.59581 5.97139L2.39259 3.58521L4.6482 2.71673ZM1.30973 4.47008L7.98849 7.03906V15.4548L1.79438 13.0722C1.65126 13.0171 1.52817 12.92 1.44133 12.7936C1.3545 12.6672 1.30798 12.5174 1.30791 12.3641V4.52352C1.30791 4.5053 1.30852 4.48749 1.30973 4.47008ZM9.20314 15.4548V7.03906L15.8819 4.47008L15.8837 4.52352V12.3641C15.8837 12.6781 15.69 12.9593 15.3972 13.0722L9.20314 15.4548Z"
                      fill="#CA7A07"
                      stroke="#CA7A07"
                      stroke-width="0.186435"
                    />
                  </Svg>
                </View>
                <Text
                  style={{
                    fontFamily: "HostGroteskBold",
                    fontSize: 18,
                  }}
                >
                  Delivery
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 44,
                      height: 44,
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
                  <Text
                    style={{
                      fontFamily: "HostGroteskBold",
                      fontSize: 17,
                      marginBottom: 3,
                    }}
                  >
                    Aluya Ono
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 20,
                  }}
                >
                  <Pressable
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "100%",
                      backgroundColor: "#CCD9F8",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => setCall(true)}
                  >
                    <Svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <Path
                        d="M2.00816 6.25199L3.9989 4.26124C4.19668 4.06016 4.33657 3.80947 4.40385 3.53556C4.47114 3.26166 4.46331 2.97468 4.38121 2.70485C4.24171 2.24584 4.11846 1.78205 4.01172 1.31434C3.92425 0.904883 3.56456 0.565552 3.14529 0.565552H2.00816C1.17114 0.565552 0.482677 1.24723 0.574673 2.07972C1.27294 8.40787 6.29806 13.4322 12.6255 14.1305C13.4579 14.2225 14.1396 13.5348 14.1396 12.6978V11.5591C14.1396 11.1414 13.7988 10.7975 13.3871 10.7221C12.9345 10.6341 12.4878 10.5185 12.0493 10.376C11.471 10.192 10.8285 10.3217 10.3994 10.75L8.45319 12.697"
                        stroke="#100152"
                        stroke-width="1.1311"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </Svg>
                  </Pressable>
                  <Pressable
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "100%",
                      backgroundColor: "#E0FAD5",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => setChat(true)}
                  >
                    <Svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                      <Path
                        d="M8.35694 10.3671H16.8091M8.35694 14.8008H14.3846M12.583 22.284C14.6902 22.2835 16.7399 21.597 18.4221 20.3281C20.1044 19.0592 21.3277 17.277 21.9071 15.2511C22.4865 13.2251 22.3904 11.0656 21.6334 9.09913C20.8764 7.13265 19.4997 5.46615 17.7114 4.35167C15.9231 3.23718 13.8205 2.73533 11.7216 2.922C9.62274 3.10867 7.64173 3.97372 6.07819 5.38632C4.51465 6.79891 3.45361 8.68223 3.05553 10.7514C2.65746 12.8207 2.94401 14.9632 3.87184 16.8551C3.98509 17.0858 4.02285 17.3459 3.96517 17.5955L3.10947 21.3035C3.08534 21.4076 3.08811 21.5161 3.11751 21.6187C3.14691 21.7214 3.20196 21.815 3.2775 21.8905C3.35303 21.966 3.44655 22.0211 3.54925 22.0505C3.65195 22.0799 3.76044 22.0827 3.8645 22.0585L7.5715 21.2018C7.82178 21.147 8.08332 21.1803 8.31185 21.2962C9.64091 21.9488 11.1024 22.2868 12.583 22.284Z"
                        stroke="#49932C"
                        stroke-width="2.09731"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </Svg>
                  </Pressable>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: "#FFFFFF",
                  flexDirection: "row",
                  marginTop: 30,
                  borderRadius: 10,
                  gap: 15,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <Rect width="22" height="22" rx="11" fill="#49932C" />
                    <Path
                      d="M6.00014 8.67285L8.7952 13.5161L17.184 8.67284"
                      stroke="white"
                      stroke-width="1.49097"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </Svg>
                  <View
                    style={{
                      borderLeftWidth: 1,
                      height: 54,
                      borderStyle: "dashed",
                    }}
                  ></View>

                  <Svg width="17" height="22" viewBox="0 0 17 22" fill="none">
                    <Path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.71588 21.3924C7.71588 21.3924 0 14.8941 0 8.5C0 6.24566 0.895533 4.08365 2.48959 2.48959C4.08365 0.895533 6.24566 0 8.5 0C10.7543 0 12.9163 0.895533 14.5104 2.48959C16.1045 4.08365 17 6.24566 17 8.5C17 14.8941 9.28413 21.3924 9.28413 21.3924C8.85487 21.7876 8.14831 21.7834 7.71588 21.3924ZM8.5 12.2188C8.98835 12.2188 9.47192 12.1226 9.9231 11.9357C10.3743 11.7488 10.7842 11.4749 11.1296 11.1296C11.4749 10.7842 11.7488 10.3743 11.9357 9.9231C12.1226 9.47192 12.2188 8.98835 12.2188 8.5C12.2188 8.01165 12.1226 7.52808 11.9357 7.0769C11.7488 6.62572 11.4749 6.21576 11.1296 5.87045C10.7842 5.52513 10.3743 5.25121 9.9231 5.06432C9.47192 4.87744 8.98835 4.78125 8.5 4.78125C7.51373 4.78125 6.56785 5.17305 5.87045 5.87045C5.17305 6.56785 4.78125 7.51373 4.78125 8.5C4.78125 9.48627 5.17305 10.4322 5.87045 11.1296C6.56785 11.827 7.51373 12.2188 8.5 12.2188Z"
                      fill="#F44336"
                    />
                  </Svg>
                </View>
                <View
                  style={{
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontFamily: "HostGrotesk",
                        fontSize: 16,
                      }}
                    >
                      Pickup
                    </Text>
                    <Text
                      style={{
                        fontFamily: "HostGroteskBold",
                        fontSize: 18,
                      }}
                    >
                      Along Ikoyi Road Island
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontFamily: "HostGroteskBold",
                      fontSize: 18,
                      marginTop: 30,
                    }}
                  >
                    Lekki Phase 1
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: "10",
                  alignItems: "center",
                  paddingBottom: 20,
                  marginTop: 30,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      backgroundColor: "#E0FAD5",
                      borderRadius: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Svg width="26" height="22" viewBox="0 0 26 22" fill="none">
                      <Path
                        d="M15.4583 9.04167C15.4583 9.81522 15.151 10.5571 14.6041 11.1041C14.0571 11.651 13.3152 11.9583 12.5417 11.9583C11.7681 11.9583 11.0263 11.651 10.4793 11.1041C9.93229 10.5571 9.625 9.81522 9.625 9.04167C9.625 8.26812 9.93229 7.52625 10.4793 6.97927C11.0263 6.43229 11.7681 6.125 12.5417 6.125C13.3152 6.125 14.0571 6.43229 14.6041 6.97927C15.151 7.52625 15.4583 8.26812 15.4583 9.04167Z"
                        stroke="#49932C"
                        stroke-width="1.75"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <Path
                        d="M17.2084 0.875C20.1017 0.875 22.0967 1.323 23.1969 1.66367C23.8304 1.86083 24.2084 2.4605 24.2084 3.12317V14.504C24.2084 15.8048 22.7757 16.7837 21.497 16.5433C20.4004 16.3357 18.9712 16.17 17.2084 16.17C11.6667 16.17 10.3367 18.2758 2.21087 16.485C1.8297 16.3986 1.48949 16.1846 1.24655 15.8784C1.00362 15.5723 0.872544 15.1923 0.875035 14.8015V3.11617C0.875035 1.9775 1.94837 1.148 3.06603 1.36967C10.4382 2.8315 11.8662 0.875 17.2084 0.875Z"
                        stroke="#49932C"
                        stroke-width="1.75"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <Path
                        d="M0.875 5.54165C3.15117 5.54165 5.1975 3.68081 5.45883 1.75465M20.125 1.45831C20.125 3.83831 22.1842 6.08881 24.2083 6.08881M24.2083 12.5416C21.9917 12.5416 19.845 14.07 19.6607 16.156M5.54167 16.6203C5.54167 15.3826 5.05 14.1957 4.17483 13.3205C3.29966 12.4453 2.11268 11.9536 0.875 11.9536M20.7083 19.8135C19.551 19.628 18.3804 19.5371 17.2083 19.5416C12.1987 19.5416 10.6307 21.4783 4.375 20.3618"
                        stroke="#49932C"
                        stroke-width="1.75"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </Svg>
                  </View>
                  <Text
                    style={{
                      fontFamily: "HostGroteskBold",
                      fontSize: 20,
                    }}
                  >
                    ₦ 3,000
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: "HostGroteskBold",
                    fontSize: 16,
                    color: "#9F9F9F",
                  }}
                >
                  Total
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "HostGroteskBold",
                    fontSize: 14,
                    color: "#686868",
                  }}
                >
                  Trip Status
                </Text>
                <View
                  style={{
                    paddingVertical: 3,
                    paddingHorizontal: 15,
                    backgroundColor: "#FBAF41",
                    borderRadius: 100,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "HostGroteskBold",
                      fontSize: 14,
                      color: "#FFFFFF",
                    }}
                  >
                    Ongoing
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 40,
                  flexDirection: "row",
                  alignItems: "flex-end",
                  gap: 30,
                  justifyContent: "center",
                }}
              >
                <Pressable
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    backgroundColor: "#DA8913",
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "HostGroteskBold",
                      fontSize: 14,
                      color: "#ffffff",
                    }}
                  >
                    Accept Trip
                  </Text>
                </Pressable>
                <Pressable
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    backgroundColor: "#EAEAEA",
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "HostGroteskBold",
                      fontSize: 14,
                    }}
                  >
                    Decline Trip
                  </Text>
                </Pressable>
              </View>
            </View>
            <View
              style={{
                padding: 15,
                marginTop: 100,
                backgroundColor: "#ffffff",
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  fontFamily: "Outfit",
                  fontSize: 18,
                  color: "#6A6A6A",
                }}
              >
                Map Location
              </Text>
              <View
                style={{
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Image
                  source={require("@/assets/images/account/map.png")}
                  style={{
                    width: 380,
                    height: 180,
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
