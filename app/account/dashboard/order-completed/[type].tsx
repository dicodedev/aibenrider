import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { completed } from "@/icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

const products = [
  require("@/assets/images/landing/Shoe.png"),
  require("@/assets/images/landing/Bag.png"),
  require("@/assets/images/landing/Jug.png"),
  require("@/assets/images/landing/Banana.png"),
  require("@/assets/images/landing/Orange.png"),
  require("@/assets/images/landing/Nike.png"),
];

export default function OrderCompleted() {
  const app = useSelector((state: any) => state.app);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingTop: 10,
        }}
      >
        <ScrollView
          style={{
            flex: 1,
            paddingTop: 100,
          }}
        >
          <View
            style={{
              paddingHorizontal: 30,
              alignItems: "center",
            }}
          >
            <SvgXml xml={completed()} width={124} height={124} />
            <Text
              style={{
                textAlign: "center",
                color: "#1EB723",
                fontFamily: "HostGroteskBold",
                fontSize: 24,
                marginTop: 20,
                paddingHorizontal: 40,
                lineHeight: 30,
                marginBottom: 10,
              }}
            >
              Thank you for shopping with us!
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                color: "#686868",
                paddingHorizontal: 40,
                lineHeight: 20,
              }}
            >
              Your order #FD2364065 is confirmed and in processing
            </Text>
            <View
              style={{
                backgroundColor: "#EAEAEA",
                borderRadius: 100,
                padding: 13,
                marginTop: 40,
              }}
            >
              <Text
                style={{
                  fontFamily: "HostGroteskBold",
                  fontSize: 14,
                }}
              >
                You have earned -10% discount
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          backgroundColor: "#fff",
          width: "100%",
          paddingVertical: 30,
          paddingTop: 15,
          paddingHorizontal: 15,
          zIndex: 1000,
        }}
      >
        <Pressable
          style={{
            width: "100%",
            borderWidth: 2,
            borderColor: "#DCDCDC",
            paddingVertical: 20,
            borderRadius: 12,
          }}
          onPress={() => router.push("/account/marketplace/order-details/product")}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "HostGroteskBold",
              fontSize: 16,
            }}
          >
            VIEW ORDER DETAILS
          </Text>
        </Pressable>
        <Pressable
          style={{
            width: "100%",
            backgroundColor: "#100152",
            paddingVertical: 20,
            borderRadius: 12,
            marginTop: 20,
          }}
          onPress={() => router.push("/account/marketplace")}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontFamily: "HostGroteskBold",
              fontSize: 16,
            }}
          >
            DONE
          </Text>
        </Pressable>
      </View>
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
