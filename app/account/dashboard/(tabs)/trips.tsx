import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { GlowBG } from "@/components/account/glow-bg";
import { RequestCard } from "@/components/account/request-card";
import { arrowLeft } from "@/icons";
import { router, useNavigation } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

export default function Trips() {
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
        edges={["left", "right", "top"]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
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
                My Trips
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
              flexDirection: "row",
              gap: 30,
              marginVertical: 30,
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                flexDirection: "row",
                padding: 10,
                paddingHorizontal: 15,
                gap: 10,
                alignItems: "center",
                borderRadius: 12,
              }}
            >
              <View
                style={{
                  width: 31,
                  height: 31,
                  borderRadius: "100%",
                  backgroundColor: "#FDCB8D",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <Path
                    d="M7.2152 0.207412C6.73952 0.0245111 6.21292 0.0245111 5.73724 0.207412L1.02332 2.02032C0.742814 2.12824 0.501594 2.31862 0.331448 2.56636C0.161301 2.81411 0.0702136 3.10759 0.0701904 3.40814V9.31541C0.0702136 9.61596 0.161301 9.90945 0.331448 10.1572C0.501594 10.4049 0.742814 10.5953 1.02332 10.7032L5.73724 12.5161C6.21292 12.699 6.73952 12.699 7.2152 12.5161L11.9291 10.7032C12.2096 10.5953 12.4508 10.4049 12.621 10.1572C12.7911 9.90945 12.8822 9.61596 12.8823 9.31541V3.40814C12.8822 3.10759 12.7911 2.81411 12.621 2.56636C12.4508 2.31862 12.2096 2.12824 11.9291 2.02032L7.2152 0.207412ZM6.06578 1.0617C6.32998 0.960142 6.62246 0.960142 6.88666 1.0617L11.1499 2.70119L9.45045 3.35552L4.77679 1.55725L6.06578 1.0617ZM3.50199 2.04686L8.17565 3.84512L6.47622 4.49899L1.80256 2.70119L3.50199 2.04686ZM0.98671 3.36787L6.01865 5.30341V11.644L1.35185 9.84895C1.24402 9.80744 1.15129 9.73425 1.08586 9.63902C1.02044 9.54378 0.985391 9.43096 0.985338 9.31541V3.40814C0.985338 3.39441 0.985795 3.38099 0.98671 3.36787ZM6.93379 11.644V5.30341L11.9657 3.36787L11.9671 3.40814V9.31541C11.9671 9.55198 11.8211 9.76384 11.6006 9.84895L6.93379 11.644Z"
                    fill="#CA7A07"
                    stroke="#CA7A07"
                    stroke-width="0.140464"
                  />
                </Svg>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "HostGroteskBold",
                }}
              >
                Delivery
              </Text>
              <Svg width="17" height="10" viewBox="0 0 17 10" fill="none">
                <Path
                  d="M1.475 4.78596e-06L9.82809e-08 1.48334L8.25 9.72501L16.5 1.47501L15.025 4.94754e-06L8.25 6.77501L1.475 4.78596e-06Z"
                  fill="black"
                />
              </Svg>
            </View>
            <View
              style={{
                backgroundColor: "#EAEAEA",
                flexDirection: "row",
                padding: 10,
                paddingHorizontal: 15,
                gap: 10,
                alignItems: "center",
                borderRadius: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "HostGroteskBold",
                }}
              >
                Completed Trips
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 15,
              paddingBottom: 15,
              gap: 10,
            }}
          >
            {[1, 2, 3, 4, 5].map((item, key) => (
              <RequestCard key={key} index={item} />
            ))}
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
