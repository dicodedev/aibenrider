import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { arrowLeft } from "@/icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Path, SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

const products = [
  require("@/assets/images/landing/Shoe.png"),
  require("@/assets/images/landing/Bag.png"),
  require("@/assets/images/landing/Jug.png"),
  require("@/assets/images/landing/Banana.png"),
  require("@/assets/images/landing/Orange.png"),
  require("@/assets/images/landing/Nike.png"),
];

export default function Checkout() {
  const app = useSelector((state: any) => state.app);
  return (
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
          Checkout
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
            marginBottom: 40,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "HostGroteskBold",
              }}
            >
              Shipping information
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "HostGroteskBold",
                color: "#A09F9F",
              }}
            >
              Edit
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1.5,
              borderColor: "#FBAF41",
              flexDirection: "row",
              padding: 15,
              borderRadius: 12,
              alignItems: "center",
              marginTop: 15,
              gap: 10,
              marginBottom: 20,
            }}
          >
            <View
              style={{
                width: 28,
              }}
            >
              <Svg width="28" height="33" viewBox="0 0 28 33" fill="none">
                <Path
                  d="M14.683 30.95C14.411 31.1453 14.0845 31.2504 13.7496 31.2504C13.4148 31.2504 13.0883 31.1453 12.8163 30.95C4.76797 25.2133 -3.7737 13.4133 4.8613 4.88667C7.23187 2.55475 10.4244 1.24854 13.7496 1.25C17.083 1.25 20.2813 2.55833 22.638 4.885C31.273 13.4117 22.7313 25.21 14.683 30.95Z"
                  stroke="#FBAF41"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  d="M13.7493 16.25C14.6334 16.25 15.4812 15.8988 16.1064 15.2737C16.7315 14.6485 17.0827 13.8007 17.0827 12.9166C17.0827 12.0326 16.7315 11.1847 16.1064 10.5596C15.4812 9.9345 14.6334 9.58331 13.7493 9.58331C12.8653 9.58331 12.0174 9.9345 11.3923 10.5596C10.7672 11.1847 10.416 12.0326 10.416 12.9166C10.416 13.8007 10.7672 14.6485 11.3923 15.2737C12.0174 15.8988 12.8653 16.25 13.7493 16.25Z"
                  stroke="#FBAF41"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </Svg>
            </View>
            <View
              style={{
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "HostGroteskBold",
                  marginBottom: 3,
                }}
              >
                Work
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "HostGroteskBold",
                  color: "#686868",
                  lineHeight: 20,
                }}
              >
                126 Joel Ogunnaike St, Ikeja GRA, Lagos 101233, Lagos
              </Text>
            </View>
            <View
              style={{
                width: 13,
              }}
            >
              <Svg width="13" height="8" viewBox="0 0 13 8" fill="none">
                <Path
                  d="M11.91 2.24551e-05L12.97 1.06102L7.193 6.84002C7.10043 6.93318 6.99036 7.00711 6.86911 7.05755C6.74786 7.108 6.61783 7.13397 6.4865 7.13397C6.35517 7.13397 6.22514 7.108 6.10389 7.05755C5.98264 7.00711 5.87257 6.93318 5.78 6.84002L2.65457e-07 1.06102L1.06 0.00102191L6.485 5.42502L11.91 2.24551e-05Z"
                  fill="black"
                />
              </Svg>
            </View>
          </View>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "HostGroteskBold",
            }}
          >
            Standard delivery takes 30-60 minutes depending on vendor location
            and order preparation time. Track your order in real-time once
            confirmed.
          </Text>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "HostGroteskBold",
              }}
            >
              Payment method
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "HostGroteskBold",
                color: "#A09F9F",
              }}
            >
              Add a card
            </Text>
          </View>
          <View
            style={{
              gap: 25,
              marginTop: 20,
            }}
          >
            <Card
              text="Pay from wallet"
              icon={
                <Svg width="24" height="22" viewBox="0 0 24 22" fill="none">
                  <Path
                    d="M20.1004 20.5757H3.30039C2.66387 20.5757 2.05342 20.3229 1.60333 19.8728C1.15325 19.4227 0.900391 18.8122 0.900391 18.1757V7.37571C0.900391 6.73919 1.15325 6.12874 1.60333 5.67865C2.05342 5.22856 2.66387 4.97571 3.30039 4.97571H20.1004C20.7369 4.97571 21.3474 5.22856 21.7974 5.67865C22.2475 6.12874 22.5004 6.73919 22.5004 7.37571V18.1757C22.5004 18.8122 22.2475 19.4227 21.7974 19.8728C21.3474 20.3229 20.7369 20.5757 20.1004 20.5757Z"
                    stroke="#100152"
                    stroke-width="1.8"
                  />
                  <Path
                    d="M17.1 13.3757C16.9409 13.3757 16.7883 13.3124 16.6757 13.1999C16.5632 13.0874 16.5 12.9348 16.5 12.7757C16.5 12.6165 16.5632 12.4639 16.6757 12.3514C16.7883 12.2389 16.9409 12.1757 17.1 12.1757C17.2591 12.1757 17.4117 12.2389 17.5243 12.3514C17.6368 12.4639 17.7 12.6165 17.7 12.7757C17.7 12.9348 17.6368 13.0874 17.5243 13.1999C17.4117 13.3124 17.2591 13.3757 17.1 13.3757Z"
                    fill="#100152"
                    stroke="#100152"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <Path
                    d="M18.9004 4.97576V3.29936C18.9003 2.93156 18.8157 2.56871 18.653 2.23882C18.4904 1.90893 18.2541 1.62083 17.9625 1.39677C17.6708 1.17271 17.3315 1.01869 16.9709 0.946588C16.6102 0.87449 16.2378 0.886249 15.8824 0.980957L2.68239 4.50056C2.17125 4.63677 1.71944 4.93803 1.39718 5.35751C1.07492 5.77699 0.900273 6.29118 0.900391 6.82016V7.37576"
                    stroke="#100152"
                    stroke-width="1.8"
                  />
                </Svg>
              }
              color="#D7E1F8"
            />
            <Card
              text="Pay on delivery"
              icon={
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
                    d="M0.875 5.54171C3.15117 5.54171 5.1975 3.68087 5.45883 1.75471M20.125 1.45837C20.125 3.83837 22.1842 6.08887 24.2083 6.08887M24.2083 12.5417C21.9917 12.5417 19.845 14.07 19.6607 16.156M5.54167 16.6204C5.54167 15.3827 5.05 14.1957 4.17483 13.3205C3.29966 12.4454 2.11268 11.9537 0.875 11.9537M20.7083 19.8135C19.551 19.628 18.3804 19.5371 17.2083 19.5417C12.1987 19.5417 10.6307 21.4784 4.375 20.3619"
                    stroke="#49932C"
                    stroke-width="1.75"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              }
              color="#E0FAD5"
            />
          </View>
        </View>
        <Pressable
          style={{
            width: "100%",
            backgroundColor: "#100152",
            paddingVertical: 20,
            borderRadius: 12,
            marginTop: 100,
          }}
          onPress={() => router.push("/account/marketplace/order-completed/i")}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontFamily: "HostGroteskBold",
              fontSize: 16,
            }}
          >
            PLACE ORDER
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const Card = ({ color, icon, text }) => {
  return (
    <Pressable
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 1.5,
        borderColor: "#DCDCDC",
        borderRadius: 15,
        alignItems: "center",
        padding: 10,
      }}
      onPress={() => router.push("/account/marketplace/order-completed/product")}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}
      >
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: "100%",
            backgroundColor: color,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon}
        </View>
        <Text
          style={{
            fontSize: 14,
            fontFamily: "HostGroteskBold",
          }}
        >
          {text}
        </Text>
      </View>
      <View>
        <Svg width="17" height="17" viewBox="0 0 17 17" fill="none">
          <Circle cx="8.5" cy="8.5" r="8.5" fill="#DCDCDC" />
          <Circle cx="8.5" cy="8.5" r="4.5" fill="white" />
        </Svg>
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
