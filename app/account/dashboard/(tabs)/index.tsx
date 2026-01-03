import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { GlowBG } from "@/components/account/glow-bg";
import { Menu } from "@/components/account/menu";
import { ProductCard } from "@/components/account/product-card";
import { filter, location, searchIcon } from "@/icons";
import { router } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
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
                  flexDirection: "row",
                  gap: 15,
                  alignItems: "center",
                }}
              >
                <SvgXml xml={location()} width={17} height={21} />
                <View style={{ alignSelf: "flex-start" }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "HostGrotesk",
                      minWidth: 150,
                    }}
                  >
                    Ikoyi, Lagos State
                  </Text>
                </View>
              </View>
            </View>
            <Text
              style={{
                fontSize: 45,
                fontFamily: "HostGroteskBold",
                lineHeight: 55,
              }}
            >
              Get the best
            </Text>
            <Text
              style={{
                fontSize: 45,
                lineHeight: 55,
                fontFamily: "HostGroteskBold",
              }}
            >
              Deals at great
            </Text>
            <Text
              style={{
                fontSize: 45,
                lineHeight: 55,
                fontFamily: "HostGroteskBold",
              }}
            >
              Price.
            </Text>
            <View
              style={{
                marginTop: 30,
                flexDirection: "row",
                gap: 20,
                alignItems: "center",
              }}
            >
              <Pressable
                style={{
                  width: 55,
                  height: 55,
                  backgroundColor: "#FBAF41",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SvgXml xml={filter()} width={15} height={15} />
              </Pressable>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#EAEAEA",
                  flex: 1,
                  padding: 10,
                  paddingHorizontal: 20,
                  borderRadius: 10,
                  gap: 15,
                  alignItems: "center",
                }}
              >
                <SvgXml xml={searchIcon()} width={17} height={17} />
                <TextInput
                  style={{
                    fontFamily: "HostGrotesk",
                    fontSize: 16,
                    flex: 1,
                  }}
                  placeholderTextColor={"#7D7D7D"}
                  selectionColor={"#A09F9F"}
                  placeholder="Search Marketplace"
                  keyboardType="ascii-capable"
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="name"
                  value={search}
                  onChangeText={setSearch}
                />
              </View>
            </View>

            {/* CATEGORIES */}
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
                  width: 150,
                }}
              >
                Categories
              </Text>
              <Pressable
                onPress={() => router.push("/account/marketplace/categories")}
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

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: "row",
              marginTop: 15,
              paddingLeft: 15,
            }}
          >
            {[1, 2, 3, 4, 5].map((item, key) => (
              <Pressable
                onPress={() => router.push("/account/marketplace/category/1")}
                key={item}
                style={{
                  flexDirection: "row",
                  gap: 10,
                  backgroundColor: colors[key % colors.length],
                  padding: 10,
                  paddingHorizontal: 20,
                  marginRight: 20,
                  alignItems: "center",
                  borderRadius: 12,
                }}
              >
                <Image
                  source={{ uri: "https://avatar.iran.liara.run/public" }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                  }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "HostGroteskBold",
                  }}
                >
                  Shoes
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* ARRIVAL PRODUCTS */}
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
                width: 150,
              }}
            >
              New Arrivals
            </Text>
            <Pressable
              onPress={() => router.push("/account/marketplace/category/1")}
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
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: "row",
              marginTop: 15,
              paddingLeft: 15,
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

          {/* Recommended for you */}
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
                width: 200,
              }}
            >
              Recommended for you
            </Text>
            <Pressable
              onPress={() => router.push("/account/marketplace/category/1")}
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
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: "row",
              marginTop: 15,
              paddingLeft: 15,
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
