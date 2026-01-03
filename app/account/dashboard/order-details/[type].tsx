import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Call } from "@/components/account/call";
import { Chat } from "@/components/account/chat";
import { arrowLeft, delivery } from "@/icons";
import { router } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

const products = [
  require("@/assets/images/landing/Shoe.png"),
  require("@/assets/images/landing/Bag.png"),
  require("@/assets/images/landing/Jug.png"),
  require("@/assets/images/landing/Banana.png"),
  require("@/assets/images/landing/Orange.png"),
  require("@/assets/images/landing/Nike.png"),
];

export default function OrderDetails() {
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

      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingTop: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
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
            Order Details
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
        >
          <View
            style={{
              flex: 1,
              paddingBottom: 30,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "HostGroteskBold",
                    fontSize: 18,
                    marginBottom: 5,
                  }}
                >
                  Order ID #FD2364065
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "HostGroteskBold",
                      fontSize: 14,
                    }}
                  >
                    Tue, 10 Dec 2025
                  </Text>
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "100%",
                      backgroundColor: "#000000",
                    }}
                  ></View>
                  <Text
                    style={{
                      fontFamily: "HostGroteskBold",
                      fontSize: 14,
                    }}
                  >
                    11:51 am
                  </Text>
                </View>
              </View>
              <View
                style={{
                  padding: 10,
                  paddingHorizontal: 15,
                  backgroundColor: "#D7E1F8",
                  borderRadius: 100,
                  alignSelf: "flex-start",
                }}
              >
                <Text
                  style={{
                    fontFamily: "HostGroteskBold",
                    fontSize: 12,
                    color: "#2A59CA",
                  }}
                >
                  New Order
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#ffffff",
                padding: 20,
                borderRadius: 12,
                marginTop: 30,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flex: 2,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "HostGroteskBold",
                      fontSize: 18,
                      marginBottom: 15,
                    }}
                  >
                    On the way
                  </Text>
                  <Text
                    style={{
                      fontFamily: "HostGroteskBold",
                      fontSize: 14,
                      color: "#686868",
                    }}
                  >
                    Your cargo is on pickup
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "HostGroteskBold",
                      fontSize: 14,
                      color: "#686868",
                    }}
                  >
                    (EST)
                  </Text>
                  <Text
                    style={{
                      fontFamily: "HostGroteskBold",
                      fontSize: 16,
                    }}
                  >
                    09hr : 20min
                  </Text>
                </View>
              </View>
              <View
                style={{
                  position: "relative",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 45,
                    marginBottom: 50,
                  }}
                >
                  {[1, 2, 3].map((item, key) => (
                    <View
                      key={key}
                      style={{
                        width: 40,
                        height: 12,
                        flex: 1,
                        backgroundColor: item == 1 ? "#FBAF41" : "#D9D9D9",
                      }}
                    ></View>
                  ))}
                  {[1, 2, 3].map((item, key) => (
                    <View
                      key={key}
                      style={[
                        {
                          width: 44,
                          height: 44,
                          borderRadius: "100%",
                          backgroundColor: item == 1 ? "#FBAF41" : "#D9D9D9",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "absolute",
                          top: "50%",
                          transform: [
                            {
                              translateY: "-50%",
                            },
                            {
                              translateX: item == 2 ? "-50%" : 0,
                            },
                          ],
                        },
                        item < 3 && {
                          left: item == 1 ? -5 : "50%",
                        },
                        item == 3 && {
                          right: -5,
                        },
                      ]}
                    >
                      {item == 1 ? (
                        <Svg
                          width="21"
                          height="19"
                          viewBox="0 0 21 19"
                          fill="none"
                        >
                          <Path
                            d="M19.4021 6.97067C19.4009 7.61213 19.201 8.23745 18.83 8.76068C18.4589 9.28391 17.9348 9.67933 17.3299 9.89259C16.999 10.0168 16.6482 10.08 16.2948 10.0791C15.6533 10.0779 15.028 9.87797 14.5047 9.50689C13.9815 9.13581 13.5861 8.61177 13.3728 8.0068C13.2485 7.67556 13.1853 7.32449 13.1864 6.97067C13.1894 7.32445 13.1259 7.67621 12.9999 8.0068C12.7867 8.6116 12.3914 9.13554 11.8684 9.5066C11.3454 9.87766 10.7203 10.0776 10.079 10.0791C9.43772 10.0776 8.81261 9.87766 8.28959 9.5066C7.76656 9.13554 7.37129 8.6116 7.15808 8.0068C7.03373 7.67556 6.97055 7.32449 6.97162 6.97067C6.97364 7.32445 6.91115 7.67621 6.78516 8.0068C6.5719 8.61177 6.17647 9.13581 5.65324 9.50689C5.13002 9.87797 4.50469 10.0779 3.86324 10.0791C3.51047 10.0811 3.1577 10.0186 2.82812 9.89259C2.22315 9.67933 1.6991 9.28391 1.32803 8.76068C0.95695 8.23745 0.757066 7.61213 0.755859 6.97067L1.22151 5.33484L2.34029 2.14381C2.48284 1.73818 2.7478 1.3868 3.09859 1.1382C3.44938 0.889593 3.8687 0.75602 4.29865 0.75592H15.8593C16.2891 0.756229 16.7082 0.889899 17.0588 1.13849C17.4094 1.38708 17.6742 1.73834 17.8167 2.14381L18.9355 5.33484L19.4021 6.97067Z"
                            stroke="black"
                            stroke-width="1.51186"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <Path
                            d="M17.33 9.89258V15.2587C17.3297 15.8079 17.1114 16.3346 16.723 16.723C16.3346 17.1113 15.8079 17.3297 15.2587 17.3299H4.89843C4.62634 17.3301 4.3569 17.2766 4.10549 17.1725C3.85407 17.0685 3.62562 16.916 3.43318 16.7236C3.24074 16.5313 3.08809 16.3029 2.98393 16.0515C2.87978 15.8002 2.82617 15.5308 2.82617 15.2587V9.89258M6.97169 14.2225H13.1864"
                            stroke="black"
                            stroke-width="1.51186"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </Svg>
                      ) : item == 2 ? (
                        <SvgXml
                          xml={delivery("#000000")}
                          width={26}
                          height={26}
                        />
                      ) : (
                        <Svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <Path
                            d="M8.03246 0.533679C8.46415 0.189025 9.01055 0 9.57511 0C10.1397 0 10.6861 0.189025 11.1178 0.533679L18.2991 6.27022C18.8385 6.70157 19.1502 7.33549 19.1502 8.00368V17.3865C19.1502 17.8543 18.9541 18.3029 18.6049 18.6337C18.2557 18.9644 17.7822 19.1502 17.2884 19.1502H13.5647C13.071 19.1502 12.5974 18.9644 12.2482 18.6337C11.8991 18.3029 11.7029 17.8543 11.7029 17.3865V12.3404C11.7029 12.2735 11.6749 12.2094 11.625 12.1622C11.5751 12.1149 11.5075 12.0884 11.4369 12.0884H7.71329C7.64274 12.0884 7.57509 12.1149 7.52521 12.1622C7.47533 12.2094 7.44731 12.2735 7.44731 12.3404V17.3865C7.44731 17.8543 7.25115 18.3029 6.90199 18.6337C6.55283 18.9644 6.07927 19.1502 5.58548 19.1502H1.86183C1.61733 19.1502 1.37522 19.1046 1.14934 19.016C0.92345 18.9273 0.718203 18.7974 0.545317 18.6337C0.37243 18.4699 0.235289 18.2755 0.141723 18.0615C0.0481577 17.8475 0 17.6181 0 17.3865V8.00368C0 7.33549 0.311723 6.70157 0.851121 6.27022L8.03246 0.533679ZM10.089 1.68965C9.94513 1.57495 9.76314 1.51204 9.57511 1.51204C9.38708 1.51204 9.2051 1.57495 9.06125 1.68965L1.87991 7.42519C1.79104 7.49605 1.71958 7.58445 1.67052 7.68419C1.62145 7.78394 1.59597 7.89263 1.59585 8.00267V17.3855C1.59585 17.5246 1.71501 17.6375 1.86183 17.6375H5.58548C5.65602 17.6375 5.72368 17.6109 5.77356 17.5637C5.82344 17.5164 5.85146 17.4523 5.85146 17.3855V12.3393C5.85146 11.3648 6.68556 10.5756 7.71329 10.5756H11.4369C12.4647 10.5756 13.2988 11.3648 13.2988 12.3393V17.3855C13.2988 17.5246 13.4179 17.6375 13.5647 17.6375H17.2884C17.3589 17.6375 17.4266 17.6109 17.4765 17.5637C17.5264 17.5164 17.5544 17.4523 17.5544 17.3855V8.00267C17.5543 7.89263 17.5288 7.78394 17.4797 7.68419C17.4306 7.58445 17.3592 7.49605 17.2703 7.42519L10.089 1.68965Z"
                            fill="black"
                          />
                        </Svg>
                      )}
                    </View>
                  ))}
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "100%",
                      backgroundColor: "#A380FF",
                      padding: 2,
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
                  <View>
                    <Text
                      style={{
                        color: "#686868",
                        fontFamily: "HostGroteskBold",
                        fontSize: 13,
                        marginBottom: 3,
                      }}
                    >
                      Your Rider
                    </Text>
                    <Text
                      style={{
                        color: "#000000",
                        fontFamily: "HostGroteskBold",
                        fontSize: 14,
                        marginBottom: 3,
                      }}
                    >
                      Aisha Yusuf
                    </Text>
                  </View>
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
            </View>
            <View
              style={{
                marginTop: 40,
              }}
            >
              <Text
                style={{
                  fontFamily: "HostGroteskBold",
                  fontSize: 18,
                  marginBottom: 10,
                }}
              >
                Order Details
              </Text>
              <View>
                <Card />
                <Card />
              </View>
              <Text
                style={{
                  fontFamily: "HostGroteskBold",
                  fontSize: 14,
                }}
              >
                View More
              </Text>
            </View>
            <View
              style={{
                marginTop: 30,
                gap: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontFamily: "HostGroteskBold",
                    fontSize: 14,
                    color: "#686868",
                  }}
                >
                  Total Amount
                </Text>
                <Text
                  style={{
                    fontFamily: "HostGroteskBold",
                    fontSize: 14,
                    textAlign: "right",
                  }}
                >
                  ₦ 2,000,000
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontFamily: "HostGroteskBold",
                    fontSize: 14,
                    color: "#686868",
                  }}
                >
                  Discount
                </Text>
                <Text
                  style={{
                    fontFamily: "HostGroteskBold",
                    fontSize: 14,
                    textAlign: "right",
                  }}
                >
                  None
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontFamily: "HostGroteskBold",
                    fontSize: 14,
                    color: "#686868",
                  }}
                >
                  Delivery Fee
                </Text>
                <Text
                  style={{
                    fontFamily: "HostGroteskBold",
                    fontSize: 14,
                    textAlign: "right",
                  }}
                >
                  ₦ 20,000
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontFamily: "HostGroteskBold",
                    fontSize: 14,
                    color: "#686868",
                  }}
                >
                  Payment Method
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "HostGroteskBold",
                      fontSize: 14,
                      textAlign: "right",
                    }}
                  >
                    Bank transfer
                  </Text>
                  <View
                    style={{
                      backgroundColor: "#1EB723",
                      paddingVertical: 5,
                      paddingHorizontal: 15,
                      borderRadius: 100,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "HostGroteskBold",
                        fontSize: 14,
                        textAlign: "right",
                        color: "#ffffff",
                      }}
                    >
                      Paid
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const Card = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 15,
        alignItems: "center",

        backgroundColor: "#ffffff",
        flex: 1,
        marginBottom: 20,
        padding: 5,
        gap: 6,
      }}
    >
      <Image
        source={products[0]}
        style={{
          width: 90,
          height: 90,
          borderRadius: 14,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          gap: 4,
          paddingHorizontal: 10,
          paddingTop: 5,
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            height: "100%",
            paddingVertical: 10,
          }}
        >
          <Text
            numberOfLines={2}
            style={{
              fontSize: 14,
              fontFamily: "HostGroteskBold",
            }}
          >
            Pepperoni Pizza Slices
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "HostGroteskBold",
            }}
          >
            ₦400,000
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "HostGroteskBold",
            fontSize: 12,
            textAlign: "right",
            color: "#A09F9F",
          }}
        >
          Qty: 1 Item
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#0E0E0E",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  logo: {
    height: 45,
    width: 45,
  },
  banner: {
    height: 114,
    width: "100%",
  },
  sectionTabText: {
    color: "#B0B0B0",
    paddingVertical: 15,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: "MontserratItalic",
  },
  btn: {
    backgroundColor: "#08A9D2",
    borderRadius: 5,
    paddingTop: 10,
    paddingHorizontal: 10,
    height: 40,
    fontFamily: "Montserrat",
    marginHorizontal: 20,
  },
  categoryView: {
    borderBottomColor: "#B0B0B0",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
});
