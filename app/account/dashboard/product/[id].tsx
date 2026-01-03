import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { GlowBG } from "@/components/account/glow-bg";
import { ProductCard } from "@/components/account/product-card";
import {
  arrowLeft,
  cart,
  delivery,
  minusIcon,
  plusIcon,
  shop,
  star,
  stock,
} from "@/icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import Swiper from "react-native-swiper";
import { useSelector } from "react-redux";

const products = [
  require("@/assets/images/landing/Shoe.png"),
  require("@/assets/images/landing/Bag.png"),
  require("@/assets/images/landing/Jug.png"),
  require("@/assets/images/landing/Banana.png"),
  require("@/assets/images/landing/Orange.png"),
  require("@/assets/images/landing/Nike.png"),
];

export default function Product() {
  const app = useSelector((state: any) => state.app);
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
            ADD TO CART
          </Text>
        </Pressable>
      </View>
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 15,
        }}
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
              Details
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
              onPress={() => router.push("/account/marketplace/cart")}
            >
              <SvgXml xml={cart()} width={21} height={18} />
            </Pressable>
          </View>
          <View
            style={{
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <View
              style={{
                flex: 1,
                marginBottom: 40,
              }}
            >
              <Swiper
                style={{
                  height: 320,
                }}
                showsPagination={true}
                paginationStyle={{
                  bottom: -25,
                  gap: 8,
                }}
                dot={
                  <View
                    style={{
                      height: 8,
                      width: 8,
                      backgroundColor: "#A09F9F",
                      borderRadius: 100,
                    }}
                  />
                }
                activeDot={
                  <View
                    style={{
                      height: 8,
                      width: 30,
                      backgroundColor: "#000000",
                      borderRadius: 100,
                    }}
                  />
                }
              >
                {[1, 2, 3, 4, 5].map((item, key) => (
                  <View
                    style={{
                      flex: 1,
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <View
                      key={key}
                      style={{
                        width: 320,
                        height: 320,
                        borderRadius: "100%",
                        borderWidth: 3,
                        borderColor: "#F4B400",
                        padding: 5,
                      }}
                    >
                      <Image
                        source={products[0]}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 1000,
                        }}
                      />
                    </View>
                  </View>
                ))}
              </Swiper>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
                marginTop: 10,
              }}
            >
              <Pressable
                style={{
                  backgroundColor: "#FBAF41",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 40,
                  height: 40,
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
                }}
              >
                <SvgXml xml={minusIcon()} width={10} height={10} />
              </Pressable>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "HostGrotesk",
                  fontSize: 18,
                }}
              >
                3
              </Text>
              <Pressable
                style={{
                  backgroundColor: "#FBAF41",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 40,
                  height: 40,
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20,
                }}
              >
                <SvgXml xml={plusIcon()} width={10} height={10} />
              </Pressable>
            </View>
          </View>
          <View>
            <View>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  gap: 6,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "HostGrotesk",
                    fontSize: 12,
                  }}
                >
                  3.6 Rating
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 3,
                  }}
                >
                  <SvgXml xml={star()} width={12} height={12} />
                  <SvgXml xml={star()} width={12} height={12} />
                </View>
              </View>
              <Text
                style={{
                  fontFamily: "HostGroteskBold",
                  fontSize: 24,
                  marginTop: 6,
                }}
              >
                Adidas Sneakers
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 15,
                  marginTop: 6,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "HostGroteskBold",
                    fontSize: 18,
                  }}
                >
                  ₦3,500.00
                </Text>
                <Text
                  style={{
                    textDecorationLine: "line-through",
                    color: "#A09F9F",
                    fontFamily: "HostGrotesk",
                    fontSize: 18,
                  }}
                >
                  ₦3,500.00
                </Text>
                <View
                  style={{
                    backgroundColor: "#AEEC96",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      color: "#1D5D04",
                      fontFamily: "HostGroteskBold",
                      fontSize: 14,
                    }}
                  >
                    20%
                  </Text>
                </View>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  flexDirection: "row",
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                {[1, 2, 3, 4, 5].map((item, key) => (
                  <View
                    style={{
                      marginRight: 10,
                      flexDirection: "row",
                      gap: 5,
                      borderWidth: 1.5,
                      padding: 10,
                      borderRadius: 10,
                      borderColor: item == 1 ? "#000" : "#DCDCDC",
                    }}
                    key={key}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "HostGrotesk",
                      }}
                    >
                      Size
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "HostGroteskBold",
                      }}
                    >
                      {item}
                    </Text>
                  </View>
                ))}
              </ScrollView>
              <View
                style={{
                  gap: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <SvgXml xml={stock()} width={24} height={24} />
                  <Text
                    style={{
                      fontFamily: "HostGroteskBold",
                      color: "#FFAE5D",
                      fontSize: 14,
                    }}
                  >
                    In stock
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <SvgXml xml={delivery("#A09F9F")} width={26} height={26} />
                  <Text
                    style={{
                      fontFamily: "HostGroteskBold",
                      color: "#A09F9F",
                      fontSize: 14,
                    }}
                  >
                    Free Delivery
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <SvgXml xml={shop()} width={24} height={24} />
                  <Text
                    style={{
                      fontFamily: "HostGroteskBold",
                      color: "#A09F9F",
                      fontSize: 14,
                    }}
                  >
                    Available in the nearest store
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "HostGrotesk",
                  marginTop: 15,
                }}
              >
                Adidas creates sports-specific footwear designed for various
                activities, including running, basketball, and soccer cleats.
              </Text>
            </View>
          </View>
          {/* Recommended for you */}
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
                fontSize: 18,
                fontFamily: "HostGroteskBold",
              }}
            >
              Products you may also like
            </Text>
            {/* <Pressable onPress={() => router.push("/account/categories")}>
              <Text
                style={{
                  color: "#A09F9F",
                  fontSize: 16,
                  fontFamily: "HostGroteskBold",
                }}
              >
                See All
              </Text>
            </Pressable> */}
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: "row",
              marginTop: 15,
              marginBottom: 120,
            }}
          >
            {[1, 2, 3, 4, 5].map((item, key) => (
              <View
                style={{
                  width: 180,
                  marginRight: 10,
                }}
                key={key}
              >
                <ProductCard index={key} />
              </View>
            ))}
          </ScrollView>
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
