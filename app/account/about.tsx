import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { GlowBG } from "@/components/account/glow-bg";
import { arrowLeft, IG } from "@/icons";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

const offers = [
  {
    heading: "Marketplace",
    text: "Shop from local vendors",
    icon: (
      <Svg width="21" height="23" viewBox="0 0 21 23" fill="none">
        <Path
          d="M7.18197 5.02738C7.18197 3.44286 8.47024 2.15459 10.0548 2.15459C11.6393 2.15459 12.9275 3.44286 12.9275 5.02738V7.18197H7.18197V5.02738ZM5.02738 7.18197H2.15459C0.965077 7.18197 0 8.14705 0 9.33656V18.6731C0 21.0522 1.93015 22.9823 4.30918 22.9823H15.8003C18.1794 22.9823 20.1095 21.0522 20.1095 18.6731V9.33656C20.1095 8.14705 19.1444 7.18197 17.9549 7.18197H15.0821V5.02738C15.0821 2.24885 12.8333 0 10.0548 0C7.27623 0 5.02738 2.24885 5.02738 5.02738V7.18197ZM6.10467 9.33656C6.39039 9.33656 6.66441 9.45006 6.86644 9.65209C7.06847 9.85413 7.18197 10.1281 7.18197 10.4139C7.18197 10.6996 7.06847 10.9736 6.86644 11.1756C6.66441 11.3777 6.39039 11.4912 6.10467 11.4912C5.81896 11.4912 5.54494 11.3777 5.34291 11.1756C5.14088 10.9736 5.02738 10.6996 5.02738 10.4139C5.02738 10.1281 5.14088 9.85413 5.34291 9.65209C5.54494 9.45006 5.81896 9.33656 6.10467 9.33656ZM12.9275 10.4139C12.9275 10.1281 13.041 9.85413 13.2431 9.65209C13.4451 9.45006 13.7191 9.33656 14.0048 9.33656C14.2906 9.33656 14.5646 9.45006 14.7666 9.65209C14.9686 9.85413 15.0821 10.1281 15.0821 10.4139C15.0821 10.6996 14.9686 10.9736 14.7666 11.1756C14.5646 11.3777 14.2906 11.4912 14.0048 11.4912C13.7191 11.4912 13.4451 11.3777 13.2431 11.1756C13.041 10.9736 12.9275 10.6996 12.9275 10.4139Z"
          fill="white"
        />
      </Svg>
    ),
  },
  {
    heading: "Ride Hailing",
    text: "Book rides instantly",
    icon: (
      <Svg width="21" height="18" viewBox="0 0 21 18" fill="none">
        <Path
          d="M5.31017 3.3542L4.28506 6.28422H15.8245L14.7993 3.3542C14.6226 2.85147 14.1474 2.51369 13.6132 2.51369H6.49632C5.96216 2.51369 5.48691 2.85147 5.31017 3.3542ZM1.55535 6.47275L2.93788 2.52547C3.46811 1.01333 4.89384 0 6.49632 0H13.6132C15.2157 0 16.6414 1.01333 17.1716 2.52547L18.5542 6.47275C19.4654 6.8498 20.1095 7.74923 20.1095 8.79791V14.4537V16.339C20.1095 17.0342 19.5479 17.5958 18.8527 17.5958H17.5958C16.9006 17.5958 16.339 17.0342 16.339 16.339V14.4537H3.77053V16.339C3.77053 17.0342 3.20888 17.5958 2.51369 17.5958H1.25684C0.561653 17.5958 0 17.0342 0 16.339V14.4537V8.79791C0 7.74923 0.644133 6.8498 1.55535 6.47275ZM5.02738 10.0548C5.02738 9.72142 4.89496 9.40174 4.65926 9.16603C4.42355 8.93033 4.10387 8.79791 3.77053 8.79791C3.4372 8.79791 3.11752 8.93033 2.88181 9.16603C2.64611 9.40174 2.51369 9.72142 2.51369 10.0548C2.51369 10.3881 2.64611 10.7078 2.88181 10.9435C3.11752 11.1792 3.4372 11.3116 3.77053 11.3116C4.10387 11.3116 4.42355 11.1792 4.65926 10.9435C4.89496 10.7078 5.02738 10.3881 5.02738 10.0548ZM16.339 11.3116C16.6723 11.3116 16.992 11.1792 17.2277 10.9435C17.4634 10.7078 17.5958 10.3881 17.5958 10.0548C17.5958 9.72142 17.4634 9.40174 17.2277 9.16603C16.992 8.93033 16.6723 8.79791 16.339 8.79791C16.0056 8.79791 15.686 8.93033 15.4503 9.16603C15.2146 9.40174 15.0821 9.72142 15.0821 10.0548C15.0821 10.3881 15.2146 10.7078 15.4503 10.9435C15.686 11.1792 16.0056 11.3116 16.339 11.3116Z"
          fill="white"
        />
      </Svg>
    ),
  },
  {
    heading: "Delivery Services",
    text: "Get items delivered",
    icon: (
      <Svg width="21" height="17" viewBox="0 0 21 17" fill="none">
        <Path
          d="M1.50821 0.000244141C0.675554 0.000244141 0 0.675798 0 1.50846V11.5632C0 12.3959 0.675554 13.0714 1.50821 13.0714H2.01095C2.01095 14.7367 3.36206 16.0879 5.02738 16.0879C6.6927 16.0879 8.04381 14.7367 8.04381 13.0714H12.0657C12.0657 14.7367 13.4168 16.0879 15.0821 16.0879C16.7475 16.0879 18.0986 14.7367 18.0986 13.0714H19.104C19.6602 13.0714 20.1095 12.6221 20.1095 12.066C20.1095 11.5098 19.6602 11.0605 19.104 11.0605V9.04953V8.04405V7.45648C19.104 6.92232 18.8935 6.41015 18.5165 6.0331L16.0876 3.60425C15.7106 3.22719 15.1984 3.01667 14.6642 3.01667H13.0712V1.50846C13.0712 0.675798 12.3956 0.000244141 11.563 0.000244141H1.50821ZM13.0712 5.02762H14.6642L17.0931 7.45648V8.04405H13.0712V5.02762ZM3.51917 13.0714C3.51917 12.6714 3.67807 12.2878 3.96091 12.005C4.24376 11.7221 4.62738 11.5632 5.02738 11.5632C5.42738 11.5632 5.811 11.7221 6.09385 12.005C6.37669 12.2878 6.53559 12.6714 6.53559 13.0714C6.53559 13.4714 6.37669 13.8551 6.09385 14.1379C5.811 14.4207 5.42738 14.5796 5.02738 14.5796C4.62738 14.5796 4.24376 14.4207 3.96091 14.1379C3.67807 13.8551 3.51917 13.4714 3.51917 13.0714ZM15.0821 11.5632C15.4821 11.5632 15.8658 11.7221 16.1486 12.005C16.4314 12.2878 16.5904 12.6714 16.5904 13.0714C16.5904 13.4714 16.4314 13.8551 16.1486 14.1379C15.8658 14.4207 15.4821 14.5796 15.0821 14.5796C14.6821 14.5796 14.2985 14.4207 14.0157 14.1379C13.7328 13.8551 13.5739 13.4714 13.5739 13.0714C13.5739 12.6714 13.7328 12.2878 14.0157 12.005C14.2985 11.7221 14.6821 11.5632 15.0821 11.5632Z"
          fill="white"
        />
      </Svg>
    ),
  },
  {
    heading: "Secure Payments",
    text: "Safe transactions",
    icon: (
      <Svg width="19" height="20" viewBox="0 0 19 20" fill="none">
        <Path
          d="M9.42636 0C9.60703 0 9.7877 0.0392764 9.95266 0.113902L17.3484 3.25209C18.2125 3.61736 18.8566 4.46965 18.8527 5.4987C18.8331 9.39492 17.2306 16.5236 10.4633 19.7639C9.80734 20.0781 9.04537 20.0781 8.38946 19.7639C1.62213 16.5236 0.0196561 9.39492 1.78648e-05 5.4987C-0.00390978 4.46965 0.640223 3.61736 1.5043 3.25209L8.90398 0.113902C9.06501 0.0392764 9.24568 0 9.42636 0ZM9.42636 2.62366V17.4741C14.8465 14.8465 16.3037 9.0375 16.339 5.55368L9.42636 2.62366Z"
          fill="white"
        />
      </Svg>
    ),
  },
];

