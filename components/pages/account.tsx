import { Image, Pressable, ScrollView, Text, View } from "react-native";

import { GlowBG } from "@/components/account/glow-bg";
import { arrowLeft } from "@/icons";
import { router } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

const options = [
  {
    icon: (
      <Svg width="18" height="22" viewBox="0 0 18 22" fill="none">
        <Path
          d="M8.75 8.75C10.9591 8.75 12.75 6.95914 12.75 4.75C12.75 2.54086 10.9591 0.75 8.75 0.75C6.54086 0.75 4.75 2.54086 4.75 4.75C4.75 6.95914 6.54086 8.75 8.75 8.75Z"
          stroke="black"
          stroke-width="1.5"
        />
        <Path
          d="M16.75 16.25C16.75 18.735 16.75 20.75 8.75 20.75C0.75 20.75 0.75 18.735 0.75 16.25C0.75 13.765 4.332 11.75 8.75 11.75C13.168 11.75 16.75 13.765 16.75 16.25Z"
          stroke="black"
          stroke-width="1.5"
        />
      </Svg>
    ),
    text: "Profile",
    link: "/account/marketplace/account/profile",
  },
  {
    icon: (
      <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <Path
          d="M1.88925 6.507L13.5493 0.954996C15.2493 0.144996 17.0233 1.92 16.2143 3.621L10.6623 15.28C9.90325 16.873 7.60325 16.775 6.98325 15.122L5.95725 12.383C5.857 12.1158 5.70072 11.8731 5.49892 11.6713C5.29712 11.4695 5.05446 11.3132 4.78725 11.213L2.04725 10.186C0.395253 9.566 0.296253 7.266 1.88925 6.507Z"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    ),
    text: "Location Settings",
    link: "/account/marketplace/account/locations",
  },
  {
    icon: (
      <Svg width="20" height="21" viewBox="0 0 20 21" fill="none">
        <Path
          d="M13.2483 16.25C13.2483 16.7096 13.1577 17.1648 12.9818 17.5894C12.8059 18.014 12.5481 18.3999 12.2231 18.7249C11.8981 19.0499 11.5123 19.3077 11.0876 19.4836C10.663 19.6595 10.2079 19.75 9.74826 19.75C9.28863 19.75 8.83351 19.6595 8.40887 19.4836C7.98423 19.3077 7.59839 19.0499 7.27338 18.7249C6.94838 18.3999 6.69057 18.014 6.51468 17.5894C6.33879 17.1648 6.24826 16.7096 6.24826 16.25M16.9793 16.25H2.51826C2.16843 16.2499 1.8265 16.146 1.5357 15.9515C1.24489 15.7571 1.01827 15.4808 0.884481 15.1575C0.750692 14.8343 0.715744 14.4787 0.784054 14.1356C0.852365 13.7925 1.02087 13.4773 1.26826 13.23L1.87026 12.627C2.43254 12.0644 2.74835 11.3014 2.74826 10.506V7.75C2.74826 5.89348 3.48575 4.11301 4.79851 2.80025C6.11126 1.4875 7.89174 0.75 9.74826 0.75C11.6048 0.75 13.3852 1.4875 14.698 2.80025C16.0108 4.11301 16.7483 5.89348 16.7483 7.75V10.506C16.7484 11.3016 17.0646 12.0645 17.6273 12.627L18.2303 13.23C18.4772 13.4775 18.6452 13.7926 18.7133 14.1356C18.7813 14.4785 18.7463 14.8339 18.6125 15.1569C18.4788 15.48 18.2525 15.7562 17.962 15.9507C17.6715 16.1452 17.3289 16.2494 16.9793 16.25Z"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    ),
    text: "Notification Settings",
    link: "/account/marketplace/account/notifications",
  },
  {
    icon: (
      <Svg width="18" height="20" viewBox="0 0 18 20" fill="none">
        <Path
          d="M11.1855 0.753906V4.34991C11.1855 4.83691 11.3795 5.30491 11.7255 5.64991C12.0724 5.99528 12.542 6.18909 13.0315 6.18891H17.1565"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M17.25 6.56901V15.137C17.2301 15.6974 17.0996 16.2484 16.8658 16.7581C16.6321 17.2679 16.2997 17.7263 15.888 18.107C15.4759 18.4895 14.9925 18.787 14.4654 18.9826C13.9383 19.1782 13.3778 19.2681 12.816 19.247H5.226C4.66074 19.2728 4.09594 19.1868 3.56398 18.994C3.03201 18.8011 2.54335 18.5051 2.126 18.123C1.71027 17.7413 1.37454 17.2807 1.13833 16.7681C0.90211 16.2555 0.770111 15.7011 0.75 15.137V4.86301C0.769854 4.30258 0.900422 3.75162 1.13418 3.24189C1.36794 2.73215 1.70026 2.27372 2.112 1.89301C2.52408 1.51053 3.00748 1.21299 3.53458 1.01738C4.06169 0.821777 4.62217 0.73194 5.184 0.753005H10.898C11.7703 0.749924 12.6123 1.07267 13.259 1.65801L16.219 4.38001C16.5349 4.65208 16.7899 4.98761 16.9675 5.36475C17.1452 5.7419 17.2414 6.15221 17.25 6.56901Z"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    ),
    text: "Terms & Conditions",
    link: "/account/marketplace/account/terms",
  },
  {
    icon: (
      <Svg width="17" height="20" viewBox="0 0 17 20" fill="none">
        <Path
          d="M9.746 18.75H2.75C1.645 18.75 0.75 17.599 0.75 16.179V3.32C0.75 1.901 1.645 0.75 2.75 0.75H9.75M12.25 13.25L15.75 9.75L12.25 6.25M5.75 9.746H15.75"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    ),
    text: "Sign Out",
    link: "account/marketplace/account/sign-out",
  },
];

export default function Account() {
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
                Account
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
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <View
              style={{
                width: 170,
                height: 170,
                borderRadius: "100%",
                borderWidth: 1,
                borderColor: "#FFDAAD",
                padding: 3,
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
            <View
              style={{
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "HostGroteskBold",
                  textAlign: "center",
                }}
              >
                Sarah Davies
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "HostGrotesk",
                  color: "#7E7E7E",
                  textAlign: "center",
                }}
              >
                sarah.davies@example.com
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 0,
              marginTop: 50,
            }}
          >
            {options.map((item, key) => (
              <Pressable
                key={key}
                onPress={() => router.push(item.link)}
                style={[
                  {
                    flexDirection: "row",
                    gap: 20,
                    backgroundColor: "rgba(138, 138, 138, 0.05)",
                    paddingVertical: 20,
                    paddingHorizontal: 15,
                    width: "100%",
                    borderColor: "rgba(215, 215, 215, 1)",
                  },
                  !key && {
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                  },
                  key + 1 == options.length
                    ? {
                        borderBottomLeftRadius: 16,
                        borderBottomRightRadius: 16,
                      }
                    : {
                        borderBottomWidth: 1,
                      },
                ]}
              >
                {item.icon}
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "HostGrotesk",
                  }}
                >
                  {item.text}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
