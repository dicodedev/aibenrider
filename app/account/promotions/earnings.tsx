import { FlatList, Image, Pressable, Text, View } from "react-native";

import { appService } from "@/api/appService";
import { NoDataFound } from "@/components/account/no-data-found";
import { arrowLeft } from "@/icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { router } from "expo-router";
import { Skeleton } from "moti/skeleton";
import { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import { formatAmount } from "@/utils/helper";
import ScalingDots from "@/components/scaling-dots";
import ProfilePicture from "@/assets/images/account/profile-picture.png";

export default function Earnings() {
  const app = useSelector((state: any) => state.app);
  const [search, setSearch] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [done, setDone] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["getReferrals"],
      queryFn: appService.getReferrals,
      getNextPageParam: (lastPage) => {
        if (!lastPage.next_page_url) return undefined;

        const url = new URL(lastPage.next_page_url);
        let nextPage = Number(url.searchParams.get("page"));
        return nextPage;
      },
    });

  // console.log("data", data);

  const referrals = data?.pages.flatMap((page) => page.data) ?? [];
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
              <FlatList
                style={{
                  flex: 1,
                }}
                ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
                data={referrals}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => item.id + `_` + index}
                renderItem={({ item, index }) => (
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
                      {formatAmount(item.orders_count)} Orders
                    </Text>
                  </View>
                )}
                onEndReached={() => {
                  if (hasNextPage) fetchNextPage();
                }}
                onEndReachedThreshold={0.2} //0.2
                ListFooterComponent={
                  isFetchingNextPage ? (
                    <View
                      style={{
                        marginTop: 0,
                      }}
                    >
                      <ScalingDots
                        dotCount={3}
                        dotSize={9}
                        dotColor="#ccc"
                        speed={300}
                        style={{
                          marginVertical: 5,
                        }}
                        scaleRange={[1, 1.5]}
                      />
                    </View>
                  ) : null
                }
              />
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