const touch = [
  {
    text: "123 Market Street, Lagos, Nigeria",
    icon: (
      <Svg width="17" height="22" viewBox="0 0 17 22" fill="none">
        <Path
          d="M9.24209 21.3892C11.4401 18.6384 16.4532 11.9714 16.4532 8.22662C16.4532 3.68484 12.7684 0 8.22662 0C3.68484 0 0 3.68484 0 8.22662C0 11.9714 5.0131 18.6384 7.21115 21.3892C7.73816 22.0448 8.71508 22.0448 9.24209 21.3892ZM8.22662 5.48441C8.9539 5.48441 9.65139 5.77332 10.1657 6.28759C10.6799 6.80185 10.9688 7.49934 10.9688 8.22662C10.9688 8.9539 10.6799 9.65139 10.1657 10.1657C9.65139 10.6799 8.9539 10.9688 8.22662 10.9688C7.49934 10.9688 6.80185 10.6799 6.28759 10.1657C5.77332 9.65139 5.48441 8.9539 5.48441 8.22662C5.48441 7.49934 5.77332 6.80185 6.28759 6.28759C6.80185 5.77332 7.49934 5.48441 8.22662 5.48441Z"
          fill="#100152"
        />
      </Svg>
    ),
  },
  {
    text: "+234 800 123 4567",
    icon: (
      <Svg width="17" height="17" viewBox="0 0 17 17" fill="none">
        <Path
          d="M5.2991 0.791252C5.05166 0.193536 4.39931 -0.124603 3.77589 0.0457139L0.94799 0.81696C0.388836 0.971209 0 1.47895 0 2.05738C0 10.0076 6.44633 16.454 14.3966 16.454C14.975 16.454 15.4828 16.0651 15.637 15.506L16.4083 12.6781C16.5786 12.0547 16.2604 11.4023 15.6627 11.1549L12.5777 9.86946C12.0539 9.65094 11.4466 9.80197 11.0899 10.2422L9.79161 11.8265C7.52929 10.7564 5.69758 8.92468 4.62747 6.66236L6.21174 5.36731C6.65199 5.0074 6.80303 4.40325 6.58451 3.87945L5.2991 0.794465V0.791252Z"
          fill="#100152"
        />
      </Svg>
    ),
  },
  {
    text: "support@aibenmart.com",
    icon: (
      <Svg width="17" height="13" viewBox="0 0 17 13" fill="none">
        <Path
          d="M1.54249 0C0.690908 0 0 0.690908 0 1.54249C0 2.02773 0.22816 2.48405 0.616997 2.77648L7.60962 8.02096C7.97597 8.2941 8.47728 8.2941 8.84362 8.02096L15.8362 2.77648C16.2251 2.48405 16.4532 2.02773 16.4532 1.54249C16.4532 0.690908 15.7623 0 14.9108 0H1.54249ZM0 3.59915V10.2833C0 11.4176 0.922281 12.3399 2.05666 12.3399H14.3966C15.531 12.3399 16.4532 11.4176 16.4532 10.2833V3.59915L9.46061 8.84362C8.72793 9.39313 7.72531 9.39313 6.99263 8.84362L0 3.59915Z"
          fill="#100152"
        />
      </Svg>
    ),
  },
  {
    text: "www.aibenmart.com",
    icon: (
      <Svg width="17" height="17" viewBox="0 0 17 17" fill="none">
        <Path
          d="M11.3116 8.22662C11.3116 8.94002 11.273 9.62772 11.2056 10.2833H5.2509C5.1802 9.62772 5.14485 8.94002 5.14485 8.22662C5.14485 7.51322 5.18341 6.82552 5.2509 6.16997H11.2056C11.2763 6.82552 11.3116 7.51322 11.3116 8.22662ZM12.2371 6.16997H16.1929C16.3633 6.82874 16.4532 7.51643 16.4532 8.22662C16.4532 8.93681 16.3633 9.6245 16.1929 10.2833H12.2371C12.3046 9.62129 12.3399 8.9336 12.3399 8.22662C12.3399 7.51965 12.3046 6.83195 12.2371 6.16997ZM15.8555 5.14164H12.1053C11.784 3.0882 11.1477 1.36896 10.3283 0.269936C12.8445 0.935135 14.8915 2.76042 15.8523 5.14164H15.8555ZM11.0642 5.14164H5.38908C5.5851 3.97192 5.88718 2.93716 6.25673 2.09843C6.59415 1.34004 6.97013 0.790527 7.33326 0.443466C7.69318 0.102833 7.99203 0 8.22662 0C8.46121 0 8.76007 0.102833 9.11998 0.443466C9.48311 0.790527 9.85909 1.34004 10.1965 2.09843C10.5693 2.93395 10.8681 3.9687 11.0642 5.14164ZM4.3479 5.14164H0.597715C1.56177 2.76042 3.60557 0.935135 6.12498 0.269936C5.30553 1.36896 4.66925 3.0882 4.3479 5.14164ZM0.260295 6.16997H4.21614C4.14866 6.83195 4.11331 7.51965 4.11331 8.22662C4.11331 8.9336 4.14866 9.62129 4.21614 10.2833H0.260295C0.0899787 9.6245 0 8.93681 0 8.22662C0 7.51643 0.0899787 6.82874 0.260295 6.16997ZM6.25673 14.3516C5.88396 13.5161 5.5851 12.4813 5.38908 11.3116H11.0642C10.8681 12.4813 10.5661 13.5161 10.1965 14.3516C9.85909 15.11 9.48311 15.6595 9.11998 16.0066C8.76007 16.3504 8.46121 16.4532 8.22662 16.4532C7.99203 16.4532 7.69318 16.3504 7.33326 16.0098C6.97013 15.6627 6.59415 15.1132 6.25673 14.3548V14.3516ZM4.3479 11.3116C4.66925 13.365 5.30553 15.0843 6.12498 16.1833C3.60557 15.5181 1.56177 13.6928 0.597715 11.3116H4.3479ZM15.8555 11.3116C14.8915 13.6928 12.8477 15.5181 10.3315 16.1833C11.1509 15.0843 11.784 13.365 12.1086 11.3116H15.8587H15.8555Z"
          fill="#100152"
        />
      </Svg>
    ),
  },
];

