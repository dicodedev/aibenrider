import { Image, Pressable, ScrollView, Text, View } from "react-native";

import { GlowBG } from "@/components/account/glow-bg";
import { Menu } from "@/components/account/menu";
import { delivery } from "@/icons";
import { router } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

const colors = ["#FFE4C3", "#E0FAD5", "#FFD0DA", "#D4E0FF"];

const options = [
  {
    color: "#E0FAD5",
    icon: (
      <Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <Path
          d="M16.9154 12.25C16.9154 13.0235 16.6081 13.7654 16.0611 14.3124C15.5141 14.8594 14.7722 15.1666 13.9987 15.1666C13.2251 15.1666 12.4833 14.8594 11.9363 14.3124C11.3893 13.7654 11.082 13.0235 11.082 12.25C11.082 11.4764 11.3893 10.7346 11.9363 10.1876C12.4833 9.6406 13.2251 9.33331 13.9987 9.33331C14.7722 9.33331 15.5141 9.6406 16.0611 10.1876C16.6081 10.7346 16.9154 11.4764 16.9154 12.25Z"
          stroke="#49932C"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M18.6654 4.08331C21.5587 4.08331 23.5537 4.53131 24.6539 4.87198C25.2874 5.06915 25.6654 5.66881 25.6654 6.33148V17.7123C25.6654 19.0131 24.2327 19.992 22.9541 19.7516C21.8574 19.544 20.4282 19.3783 18.6654 19.3783C13.1237 19.3783 11.7937 21.4841 3.6679 19.6933C3.28674 19.6069 2.94652 19.3929 2.70358 19.0868C2.46065 18.7806 2.32957 18.4006 2.33207 18.0098V6.32448C2.33207 5.18581 3.4054 4.35631 4.52307 4.57798C11.8952 6.03981 13.3232 4.08331 18.6654 4.08331Z"
          stroke="#49932C"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M2.33203 8.75002C4.6082 8.75002 6.65453 6.88919 6.91586 4.96302M21.582 4.66669C21.582 7.04669 23.6412 9.29719 25.6654 9.29719M25.6654 15.75C23.4487 15.75 21.302 17.2784 21.1177 19.3644M6.9987 19.8287C6.9987 18.591 6.50703 17.404 5.63186 16.5289C4.75669 15.6537 3.56971 15.162 2.33203 15.162M22.1654 23.0219C21.008 22.8364 19.8375 22.7454 18.6654 22.75C13.6557 22.75 12.0877 24.6867 5.83203 23.5702"
          stroke="#49932C"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    ),
  },
  {
    color: "#FFDAAD",
    icon: (
      <Svg width="24" height="21" viewBox="0 0 24 21" fill="none">
        <Path
          d="M22.3042 8.01399C22.3029 8.75145 22.0731 9.47037 21.6464 10.0719C21.2198 10.6734 20.6173 11.1281 19.9218 11.3732C19.5414 11.5161 19.1382 11.5887 18.7318 11.5876C17.9943 11.5862 17.2754 11.3564 16.6739 10.9298C16.0723 10.5032 15.6177 9.90071 15.3725 9.2052C15.2296 8.82438 15.1569 8.42076 15.1582 8.01399C15.1616 8.42072 15.0886 8.82512 14.9438 9.2052C14.6987 9.90052 14.2443 10.5029 13.6429 10.9295C13.0416 11.3561 12.323 11.586 11.5857 11.5876C10.8485 11.586 10.1298 11.3561 9.52849 10.9295C8.92718 10.5029 8.47274 9.90052 8.22763 9.2052C8.08467 8.82438 8.01203 8.42076 8.01326 8.01399C8.01558 8.42072 7.94373 8.82512 7.79889 9.2052C7.55371 9.90071 7.0991 10.5032 6.49756 10.9298C5.89602 11.3564 5.1771 11.5862 4.43964 11.5876C4.03408 11.5899 3.62851 11.5181 3.2496 11.3732C2.55409 11.1281 1.95161 10.6734 1.52499 10.0719C1.09837 9.47037 0.868575 8.75145 0.867188 8.01399L1.40253 6.13333L2.68876 2.46469C2.85265 1.99835 3.15726 1.59439 3.56056 1.30857C3.96385 1.02276 4.44593 0.869195 4.94023 0.86908H18.2312C18.7253 0.869434 19.2071 1.02311 19.6102 1.30891C20.0133 1.5947 20.3177 1.99854 20.4815 2.46469L21.7677 6.13333L22.3042 8.01399Z"
          stroke="#C76A0C"
          stroke-width="1.73814"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M19.9246 11.3732V17.5425C19.9242 18.1739 19.6733 18.7794 19.2268 19.2259C18.7803 19.6724 18.1748 19.9234 17.5433 19.9237H5.63241C5.3196 19.9239 5.00983 19.8624 4.72079 19.7428C4.43175 19.6232 4.1691 19.4478 3.94786 19.2267C3.72662 19.0055 3.55111 18.743 3.43137 18.454C3.31163 18.165 3.25 17.8553 3.25 17.5425V11.3732M8.01598 16.3513H15.1609"
          stroke="#C76A0C"
          stroke-width="1.73814"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    ),
  },
  {
    color: "#FFD0DA",
    icon: (
      <Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <Path
          d="M16.9154 12.25C16.9154 13.0235 16.6081 13.7654 16.0611 14.3124C15.5141 14.8594 14.7722 15.1666 13.9987 15.1666C13.2251 15.1666 12.4833 14.8594 11.9363 14.3124C11.3893 13.7654 11.082 13.0235 11.082 12.25C11.082 11.4764 11.3893 10.7346 11.9363 10.1876C12.4833 9.6406 13.2251 9.33331 13.9987 9.33331C14.7722 9.33331 15.5141 9.6406 16.0611 10.1876C16.6081 10.7346 16.9154 11.4764 16.9154 12.25Z"
          stroke="#CA1616"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M18.6654 4.08331C21.5587 4.08331 23.5537 4.53131 24.6539 4.87198C25.2874 5.06915 25.6654 5.66881 25.6654 6.33148V17.7123C25.6654 19.0131 24.2327 19.992 22.9541 19.7516C21.8574 19.544 20.4282 19.3783 18.6654 19.3783C13.1237 19.3783 11.7937 21.4841 3.6679 19.6933C3.28674 19.6069 2.94652 19.3929 2.70358 19.0868C2.46065 18.7806 2.32957 18.4006 2.33207 18.0098V6.32448C2.33207 5.18581 3.4054 4.35631 4.52307 4.57798C11.8952 6.03981 13.3232 4.08331 18.6654 4.08331Z"
          stroke="#CA1616"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M2.33203 8.75002C4.6082 8.75002 6.65453 6.88919 6.91586 4.96302M21.582 4.66669C21.582 7.04669 23.6412 9.29719 25.6654 9.29719M25.6654 15.75C23.4487 15.75 21.302 17.2784 21.1177 19.3644M6.9987 19.8287C6.9987 18.591 6.50703 17.404 5.63186 16.5289C4.75669 15.6537 3.56971 15.162 2.33203 15.162M22.1654 23.0219C21.008 22.8364 19.8375 22.7454 18.6654 22.75C13.6557 22.75 12.0877 24.6867 5.83203 23.5702"
          stroke="#CA1616"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    ),
  },
  {
    color: "#CCD9F8",
    icon: <SvgXml xml={delivery("#1B5EB5")} width={22} height={19} />,
  },
];

