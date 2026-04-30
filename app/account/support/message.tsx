import { appService } from "@/api/appService";
import { NoDataFound } from "@/components/account/no-data-found";
import ScalingDots from "@/components/scaling-dots";
import { arrowLeft } from "@/icons";
import { Capitalize } from "@/utils/helper";
import { useInfiniteQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { Skeleton } from "moti/skeleton";
import { FlatList, Image, Pressable, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

const statuses = {
  open: {
    bg: "#DBEAFE",
    color: "#1447E6",
  },
  in_progress: {
    bg: "#FEF9C2",
    color: "#A65F00",
  },
  resolved: {
    bg: "#DCFCE7",
    color: "#008236",
  },
  closed: {
    bg: "#F3F4F6",
    color: "#364153",
  },
};

export default function Message() {
  const app = useSelector((state: any) => state.app);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["getTickets"],
      queryFn: appService.getTickets,
      getNextPageParam: (lastPage) => {
        if (!lastPage.next_page_url) return undefined;

        const url = new URL(lastPage.next_page_url);
        let nextPage = Number(url.searchParams.get("page"));
        return nextPage;
      },
    });

  // console.log("data", data);

  const messages = data?.pages.flatMap((page) => page.data) ?? [];

  const ListHeader = () => (
    <>
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
      </View>
    </>
  );
  return (
    <SafeAreaView
      style={{
        flex: 1,
        position: "relative",
      }}
    >
      <View
        style={{
          paddingHorizontal: 20,
          width: "100%",
          position: "absolute",
          bottom: 0,
          backgroundColor: "#fff",
          zIndex: 100,
        }}
      >
        <Pressable
          style={{
            width: "100%",
            backgroundColor: "#100152",
            paddingVertical: 20,
            borderRadius: 12,
            marginTop: 20,
            marginBottom: 20,
          }}
          onPress={() =>
            router.push({
              pathname: "/account/support/chat",
              params: {
                ticket_id: null,
              },
            })
          }
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
      <View
        style={{
          flex: 1,
          // alignItems: "center",
          // borderWidth: 1,
        }}
      >
        <FlatList
          data={messages}
          style={{
            // marginTop: 15,
            // paddingLeft: 0,
            // gap: 20,
            marginBottom: 50,
            // borderWidth: 1,
            // margin: 0,
          }}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<ListHeader />}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/account/support/chat",
                  params: {
                    ticket_id: item.id,
                  },
                })
              }
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 30,
                paddingLeft: 20,
                gap: 30,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
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
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "Outfit",
                        color: "#8C8C8C",
                      }}
                    >
                      {item.last_message
                        ? `${item.last_message?.from?.name}: ${item?.last_message?.message}`
                        : "Click here new to start a conversation"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: statuses[item.status]?.bg,
                    padding: 3,
                    borderRadius: 10,
                    paddingHorizontal: 12,
                    alignSelf: "flex-start",
                    marginRight: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 9,
                      fontFamily: "HostGroteskBold",
                      color: statuses[item.status]?.color,
                    }}
                  >
                    {Capitalize(item.status.replaceAll("_", " "))}
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
              ></Text>
            </Pressable>
          )}
          // 👇 INFINITE SCROLL (MAIN)
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.3}
          // 👇 LOADER
          ListFooterComponent={
            isFetchingNextPage ? (
              <View
                style={{
                  marginTop: 10,
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
          ListEmptyComponent={
            isLoading ? (
              <FlatList
                data={Array(3).fill(1)}
                keyExtractor={(item, index) => index}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 30,
                      gap: 30,
                      paddingLeft: 20,
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
                      <Skeleton
                        colorMode="light"
                        height={40}
                        width={40}
                        radius={100}
                      />
                      <View>
                        <Skeleton
                          colorMode="light"
                          height={15}
                          width={100}
                          radius={3}
                        />
                        <View
                          style={{
                            marginTop: 10,
                          }}
                        >
                          <Skeleton
                            colorMode="light"
                            height={10}
                            width={180}
                            radius={3}
                          />
                        </View>
                      </View>
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "Outfit",
                        color: "#8C8C8C",
                        textAlign: "right",
                      }}
                    ></Text>
                  </View>
                )}
                contentContainerStyle={{
                  padding: 0,
                }}
              />
            ) : (
              <NoDataFound text="No Conversation Found" />
            )
          }
        />
      </View>
    </SafeAreaView>
  );
}