const company = [
  {
    text: "Our Story",
    link: "",
  },
  {
    text: "Careers",
    link: "",
    tag: "We're hiring!",
  },
  {
    text: "Press & Media",
    link: "",
  },
  {
    text: "Partner with Us",
    link: "",
  },
];

const legal = [
  {
    text: "Terms of Service",
    link: "",
  },
  {
    text: "Privacy Policy",
    link: "",
  },
  {
    text: "Cookie Policy",
    link: "",
  },
  {
    text: "Licenses",
    link: "",
  },
  {
    text: "Open Source Libraries",
    link: "",
  },
];

export default function About() {
  const app = useSelector((state: any) => state.app);
  const [search, setSearch] = useState("");

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <GlowBG />
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 10,
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
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
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
                About
              </Text>
            </View>
            <Pressable
              onPress={() => navigation.openDrawer()}
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
              marginTop: 20,
              alignItems: "center",
            }}
          >
            <Image
              source={require("@/assets/images/logo/white-icon.png")}
              style={{
                width: 70,
                height: 100,
              }}
            />
            <Text
              style={{
                fontSize: 28,
                fontFamily: "HostGroteskBold",
                color: "#1A1A1A",
                marginTop: 10,
              }}
            >
              Aibenmart
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "HostGrotesk",
                color: "#7E7E7E",
                marginTop: 20,
              }}
            >
              Shop & Ride with ease
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontFamily: "HostGrotesk",
                color: "#A0A0A0",
                marginTop: 20,
              }}
            >
              v2.4.1
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#fff",
              padding: 15,
              marginTop: 20,
              marginHorizontal: 0,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontFamily: "HostGroteskBold",
                marginTop: 10,
              }}
            >
              About Aibenmart
            </Text>

            <Text
              style={{
                fontSize: 14,
                fontFamily: "HostGrotesk",
                marginTop: 10,
                lineHeight: 30,
              }}
            >
              Aibemart is your all-in-one platform for online shopping and
              ride-hailing services. We connect customers with local vendors and
              reliable drivers to make your daily life easier. Shop from
              thousands of products and get them delivered to your doorstep, or
              book a ride whenever you need one.
            </Text>
          </View>

          <View
            style={{
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontFamily: "HostGroteskBold",
                marginTop: 20,
                marginBottom: 15,
              }}
            >
              What We Offer
            </Text>
            <View
              style={{
                gap: 10,
              }}
            >
              {offers.map((item, key) => (
                <View
                  key={key}
                  style={{
                    backgroundColor: "#fff",
                    padding: 15,
                    borderRadius: 10,
                    flexDirection: "row",
                    gap: 15,
                  }}
                >
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      backgroundColor: "#100152",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                    }}
                  >
                    {item.icon}
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: "HostGroteskBold",
                        marginBottom: 5,
                        color: "#1A1A1A",
                      }}
                    >
                      {item.heading}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: "HostGrotesk",
                        color: "#7E7E7E",
                      }}
                    >
                      {item.text}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View
            style={{
              backgroundColor: "#100152",
              borderRadius: 15,
              paddingVertical: 25,
              paddingHorizontal: 0,
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 26,
                    fontFamily: "HostGroteskBold",
                    color: "#FFFFFF",
                  }}
                >
                  50,000+
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "HostGrotesk",
                    color: "#FFFFFFE5",
                  }}
                >
                  Active Users
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 26,
                    fontFamily: "HostGroteskBold",
                    color: "#FFFFFF",
                  }}
                >
                  10,000+
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "HostGrotesk",
                    color: "#FFFFFFE5",
                  }}
                >
                  Products
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 26,
                    fontFamily: "HostGroteskBold",
                    color: "#FFFFFF",
                  }}
                >
                  5,000+
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "HostGrotesk",
                    color: "#FFFFFFE5",
                  }}
                >
                  Drivers
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 26,
                    fontFamily: "HostGroteskBold",
                    color: "#FFFFFF",
                  }}
                >
                  100+
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "HostGrotesk",
                    color: "#FFFFFFE5",
                  }}
                >
                  Cities
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontFamily: "HostGroteskBold",
                marginTop: 20,
                marginBottom: 15,
              }}
            >
              Company
            </Text>
            <View
              style={{
                borderRadius: 10,
                backgroundColor: "#fff",
                overflow: "hidden",
              }}
            >
              {company.map((item, key) => (
                <Pressable
                  onPress={() => {}}
                  key={key}
                  style={[
                    {
                      backgroundColor: "#fff",
                      padding: 15,
                      paddingVertical: 16,
                      flexDirection: "row",
                      gap: 15,
                      justifyContent: "space-between",
                    },
                    key + 1 != company.length && {
                      borderBottomColor: "#F0F0F0",
                      borderBottomWidth: 1,
                    },
                  ]}
                >
                  <View
                    style={{
                      gap: 10,
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "HostGrotesk",
                        marginBottom: 5,
                        color: "#1A1A1A",
                      }}
                    >
                      {item.text}
                    </Text>
                    {item.tag && (
                      <View
                        style={{
                          backgroundColor: "#34C759",
                          borderRadius: 20,
                          paddingTop: 4,
                          paddingHorizontal: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 11,
                            fontFamily: "HostGroteskBold",
                            marginBottom: 5,
                            color: "#FFF",
                          }}
                        >
                          {item.tag}
                        </Text>
                      </View>
                    )}
                  </View>

                  <Svg width="12" height="21" viewBox="0 0 12 21" fill="none">
                    <Path
                      d="M11.2739 9.2081C11.8452 9.7794 11.8452 10.7072 11.2739 11.2785L2.49884 20.0535C1.92754 20.6248 0.999763 20.6248 0.42847 20.0535C-0.142823 19.4822 -0.142823 18.5545 0.42847 17.9832L8.17063 10.241L0.43304 2.49884C-0.138253 1.92754 -0.138253 0.999763 0.43304 0.42847C1.00433 -0.142823 1.93211 -0.142823 2.50341 0.42847L11.2785 9.20353L11.2739 9.2081Z"
                      fill="#A0A0A0"
                    />
                  </Svg>
                </Pressable>
              ))}
            </View>
          </View>

          <View
            style={{
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontFamily: "HostGroteskBold",
                marginTop: 20,
                marginBottom: 15,
              }}
            >
              Legal
            </Text>
            <View
              style={{
                borderRadius: 10,
                backgroundColor: "#fff",
                overflow: "hidden",
              }}
            >
              {legal.map((item, key) => (
                <Pressable
                  onPress={() => {}}
                  key={key}
                  style={[
                    {
                      backgroundColor: "#fff",
                      padding: 15,
                      paddingVertical: 16,
                      flexDirection: "row",
                      gap: 15,
                      justifyContent: "space-between",
                    },
                    key + 1 != company.length && {
                      borderBottomColor: "#F0F0F0",
                      borderBottomWidth: 1,
                    },
                  ]}
                >
                  <View
                    style={{
                      gap: 10,
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "HostGrotesk",
                        marginBottom: 5,
                        color: "#1A1A1A",
                      }}
                    >
                      {item.text}
                    </Text>
                    {item.tag && (
                      <View
                        style={{
                          backgroundColor: "#34C759",
                          borderRadius: 20,
                          paddingTop: 4,
                          paddingHorizontal: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 11,
                            fontFamily: "HostGroteskBold",
                            marginBottom: 5,
                            color: "#FFF",
                          }}
                        >
                          {item.tag}
                        </Text>
                      </View>
                    )}
                  </View>

                  <Svg width="12" height="21" viewBox="0 0 12 21" fill="none">
                    <Path
                      d="M11.2739 9.2081C11.8452 9.7794 11.8452 10.7072 11.2739 11.2785L2.49884 20.0535C1.92754 20.6248 0.999763 20.6248 0.42847 20.0535C-0.142823 19.4822 -0.142823 18.5545 0.42847 17.9832L8.17063 10.241L0.43304 2.49884C-0.138253 1.92754 -0.138253 0.999763 0.43304 0.42847C1.00433 -0.142823 1.93211 -0.142823 2.50341 0.42847L11.2785 9.20353L11.2739 9.2081Z"
                      fill="#A0A0A0"
                    />
                  </Svg>
                </Pressable>
              ))}
            </View>
          </View>

          <View
            style={{
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontFamily: "HostGroteskBold",
                marginTop: 20,
                marginBottom: 15,
              }}
            >
              Get in Touch
            </Text>
            <View
              style={{
                gap: 10,
              }}
            >
              {touch.map((item, key) => (
                <Pressable
                  key={key}
                  onPress={() => {}}
                  style={{
                    backgroundColor: "#fff",
                    padding: 15,
                    borderRadius: 10,
                    flexDirection: "row",
                    gap: 15,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      backgroundColor: "#F5F5F5",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "100%",
                    }}
                  >
                    {item.icon}
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "HostGrotesk",
                      color: "#1A1A1A",
                    }}
                  >
                    {item.text}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View
            style={{
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontFamily: "HostGroteskBold",
                marginTop: 20,
                marginBottom: 15,
              }}
            >
              Follow Us
            </Text>
            <View
              style={{
                gap: 15,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Pressable onPress={() => {}}>
                <SvgXml xml={IG()} width={52} height={52} />
              </Pressable>
              <Pressable onPress={() => {}}>
                <Svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                  <Path
                    d="M51.1879 25.5939C51.1879 11.4588 39.7291 0 25.5939 0C11.4588 0 0 11.4588 0 25.5939C0 39.7291 11.4588 51.1879 25.5939 51.1879C39.7291 51.1879 51.1879 39.7291 51.1879 25.5939Z"
                    fill="black"
                  />
                  <Path
                    d="M31.3012 16.6816H34.3262L27.7192 24.2313L35.4916 34.506H29.4073L24.6385 28.276L19.1883 34.506H16.1591L23.2245 26.4293L15.7734 16.6816H22.012L26.3181 22.376L31.3012 16.6816ZM30.2386 32.6978H31.9139L21.0993 18.3955H19.2997L30.2386 32.6978Z"
                    fill="white"
                  />
                </Svg>
              </Pressable>
              <Pressable onPress={() => {}}>
                <Svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                  <Path
                    d="M51.1879 25.5939C51.1879 11.4588 39.7291 0 25.5939 0C11.4588 0 0 11.4588 0 25.5939C0 39.7291 11.4588 51.1879 25.5939 51.1879C39.7291 51.1879 51.1879 39.7291 51.1879 25.5939Z"
                    fill="#1877F2"
                  />
                  <Path
                    d="M24.2239 35.1441V49.7257H32.1763V35.1441H38.1063L39.3403 28.4394H32.1763V26.0673C32.1763 22.523 33.5679 21.1657 37.1602 21.1657C38.2777 21.1657 39.1757 21.1931 39.6968 21.2479V15.1671C38.7164 14.8997 36.317 14.6255 34.9322 14.6255C27.6036 14.6255 24.2239 18.0875 24.2239 25.5532V28.4394H19.6992V35.1441H24.2239Z"
                    fill="white"
                  />
                </Svg>
              </Pressable>
              <Pressable onPress={() => {}}>
                <Svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                  <Path
                    d="M51.1879 25.5939C51.1879 11.4588 39.7291 0 25.5939 0C11.4588 0 0 11.4588 0 25.5939C0 39.7291 11.4588 51.1879 25.5939 51.1879C39.7291 51.1879 51.1879 39.7291 51.1879 25.5939Z"
                    fill="#0A66C2"
                  />
                  <Path
                    d="M20.9066 36.5627H16.3585V21.9163H20.9066V36.5627ZM18.6301 19.9184C17.1757 19.9184 15.9961 18.7138 15.9961 17.2595C15.9961 16.5609 16.2736 15.8909 16.7676 15.397C17.2615 14.903 17.9315 14.6255 18.6301 14.6255C19.3287 14.6255 19.9986 14.903 20.4926 15.397C20.9866 15.8909 21.2641 16.5609 21.2641 17.2595C21.2641 18.7138 20.0839 19.9184 18.6301 19.9184ZM37.9289 36.5627H33.3905V29.4329C33.3905 27.7337 33.3562 25.5547 31.0258 25.5547C28.6612 25.5547 28.2988 27.4007 28.2988 29.3105V36.5627H23.7556V21.9163H28.1176V23.9142H28.1813C28.7885 22.7635 30.2717 21.5491 32.4846 21.5491C37.0876 21.5491 37.9338 24.5802 37.9338 28.5172V36.5627H37.9289Z"
                    fill="white"
                  />
                </Svg>
              </Pressable>
            </View>
          </View>
          <View
            style={{
              marginVertical: 40,
              paddingTop: 30,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontFamily: "HostGrotesk",
                marginBottom: 6,
                color: "#A0A0A0",
                textAlign: "center",
              }}
            >
              © 2026 Aibenmart Inc.
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontFamily: "HostGrotesk",

                marginBottom: 15,
                color: "#A0A0A0",
                textAlign: "center",
              }}
            >
              All rights reserved
            </Text>
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
