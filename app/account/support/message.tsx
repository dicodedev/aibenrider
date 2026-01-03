import { arrowLeft } from "@/icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

export default function Message() {
  const app = useSelector((state: any) => state.app);

  const router = useRouter();

  const [text, setText] = useState("");
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <View
        style={{
          position: "relative",
          width: "100%",
          backgroundColor: "#F7F7F7",
        }}
      >
        <Pressable
          onPress={() => router.back()}
          hitSlop={40}
          style={{
            height: 70,
            width: 70,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            left: 10,
            top: 10,
            zIndex: 1000,
          }}
        >
          <SvgXml xml={arrowLeft()} width={21} height={16} />
        </Pressable>
        <Text
          style={{
            fontFamily: "HostGroteskBold",
            fontSize: 23,
            textAlign: "center",
            marginVertical: 30,
          }}
        >
          Leave a Message
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Image
          source={require("@/assets/images/account/support.png")}
          style={{
            width: 330,
            height: 150,
          }}
        />
      </View>
      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
          marginTop: 60,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontFamily: "HostGroteskBold",
            marginBottom: 30,
          }}
        >
          Your Conversations
        </Text>
        <View>
          {[
            {
              heading: "Account Issue",
              text: "My account is nor approved",
              time: "2h ago",
            },
            {
              heading: "Referral Bonus",
              text: "How do i get payment for referring a friend",
              time: "Yesterday",
            },
            {
              heading: "Delivery Problem",
              text: "Package not delivered",
              time: "5 days ago",
            },
          ].map((item, key) => (
            <Pressable
              onPress={() => router.push("/account/support/chat")}
              key={key}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 30,
                gap: 30,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 15,
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "100%",
                    backgroundColor: "#FFE9CE",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Svg width="20" height="18" viewBox="0 0 20 18" fill="none">
                    <Path
                      d="M9.67578 7.87499V7.42499V7.87499ZM13.2758 7.87499V7.42499V7.87499ZM6.07578 7.87499V7.42499V7.87499ZM1.99338 13.1202C0.675781 12.0663 0.675781 11.2689 0.675781 7.87499C0.675781 4.48109 0.675781 2.78369 1.99338 1.72979C3.31278 0.674988 5.43318 0.674988 9.67578 0.674988C13.9184 0.674988 16.0397 0.674988 17.3573 1.72979C18.6758 2.78369 18.6758 4.48109 18.6758 7.87499C18.6758 11.2689 18.6758 12.0663 17.3573 13.1202C16.0406 14.175 13.9184 14.175 9.67578 14.175C7.41678 14.175 6.25578 15.7392 4.27578 16.875V13.9842C3.29118 13.8375 2.56668 13.5792 1.99338 13.1202Z"
                      fill="#FFE9CE"
                    />
                    <Path
                      d="M9.67578 7.87499V7.42499M13.2758 7.87499V7.42499M6.07578 7.87499V7.42499M1.99338 13.1202C0.675781 12.0663 0.675781 11.2689 0.675781 7.87499C0.675781 4.48109 0.675781 2.78369 1.99338 1.72979C3.31278 0.674988 5.43318 0.674988 9.67578 0.674988C13.9184 0.674988 16.0397 0.674988 17.3573 1.72979C18.6758 2.78369 18.6758 4.48109 18.6758 7.87499C18.6758 11.2689 18.6758 12.0663 17.3573 13.1202C16.0406 14.175 13.9184 14.175 9.67578 14.175C7.41678 14.175 6.25578 15.7392 4.27578 16.875V13.9842C3.29118 13.8375 2.56668 13.5792 1.99338 13.1202Z"
                      stroke="#D88814"
                      stroke-width="1.35"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </Svg>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "MontserratBold",
                      marginBottom: 10,
                    }}
                  >
                    {item.heading}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "Outfit",
                      color: "#8C8C8C",
                    }}
                  >
                    {item.text}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Outfit",
                  color: "#8C8C8C",
                  textAlign: "right",
                }}
              >
              
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          width: "100%",
        }}
      >
        <Pressable
          style={{
            width: "100%",
            backgroundColor: "#100152",
            paddingVertical: 20,
            borderRadius: 12,
            marginTop: 100,
          }}
          onPress={() => router.push("/account/support/chat")}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontFamily: "HostGroteskBold",
              fontSize: 16,
            }}
          >
            NEW CONVERSATION
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
