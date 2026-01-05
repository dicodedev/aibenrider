import React from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

import { useSelector } from "react-redux";

import { DrawerContentScrollView } from "@react-navigation/drawer";

import { delivery } from "@/icons";
import { router, usePathname } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { Image } from "react-native";
import Svg, { Circle, Path, SvgXml } from "react-native-svg";

export default function AccountLayout() {
  const app = useSelector((state: any) => state.app);

  console.log("path", usePathname());
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Drawer
        initialRouteName="dashboard"
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            width: 300,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          },
        }}
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <Drawer.Screen name="dashboard" />
        <Drawer.Screen name="vehicles" />
        <Drawer.Screen name="about" />
        <Drawer.Screen name="promotions" />
        <Drawer.Screen name="support" />
        <Drawer.Screen name="wallet" />
      </Drawer>
    </View>
  );
}

const items = [
  {
    link: "/account/dashboard",
    icon: (
      <Svg width="18" height="16" viewBox="0 0 18 16" fill="none">
        <Path
          d="M16.6484 5.98144C16.6474 6.53186 16.4759 7.06844 16.1575 7.51741C15.8391 7.96638 15.3894 8.30569 14.8703 8.48868C14.5863 8.59528 14.2854 8.64949 13.9821 8.64868C13.4316 8.64765 12.8951 8.47613 12.4461 8.15772C11.9971 7.8393 11.6578 7.38963 11.4748 6.87052C11.3681 6.58629 11.3139 6.28504 11.3148 5.98144C11.3174 6.28501 11.2629 6.58684 11.1548 6.87052C10.9719 7.38949 10.6327 7.83907 10.1839 8.15747C9.7351 8.47587 9.19871 8.64747 8.64844 8.64868C8.09817 8.64747 7.56178 8.47587 7.11298 8.15747C6.66418 7.83907 6.32501 7.38949 6.14206 6.87052C6.03535 6.58629 5.98114 6.28504 5.98206 5.98144C5.98379 6.28501 5.93017 6.58684 5.82206 6.87052C5.63906 7.38963 5.29975 7.8393 4.85079 8.15772C4.40182 8.47613 3.86523 8.64765 3.31482 8.64868C3.01211 8.65041 2.70941 8.59679 2.4266 8.48868C1.90749 8.30569 1.45782 7.96638 1.1394 7.51741C0.820989 7.06844 0.649473 6.53186 0.648438 5.98144L1.048 4.57776L2.00801 1.8396C2.13033 1.49154 2.35768 1.19003 2.65869 0.976706C2.9597 0.763384 3.3195 0.648767 3.68844 0.648682H13.6084C13.9772 0.648946 14.3368 0.763646 14.6377 0.976956C14.9385 1.19027 15.1657 1.49168 15.288 1.8396L16.248 4.57776L16.6484 5.98144Z"
          stroke="black"
          stroke-width="1.2973"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M14.8712 8.48877V13.0933C14.871 13.5646 14.6836 14.0165 14.3504 14.3498C14.0171 14.6831 13.5652 14.8704 13.0939 14.8706H4.20394C3.97047 14.8707 3.73927 14.8248 3.52354 14.7356C3.3078 14.6463 3.11177 14.5154 2.94665 14.3504C2.78152 14.1853 2.65052 13.9893 2.56115 13.7737C2.47178 13.558 2.42578 13.3268 2.42578 13.0933V8.48877M5.98297 12.2042H11.3157"
          stroke="black"
          stroke-width="1.2973"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    ),
    text: "Dashboard",
  },
  {
    link: "/account/vehicles",
    icon: <SvgXml xml={delivery("#000000")} width={22} height={19} />,
    text: "Vehicles Services",
  },
  {
    link: "/account/promotions",
    icon: (
      <Svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <Path
          d="M7.18736 0.150024L7.0113 0.307525L0.594859 6.79484L0.208984 7.18184L0.595422 7.58684L5.93917 12.9306L6.34417 13.317L6.7323 12.9306L13.2179 6.51415L13.3749 6.33752V0.150024H7.18736ZM7.66211 1.27502H12.2499V5.86277L6.34361 11.7341L1.79073 7.18127L7.66211 1.27502ZM10.5624 2.40002C10.4132 2.40002 10.2701 2.45929 10.1646 2.56478C10.0591 2.67027 9.99986 2.81334 9.99986 2.96252C9.99986 3.11171 10.0591 3.25478 10.1646 3.36027C10.2701 3.46576 10.4132 3.52502 10.5624 3.52502C10.7115 3.52502 10.8546 3.46576 10.9601 3.36027C11.0656 3.25478 11.1249 3.11171 11.1249 2.96252C11.1249 2.81334 11.0656 2.67027 10.9601 2.56478C10.8546 2.45929 10.7115 2.40002 10.5624 2.40002Z"
          fill="black"
          stroke="black"
          stroke-width="0.3"
        />
      </Svg>
    ),
    text: "Referral",
  },
  {
    link: "/account/support",
    icon: (
      <Svg width="12" height="16" viewBox="0 0 12 16" fill="none">
        <Path
          d="M4.61325 10.3311L4.6065 10.3153C4.5051 10.2876 4.40455 10.2568 4.305 10.2231L4.2975 10.2201C3.26142 9.86558 2.36211 9.196 1.72547 8.30504C1.08882 7.41409 0.7467 6.34636 0.747 5.25131C0.746666 3.90739 1.26173 2.61452 2.18609 1.63898C3.11046 0.66345 4.37374 0.0795485 5.71572 0.00754638C7.05771 -0.0644557 8.37622 0.380925 9.39966 1.25195C10.4231 2.12298 11.0735 3.35332 11.217 4.68956C11.25 4.99856 10.995 5.25131 10.6845 5.25131C10.374 5.25131 10.1258 4.99781 10.0845 4.69031C9.98474 3.96451 9.69352 3.27837 9.24076 2.7024C8.78801 2.12642 8.19004 1.6814 7.50834 1.41306C6.82663 1.14472 6.08576 1.06274 5.36188 1.17555C4.63799 1.28836 3.9572 1.59189 3.38948 2.05495C2.82175 2.51801 2.38757 3.12389 2.13155 3.81032C1.87553 4.49675 1.8069 5.23897 1.93274 5.96071C2.05857 6.68244 2.37431 7.35765 2.84751 7.91695C3.32072 8.47624 3.93432 8.89944 4.62525 9.14306C4.76443 8.82846 5.00753 8.57125 5.31379 8.41456C5.62006 8.25787 5.97087 8.21122 6.30745 8.28242C6.64402 8.35362 6.94588 8.53834 7.16246 8.80564C7.37903 9.07293 7.49714 9.40654 7.497 9.75056C7.497 10.1991 7.3005 10.6011 6.98925 10.8756C6.71532 11.1175 6.36248 11.2511 5.997 11.2513C5.70111 11.2524 5.41158 11.1654 5.1652 11.0016C4.91882 10.8377 4.7267 10.6043 4.61325 10.3311ZM2.99475 10.8763C2.44197 10.5809 1.93578 10.2056 1.4925 9.76256C1.0816 9.81036 0.702581 10.0074 0.42743 10.3163C0.152279 10.6252 0.000170488 11.0244 0 11.4381V11.8716C0 12.5406 0.2385 13.1886 0.6735 13.6978C1.848 15.0733 3.6375 15.7528 5.997 15.7528C8.3565 15.7528 10.1467 15.0733 11.3235 13.6978C11.7595 13.1884 11.9992 12.5399 11.9993 11.8693V11.4381C11.9993 10.9908 11.8217 10.5618 11.5055 10.2453C11.1894 9.92892 10.7605 9.75096 10.3132 9.75056H8.622C8.622 10.1541 8.532 10.5351 8.36925 10.8756H10.3132C10.4622 10.876 10.6049 10.9354 10.71 11.0408C10.8152 11.1463 10.8743 11.2891 10.8743 11.4381V11.8693C10.8744 12.2716 10.7307 12.6608 10.4692 12.9666C9.5265 14.0676 8.05125 14.6271 5.997 14.6271C3.94275 14.6271 2.469 14.0676 1.52925 12.9673C1.26793 12.6617 1.12431 12.2729 1.12425 11.8708V11.4381C1.12425 11.2889 1.18351 11.1458 1.289 11.0403C1.39449 10.9348 1.53757 10.8756 1.68675 10.8756L2.99475 10.8763ZM2.997 5.25131C2.99714 4.73385 3.13112 4.22522 3.38593 3.77484C3.64074 3.32447 4.00771 2.94766 4.45119 2.68102C4.89467 2.41439 5.39957 2.267 5.91685 2.25318C6.43413 2.23935 6.94619 2.35956 7.40328 2.60213C7.86036 2.84469 8.24694 3.20136 8.52544 3.63749C8.80394 4.07361 8.9649 4.57436 8.99267 5.09107C9.02045 5.60779 8.9141 6.1229 8.68396 6.58637C8.45381 7.04984 8.1077 7.44589 7.67925 7.73606C7.20722 7.34207 6.61186 7.12627 5.997 7.12631C6.49428 7.12631 6.97119 6.92877 7.32283 6.57714C7.67446 6.22551 7.872 5.74859 7.872 5.25131C7.872 4.75403 7.67446 4.27712 7.32283 3.92549C6.97119 3.57386 6.49428 3.37631 5.997 3.37631C5.49972 3.37631 5.02281 3.57386 4.67117 3.92549C4.31954 4.27712 4.122 4.75403 4.122 5.25131C4.122 5.74859 4.31954 6.22551 4.67117 6.57714C5.02281 6.92877 5.49972 7.12631 5.997 7.12631C5.3565 7.12631 4.77 7.35581 4.3155 7.73606C3.90892 7.46167 3.57602 7.09155 3.3461 6.65826C3.11618 6.22498 2.9963 5.74182 2.997 5.25131Z"
          fill="black"
        />
      </Svg>
    ),
    text: "Support",
  },
  {
    link: "/account/about",
    icon: (
      <Svg width="17" height="17" viewBox="0 0 17 17" fill="none">
        <Path
          d="M8.25 15.75C12.3921 15.75 15.75 12.3921 15.75 8.25C15.75 4.10786 12.3921 0.75 8.25 0.75C4.10786 0.75 0.75 4.10786 0.75 8.25C0.75 12.3921 4.10786 15.75 8.25 15.75Z"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M8.25 11.25V8.25M8.25 5.25H8.2575"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    ),
    text: "About",
  },
];

function CustomDrawer(props: any) {
  const { state } = props;

  // Active route index
  const activeIndex = state.index;

  // Active route object
  const activeRoute = state.routes[activeIndex];
  const page = activeRoute.name;
  return (
    <DrawerContentScrollView
      {...props}
      style={{
        padding: 0,
        paddingLeft: 0,
      }}
      contentContainerStyle={{
        paddingHorizontal: 0,
        marginHorizontal: 0,
        marginLeft: 0,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#DCDCDC",
          justifyContent: "space-between",
          paddingRight: 30,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            padding: 20,
            paddingLeft: 5,
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: "100%",
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
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: "HostGroteskBold",
                fontSize: 18,
                marginBottom: 3,
                width: "100%",
              }}
            >
              John Doe
            </Text>
            <Text
              style={{
                color: "#FBAF41",
                fontFamily: "HostGroteskBold",
                fontSize: 14,
                marginBottom: 3,
              }}
            >
              My account
            </Text>
          </View>
        </View>
        <Pressable onPress={() => router.push("/account/alerts")}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
              d="M21 6.50001C21 8.43001 19.43 10 17.5 10C15.57 10 14 8.43001 14 6.50001C14 4.57001 15.57 3.00001 17.5 3.00001C19.43 3.00001 21 4.57001 21 6.50001ZM19 11.79C18.5 11.92 18 12 17.5 12C16.0421 11.9974 14.6447 11.4171 13.6138 10.3862C12.583 9.3553 12.0026 7.95788 12 6.50001C12 5.03001 12.58 3.70001 13.5 2.71001C13.3185 2.48755 13.0897 2.30838 12.8302 2.18555C12.5707 2.06272 12.2871 1.99934 12 2.00001C10.9 2.00001 10 2.90001 10 4.00001V4.29001C7.03 5.17001 5 7.90001 5 11V17L3 19V20H21V19L19 17V11.79ZM12 23C13.11 23 14 22.11 14 21H10C10 21.5304 10.2107 22.0391 10.5858 22.4142C10.9609 22.7893 11.4696 23 12 23Z"
              fill="black"
            />
            <Circle cx="17.5" cy="6.5" r="3.5" fill="#FF3232" />
          </Svg>
        </Pressable>
      </View>
      <View
        style={{
          marginTop: 10,
        }}
      >
        {items.map((item, key) => {
          const isActive = item.link.split("/")[2] === page;
          return (
            <TouchableOpacity
              key={key}
              onPress={() => router.replace(item.link)}
              style={{
                padding: 16,
                paddingVertical: 14,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                backgroundColor: isActive
                  ? "rgba(245, 245, 245, 1)"
                  : "transparent",
              }}
            >
              {item.icon}
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "HostGroteskBold",
                  width: "100%",
                }}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </DrawerContentScrollView>
  );
}
