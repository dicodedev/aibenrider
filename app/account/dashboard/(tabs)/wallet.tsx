import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { GlowBG } from "@/components/account/glow-bg";
import { ProductCard } from "@/components/account/product-card";
import { arrowLeft, filter, searchIcon } from "@/icons";
import { router } from "expo-router";
import { useState } from "react";
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

export default function Wallet() {
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
        <View
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
                Liked
              </Text>
              <Text
                style={{
                  fontSize: 45,
                  lineHeight: 55,
                  fontFamily: "HostGroteskBold",
                }}
              >
                Products
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
              <SvgXml xml={arrowLeft("#000000")} width={21} height={16} />
            </Pressable>
          </View>

          <View
            style={{
              marginTop: 30,
              flexDirection: "row",
              gap: 20,
              alignItems: "center",
              marginBottom: 30,
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
                backgroundColor: "#FFFFFF",
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
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
            keyExtractor={(item) => item}
            numColumns={2} // 👈 number of grid columns
            renderItem={({ item }) => (
              <View
                style={{
                  marginBottom: 20,
                  flex: 1,
                }}
              >
                <ProductCard index={item} />
              </View>
            )}
            columnWrapperStyle={{
              gap: 20,
            }}
            contentContainerStyle={{
              padding: 0,
            }}
          />
        </View>
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
