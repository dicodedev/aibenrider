import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { GlowBG } from "@/components/account/glow-bg";
import { arrowLeft } from "@/icons";
import { router } from "expo-router";
import { useState } from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

const colors = ["#FFE4C3", "#E0FAD5", "#FFD0DA", "#D4E0FF"];
const products = [
  require("@/assets/images/landing/Shoe.png"),
  require("@/assets/images/landing/Bag.png"),
  require("@/assets/images/landing/Jug.png"),
  require("@/assets/images/landing/Banana.png"),
  require("@/assets/images/landing/Orange.png"),
  require("@/assets/images/landing/Nike.png"),
];

const options = ["Ongoing", "Completed"];

export default function Trips() {
  const app = useSelector((state: any) => state.app);
  const [search, setSearch] = useState("");

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
                My Products
              </Text>
            </View>
            <Pressable
              onPress={() => router.back()}
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
              marginTop: 30,
              flexDirection: "row",
              gap: 30,
              alignItems: "center",
              marginBottom: 30,
            }}
          >
            {options.map((item, key) => (
              <View
                key={key}
                style={{
                  flexDirection: "row",
                  backgroundColor: key ? "#EAEAEA" : "#FFFFFF",
                  padding: 12,
                  paddingHorizontal: 20,
                  borderRadius: 12,
                  gap: 15,
                  alignItems: "center",
                  alignSelf: "flex-start",
                }}
              >
                <Text
                  style={{
                    fontFamily: "HostGroteskBold",
                    fontSize: 14,
                  }}
                >
                  {item}
                </Text>
              </View>
            ))}
          </View>
          <View style={{}}>
            {products.map((item, key) => (
              <View
                key={key}
                style={{
                  marginBottom: 15,
                  flex: 1,
                }}
              >
                <Pressable
                  style={{
                    backgroundColor: "#ffffff",
                    flex: 1,
                    padding: 4,
                    borderRadius: 15,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 20,
                  }}
                  onPress={() =>
                    router.push("/account/marketplace/order-details/1")
                  }
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 20,
                      flex: 1,
                    }}
                  >
                    <View
                      style={{
                        width: 90,
                        height: 90,
                      }}
                    >
                      <Image
                        source={item}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 15,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        justifyContent: "space-around",
                        flex: 1,
                      }}
                    >
                      <View>
                        <Text
                          numberOfLines={2}
                          ellipsizeMode="tail"
                          style={{
                            fontFamily: "HostGroteskBold",
                            fontSize: 14,
                            marginTop: 4,
                          }}
                        >
                          Washing Machine Made out of Gold
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "HostGroteskBold",
                        }}
                      >
                        ₦400,000
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      justifyContent: "space-around",
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "HostGroteskBold",
                        fontSize: 12,
                        color: "#A09F9F",
                      }}
                    >
                      Qty: 1 Item
                    </Text>
                    <View
                      style={{
                        backgroundColor: "#CCD9F8",
                        alignItems: "center",
                        padding: 4,
                        borderRadius: 100,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "HostGroteskBold",
                          fontSize: 10,
                        }}
                      >
                        Ongoing
                      </Text>
                    </View>
                  </View>
                </Pressable>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

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
