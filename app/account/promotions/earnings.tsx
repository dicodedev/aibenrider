import { Pressable, Text, View } from "react-native";

import { appService } from "@/api/appService";
import { NoDataFound } from "@/components/account/no-data-found";
import { arrowLeft } from "@/icons";
import { router } from "expo-router";
import { Skeleton } from "moti/skeleton";
import { useEffect, useState } from "react";
import { Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

import ProfilePicture from "@/assets/images/account/profile-picture.png";
import { format } from "date-fns";

export default function Earnings() {
  const app = useSelector((state: any) => state.app);
  const [search, setSearch] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [done, setDone] = useState(false);

  const [referrals, setReferrals] = useState(null);

  const fetchReferrals = async () => {
    const res = await appService.getReferrals();
    setReferrals(res.data);
  };

  useEffect(() => {
    fetchReferrals();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 15,
        }}
        edges={["left", "right", "top"]}
      >
        {/* NAV */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
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
            All Referrals
          </Text>
          <View
            style={{
              width: 70,
              height: 50,
              borderRadius: 100,
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </View>
        <ScrollView
          contentContainerStyle={{
            marginTop: 0,
            marginBottom: 30,
          }}
        >
          {referrals ? (
            referrals.length ? (
              referrals.map((item, key) => (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: 10,
                    paddingRight: 20,
                    backgroundColor: "#fff",
                    paddingHorizontal: 10,
                    marginBottom: 10,
                    borderRadius: 12,
                    alignItems: "center",
                  }}
                  key={key}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 20,
                    }}
                  >
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: "#FFE9CE",
                        borderRadius: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={
                          item
                            ? item?.picture != "null"
                              ? { uri: item?.picture }
                              : ProfilePicture
                            : ProfilePicture
                        }
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 100,
                        }}
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: "HostGroteskBold",
                          marginBottom: 3,
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          color: "#686868",
                          fontSize: 12,
                          fontFamily: "HostGroteskBold",
                        }}
                      >
                        Joined on{" "}
                        {format(
                          new Date(item.created_at),
                          "do 'of' MMMM, yyyy",
                        )}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "HostGroteskBold",
                    }}
                  >
                    {item.orders_count} Orders
                  </Text>
                </View>
              ))
            ) : (
              <NoDataFound text={"No referral found"} />
            )
          ) : (
            [1, 2, 3, 4, 5].map((item, key) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 10,
                  paddingRight: 20,
                  backgroundColor: "#fff",
                  paddingHorizontal: 10,
                  marginBottom: 10,
                  borderRadius: 12,
                  alignItems: "center",
                }}
                key={key}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 20,
                    flex: 1,
                  }}
                >
                  <Skeleton
                    colorMode="light"
                    height={50}
                    width={50}
                    radius={100}
                  />
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "HostGroteskBold",
                        marginTop: 6,
                      }}
                    >
                      <Skeleton
                        colorMode="light"
                        height={12}
                        width={120}
                        radius={3}
                      />
                    </Text>
                    <Text
                      style={{
                        color: "#686868",
                        fontSize: 12,
                        fontFamily: "HostGroteskBold",
                        marginTop: 10,
                      }}
                    >
                      <Skeleton
                        colorMode="light"
                        height={12}
                        width={180}
                        radius={3}
                      />
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "HostGroteskBold",
                    width: 80,
                    paddingLeft: 10,
                  }}
                >
                  <Skeleton
                    colorMode="light"
                    height={12}
                    width={60}
                    radius={4}
                  />
                </Text>
              </View>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
