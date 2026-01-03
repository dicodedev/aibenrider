import { arrowLeft } from "@/icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

export default function Chat() {
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
            fontFamily: "Outfit",
            fontSize: 23,
            textAlign: "center",
            marginVertical: 30,
          }}
        >
          Chat
        </Text>
      </View>
      <ScrollView
        style={{
          flex: 1,
          width: "100%",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            marginTop: 20,
          }}
        >
          <View
            style={{
              gap: 10,
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: "#0A1ED9",
                backgroundColor: "#E7E9FB",
                padding: 16,
                alignSelf: "flex-end",
                borderRadius: 16,
                borderTopRightRadius: 0,
              }}
            >
              <Text
                style={{
                  color: "#696969",
                  fontFamily: "Poppins",
                  fontSize: 14,
                }}
              >
                Hello, I need some assistance
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#0A1ED9",
                backgroundColor: "#E7E9FB",
                padding: 10,
                alignSelf: "flex-end",
                borderRadius: 16,
                borderTopRightRadius: 0,
              }}
            >
              <Text
                style={{
                  color: "#696969",
                  fontFamily: "Poppins",
                  fontSize: 14,
                }}
              >
                That's it
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: 12,
              color: "#717171",
              fontFamily: "Poppins",
              textAlign: "right",
              marginTop: 6,
            }}
          >
            8:29 am
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            marginTop: 20,
          }}
        >
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: "100%",
              backgroundColor: "#100152",
              padding: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("@/assets/images/logo/white-icon.png")}
              style={{
                width: 11,
                height: 15,
              }}
            />
          </View>
          <View>
            <View
              style={{
                gap: 10,
              }}
            >
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#EAEAEA",
                  backgroundColor: "#EAEAEA",
                  padding: 16,
                  alignSelf: "flex-start",
                  borderRadius: 16,
                  borderTopLeftRadius: 0,
                }}
              >
                <Text
                  style={{
                    color: "#696969",
                    fontFamily: "Poppins",
                    fontSize: 14,
                  }}
                >
                  Thank your contacting us
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#EAEAEA",
                  backgroundColor: "#EAEAEA",
                  padding: 16,
                  alignSelf: "flex-start",
                  borderRadius: 16,
                  borderTopLeftRadius: 0,
                }}
              >
                <Text
                  style={{
                    color: "#696969",
                    fontFamily: "Poppins",
                    fontSize: 14,
                  }}
                >
                  That's it
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontSize: 12,
                color: "#717171",
                fontFamily: "Poppins",
                textAlign: "left",
                marginTop: 6,
              }}
            >
              8:29 am
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          backgroundColor: "#F7F7F7",
          alignItems: "center",
          paddingVertical: 20,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          hitSlop={40}
          style={{
            height: 70,
            width: 60,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Svg width="19" height="19" viewBox="0 0 19 19" fill="none">
            <Path
              d="M6.05585 1.18508C8.2611 0.271639 10.7389 0.271638 12.9442 1.18508C15.1494 2.09853 16.9015 3.8506 17.8149 6.05585C18.7284 8.2611 18.7284 10.7389 17.8149 12.9441C16.9015 15.1494 15.1494 16.9015 12.9442 17.8149C10.7389 18.7284 8.2611 18.7284 6.05585 17.8149C3.8506 16.9015 2.09853 15.1494 1.18508 12.9442C0.271639 10.7389 0.271639 8.2611 1.18508 6.05585C2.09853 3.8506 3.8506 2.09853 6.05585 1.18508Z"
              fill="#C2CCDE"
              fill-opacity="0.25"
            />
            <Path
              d="M13.5914 9.66472H5.4735M9.53247 13.7237V5.60575M1.18508 6.05585C2.09853 3.8506 3.8506 2.09853 6.05585 1.18508C8.2611 0.271639 10.7389 0.271638 12.9442 1.18508C15.1494 2.09853 16.9015 3.8506 17.8149 6.05585C18.7284 8.2611 18.7284 10.7389 17.8149 12.9442C16.9015 15.1494 15.1494 16.9015 12.9442 17.8149C10.7389 18.7284 8.2611 18.7284 6.05585 17.8149C3.8506 16.9015 2.09853 15.1494 1.18508 12.9442C0.271639 10.7389 0.271639 8.2611 1.18508 6.05585Z"
              stroke="#5A5A5A"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </Svg>
        </Pressable>
        <View
          style={{
            flexDirection: "row",
            borderWidth: 1,
            borderRadius: 8,
            flex: 1,
            borderColor: "#DBDBDB",
            paddingVertical: 10,
            paddingHorizontal: 10,
            paddingRight: 10,
            gap: 15,
            alignItems:'flex-end'
          }}
        >
          <TextInput
            style={{
              color: "#000000",
              fontFamily: "Poppins",
              fontSize: 16,
              flex: 1,
            }}
            multiline={true}
            numberOfLines={4}
            placeholder="Type your message"
            value={text}
            placeholderTextColor="#D0D0D0"
            onChangeText={setText}
            textAlignVertical="top"
          />
          <Pressable
            hitSlop={40}
            style={{
              marginBottom: 10,
            }}
          >
            <Svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <Path
                d="M4.78451 1.24948C6.8596 0.250173 9.27681 0.250173 11.3519 1.24948C13.427 2.24879 14.9341 4.13864 15.4466 6.38407C15.9591 8.62949 15.4212 10.9861 13.9852 12.7868C12.5492 14.5875 10.3714 15.6363 8.06821 15.6363C5.76504 15.6363 3.5872 14.5875 2.1512 12.7868C0.715194 10.9861 0.177314 8.62949 0.689817 6.38407C1.20232 4.13864 2.70943 2.24879 4.78451 1.24948Z"
                fill="#C2CCDE"
                fill-opacity="0.25"
              />
              <Path
                d="M5.96821 6.26814C5.96821 6.59951 5.69958 6.86814 5.36821 6.86814C5.03684 6.86814 4.76821 6.59951 4.76821 6.26814C4.76821 5.93677 5.03684 5.66814 5.36821 5.66814C5.69958 5.66814 5.96821 5.93677 5.96821 6.26814Z"
                fill="#C2CCDE"
                fill-opacity="0.25"
              />
              <Path
                d="M11.3682 6.26814C11.3682 6.59951 11.0996 6.86814 10.7682 6.86814C10.4368 6.86814 10.1682 6.59951 10.1682 6.26814C10.1682 5.93677 10.4368 5.66814 10.7682 5.66814C11.0996 5.66814 11.3682 5.93677 11.3682 6.26814Z"
                fill="#C2CCDE"
                fill-opacity="0.25"
              />
              <Path
                d="M11.2502 11.2501C10.4063 12.094 9.26168 12.5681 8.06821 12.5681C6.87473 12.5681 5.73014 12.094 4.88623 11.2501M0.689817 6.38407C1.20232 4.13864 2.70943 2.24879 4.78451 1.24948C6.8596 0.250173 9.27681 0.250173 11.3519 1.24948C13.427 2.24879 14.9341 4.13864 15.4466 6.38407C15.9591 8.62949 15.4212 10.9861 13.9852 12.7868C12.5492 14.5875 10.3714 15.6363 8.06821 15.6363C5.76504 15.6363 3.5872 14.5875 2.1512 12.7868C0.715194 10.9861 0.177314 8.62949 0.689817 6.38407ZM5.96821 6.26814C5.96821 6.59951 5.69958 6.86814 5.36821 6.86814C5.03684 6.86814 4.76821 6.59951 4.76821 6.26814C4.76821 5.93677 5.03684 5.66814 5.36821 5.66814C5.69958 5.66814 5.96821 5.93677 5.96821 6.26814ZM11.3682 6.26814C11.3682 6.59951 11.0996 6.86814 10.7682 6.86814C10.4368 6.86814 10.1682 6.59951 10.1682 6.26814C10.1682 5.93677 10.4368 5.66814 10.7682 5.66814C11.0996 5.66814 11.3682 5.93677 11.3682 6.26814Z"
                stroke="#414141"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </Svg>
          </Pressable>
        </View>
        <Pressable
          hitSlop={40}
          style={{
            height: 40,
            width: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Svg width="17" height="19" viewBox="0 0 17 19" fill="none">
            <Path
              d="M15.5617 1.13817C15.5913 0.644629 15.0447 0.329088 14.6321 0.601513L0.769106 9.75464C0.396889 10.0004 0.413427 10.5519 0.7997 10.775L5.67448 13.5894L10.8333 8.25403L8.79217 15.3894L13.6674 18.2041C14.0537 18.4272 14.5396 18.1657 14.5663 17.7205L15.5617 1.13817Z"
              fill="#C2CCDE"
              fill-opacity="0.25"
              stroke="#5A5A5A"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </Svg>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