export default function Wallet() {
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
                marginBottom: 40,
                alignItems: "center",
              }}
            >
              <Menu />
              <Image
                source={{ uri: "https://avatar.iran.liara.run/public" }}
                style={{
                  width: 51,
                  height: 51,
                  borderRadius: 100,
                }}
              />
            </View>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "HostGroteskBold",
                  textAlign: "center",
                }}
              >
                Wallet balance
              </Text>
              <Text
                style={{
                  fontSize: 36,
                  fontFamily: "HostGroteskBold",
                  textAlign: "center",
                }}
              >
                ₦ 10,000
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 10,
            }}
          >
            <Pressable
              style={{
                width: "100%",
                backgroundColor: "#100152",
                paddingVertical: 20,
                borderRadius: 12,
                marginTop: 30,
                gap: 20,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {}}
            >
              <Svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                <Path
                  d="M15.8333 10C15.6123 10 15.4004 10.0878 15.2441 10.2441C15.0878 10.4004 15 10.6123 15 10.8333V14.1667C15 14.3877 14.9122 14.5996 14.7559 14.7559C14.5996 14.9122 14.3877 15 14.1667 15H2.5C2.27899 15 2.06702 14.9122 1.91074 14.7559C1.75446 14.5996 1.66667 14.3877 1.66667 14.1667V10.8333C1.66667 10.6123 1.57887 10.4004 1.42259 10.2441C1.26631 10.0878 1.05435 10 0.833333 10C0.61232 10 0.400358 10.0878 0.244078 10.2441C0.0877973 10.4004 0 10.6123 0 10.8333V14.1667C0 14.8297 0.263392 15.4656 0.732233 15.9344C1.20107 16.4033 1.83696 16.6667 2.5 16.6667H14.1667C14.8297 16.6667 15.4656 16.4033 15.9344 15.9344C16.4033 15.4656 16.6667 14.8297 16.6667 14.1667V10.8333C16.6667 10.6123 16.5789 10.4004 16.4226 10.2441C16.2663 10.0878 16.0543 10 15.8333 10ZM7.74167 11.425C7.82092 11.5009 7.91437 11.5603 8.01667 11.6C8.11642 11.6441 8.22427 11.6669 8.33333 11.6669C8.44239 11.6669 8.55025 11.6441 8.65 11.6C8.75229 11.5603 8.84575 11.5009 8.925 11.425L12.2583 8.09167C12.4153 7.93475 12.5034 7.72192 12.5034 7.5C12.5034 7.27808 12.4153 7.06525 12.2583 6.90833C12.1014 6.75141 11.8886 6.66326 11.6667 6.66326C11.4447 6.66326 11.2319 6.75141 11.075 6.90833L9.16667 8.825V0.833333C9.16667 0.61232 9.07887 0.400358 8.92259 0.244078C8.76631 0.0877973 8.55435 0 8.33333 0C8.11232 0 7.90036 0.0877973 7.74408 0.244078C7.5878 0.400358 7.5 0.61232 7.5 0.833333V8.825L5.59167 6.90833C5.51397 6.83063 5.42173 6.769 5.32021 6.72695C5.21869 6.6849 5.10988 6.66326 5 6.66326C4.89012 6.66326 4.78131 6.6849 4.67979 6.72695C4.57827 6.769 4.48603 6.83063 4.40833 6.90833C4.33063 6.98603 4.269 7.07827 4.22695 7.17979C4.1849 7.28131 4.16326 7.39012 4.16326 7.5C4.16326 7.60988 4.1849 7.71869 4.22695 7.82021C4.269 7.92173 4.33063 8.01397 4.40833 8.09167L7.74167 11.425Z"
                  fill="white"
                />
              </Svg>

              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontFamily: "HostGroteskBold",
                  fontSize: 16,
                }}
              >
                WITHDRAW
              </Text>
            </Pressable>
          </View>

          <View
            style={{
              backgroundColor: "#FFFFFF",
              padding: 10,
              borderRadius: 12,
              marginTop: 20,
              marginHorizontal: 10,
            }}
          >
            <View
              style={{
                backgroundColor: "#F5F5F5",
                flexDirection: "row",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontFamily: "HostGroteskBold",
                    fontSize: 23,
                  }}
                >
                  N500
                </Text>
                <Text
                  style={{
                    fontFamily: "HostGrotesk",
                    fontSize: 13,
                    color: "#8C8C8C",
                  }}
                >
                  Today Earnings
                </Text>
              </View>
              <View
                style={{
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  flex: 1,
                  borderColor: "#D3D3D3",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "HostGroteskBold",
                    fontSize: 23,
                  }}
                >
                  50
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "HostGrotesk",
                    fontSize: 13,
                    color: "#8C8C8C",
                  }}
                >
                  Trips
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 15,
                }}
              >
                <Text
                  style={{
             
                    fontFamily: "HostGroteskBold",
                    fontSize: 23,
                  }}
                >
                  4km
                </Text>
                <Text
                  style={{
                   
                    fontFamily: "HostGrotesk",
                    fontSize: 13,
                    color: "#8C8C8C",
                  }}
                >
                  Distance covered
                </Text>
              </View>
            </View>
          </View>

          {/* TRANSACTIONS */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 30,
              paddingHorizontal: 15,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "HostGroteskBold",
              }}
            >
              Transactions
            </Text>
            <Pressable
              onPress={() => router.push("/account/wallet/transactions")}
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
              paddingLeft: 15,
            }}
          >
            {[1, 2, 3, 4, 5].map((item, key) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 10,
                  paddingRight: 20,
                }}
                key={key}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 20,
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      backgroundColor: options[key % options.length].color,
                      borderRadius: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {options[key % options.length].icon}
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "HostGroteskBold",
                        marginBottom: 5,
                      }}
                    >
                      Wallet Top-Up
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "HostGroteskBold",
                        textAlign: "center",
                        color: "#9F9F9F",
                      }}
                      numberOfLines={2}
                    >
                      Via Mastercard ****1234
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "HostGroteskBold",
                      marginBottom: 3,
                    }}
                  >
                    + ₦10,000
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "HostGroteskBold",
                      color: "#9F9F9F",
                    }}
                  >
                    Today, 2:45 PM
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
