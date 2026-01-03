import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { GlowBG } from "@/components/account/glow-bg";
import { plusIcon, star } from "@/icons";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

const colors = ["#FFE4C3", "#D4E0FF", "#FFD0DA", "#E0FAD5"];
const bcolors = ["#FBAF41", "#9AB8FF", "#FF8DA6", "#AEEC96"];
const products = [
  require("@/assets/images/landing/Shoe.png"),
  require("@/assets/images/landing/Bag.png"),
  require("@/assets/images/landing/Jug.png"),
  require("@/assets/images/landing/Banana.png"),
  require("@/assets/images/landing/Orange.png"),
  require("@/assets/images/landing/Nike.png"),
];

const data = [
  {
    title: "Shoes",
    description: "Footwear for every step from casual to formal.",
  },
];

export default function Categories() {
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
      >
        <Text
          style={{
            fontSize: 45,
            fontFamily: "HostGroteskBold",
            lineHeight: 55,
          }}
        >
          All Category
        </Text>
        <View
          style={{
            marginTop: 30,
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
          }}
        >
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
            keyExtractor={(item) => item}
            numColumns={2} // 👈 number of grid columns
            renderItem={({ item }) => (
              <Pressable
                onPress={() => router.push("/account/category/" + item)}
                style={{
                  backgroundColor: colors[item % colors.length],
                  flex: 1,
                  marginBottom: 20,
                  borderRadius: 12,
                  padding: 15,
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: bcolors[item % colors.length],
                  }}
                >
                  <Image
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: 100,
                    }}
                    source={products[item % products.length]}
                  />
                </View>

                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "HostGroteskBold",
                    marginTop: 10,
                  }}
                >
                  Shoes
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "HostGrotesk",
                    marginTop: 10,
                  }}
                >
                  Footwear for every step from casual to formal.
                </Text>
              </Pressable>
            )}
            columnWrapperStyle={{
              gap: 40,
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

const Card = ({ index }: { index: number }) => {
  const image = products[index];
  return (
    <Pressable
      style={{
        backgroundColor: "#ffffff",
        width: 180,
        marginRight: 10,
        padding: 8,
        borderRadius: 15,
      }}
    >
      <View
        style={{
          width: "100%",
          height: 150,
        }}
      >
        <Image
          source={image}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 15,
          }}
        />
      </View>
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
      <View>
        <Text
          numberOfLines={1}
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
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,

          backgroundColor: "#F6F6F6",
          height: 50,
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 100,
          paddingLeft: 10,
          paddingRight: 5,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontFamily: "HostGroteskBold",
          }}
        >
          ₦400,000
        </Text>
        <Pressable
          style={{
            width: 35,
            height: 35,
            borderRadius: 100,
            backgroundColor: "#FBAF41",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SvgXml xml={plusIcon()} width={15} height={15} />
        </Pressable>
      </View>
    </Pressable>
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
