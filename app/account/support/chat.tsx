import { appService } from "@/api/appService";
import ScalingDots from "@/components/scaling-dots";
import { WEBSOCKET_URL } from "@/constants/app";
import { useGradualAnimation } from "@/hooks/use-gradual-animation";
import { arrowLeft } from "@/icons";
import { Capitalize } from "@/utils/helper";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Skeleton } from "moti/skeleton";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, SvgXml } from "react-native-svg";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";

export default function Chat() {
  const app = useSelector((state: any) => state.app);
  const user = app.user;

  const { ticket_id } = useLocalSearchParams<{
    ticket_id: any;
  }>();

  const router = useRouter();

  const [roomId, setRoomId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [ticketId, setTicketId] = useState(
    ticket_id && ticket_id != "null" ? ticket_id : null,
  );

  const [categories, setCategories] = useState(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["getTicketMessages", ticket_id],
      queryFn: ({ pageParam = 1 }) => {
        console.log("ticket_id 1", ticket_id);

        return appService.getTicketMessages(ticket_id, pageParam);
      },
      getNextPageParam: (lastPage) => {
        if (!lastPage.next_page_url) return undefined;

        const url = new URL(lastPage.next_page_url);
        let nextPage = Number(url.searchParams.get("page"));
        return nextPage;
      },
      enabled: !!ticket_id,
    });

  // console.log("data", data);

  const messages = data?.pages.flatMap((page) => page.data) ?? [];

  const queryClient = useQueryClient();

  // const appendMessage = (newMessage) => {
  //   queryClient.setQueryData(["getTicketMessages", ticket_id], (oldData) => {
  //     console.log("old", oldData);

  //     if (!oldData) {
  //       console.log("no old data found");
  //       queryClient.invalidateQueries({
  //         queryKey: ["getTicketMessages", ticket_id],
  //       });
  //       return oldData;
  //     }

  //     console.log("PAGES DEBUG:", oldData.pages, newMessage);

  //     return {
  //       ...oldData,
  //       pages: oldData.pages.map((page, i) => {
  //         console.log("PAGE", i, page);

  //         return {
  //           ...page,
  //           data: Array.isArray(page.data)
  //             ? [newMessage, ...page.data]
  //             : [newMessage], // 👈 fallback
  //         };
  //       }),
  //     };
  //   });
  // };

  const appendMessage = (newMessage) => {
    queryClient.setQueryData(["getTicketMessages", ticket_id], (oldData) => {
      console.log("old", oldData);

      // ✅ If no data yet, initialize it properly
      if (!oldData) {
        return {
          pages: [
            {
              data: [newMessage],
            },
          ],
          pageParams: [],
        };
      }

      // ✅ If structure exists but pages missing
      if (!oldData.pages || oldData.pages.length === 0) {
        return {
          ...oldData,
          pages: [
            {
              data: [newMessage],
            },
          ],
        };
      }

      // ✅ Normal case
      return {
        ...oldData,
        pages: oldData.pages.map((page, i) => ({
          ...page,
          data: Array.isArray(page.data)
            ? [newMessage, ...page.data]
            : [newMessage],
        })),
      };
    });
  };

  const fetchCategories = async () => {
    const res = await appService.getTicketCategories();
    // console.log("categories", res.data);
    setCategories(res.data);
  };

  useEffect(() => {
    if (ticketId) {
      setRoomId("ticket_" + ticketId);
    } else {
      fetchCategories();
    }
  }, [, ticketId]);
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
      <View
        style={{
          flex: 1,
          width: "100%",
        }}
      >
        {!ticketId ? (
          <>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <Svg width="68" height="1" viewBox="0 0 68 1" fill="none">
                <Path d="M0 0.5H68" stroke="#DBDBDB" />
              </Svg>
              <Text
                style={{
                  color: "#B0B0B0",
                  fontFamily: "Outfit",
                  fontSize: 14,
                }}
              >
                New Message
              </Text>
              <Svg width="68" height="1" viewBox="0 0 68 1" fill="none">
                <Path d="M0 0.5H68" stroke="#DBDBDB" />
              </Svg>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                marginTop: 20,
                maxWidth: "80%",
                paddingHorizontal: 20,
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
                      Select from the options below the subject of your message
                      and we will reply you ASAP.
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      gap: 10,
                      marginBottom: 5,
                    }}
                  >
                    {categories
                      ? categories.map((item, key) => (
                          <Tag
                            key={key}
                            user={user}
                            item={item}
                            setTicketId={setTicketId}
                          />
                        ))
                      : Array(4)
                          .fill(1)
                          .map((item, key) => (
                            <Skeleton
                              key={key}
                              colorMode="light"
                              height={30}
                              width={120}
                              radius={8}
                            />
                          ))}
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
                  {format(new Date(), "h:mm a").toLowerCase()}
                </Text>
              </View>
            </View>
          </>
        ) : isLoading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
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
        ) : (
          <ChatInterface
            messages={messages}
            appendMessage={appendMessage}
            roomId={roomId}
            user={user}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const ChatInterface = ({
  messages,
  appendMessage,
  roomId,
  user,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}) => {
  const { height } = useGradualAnimation();

  const socketRef = useRef(null);
  const scrollViewRef = useRef(null);
  const inputRef = useRef(null);

  const [text, setText] = useState("");
  const [showInput, setShowInput] = useState(true);

  const keyboardPadding = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  }, []);

  // console.log("grouped messages", messages);

  useEffect(() => {
    if (!roomId) return;

    const socket = new WebSocket(WEBSOCKET_URL);

    socket.onopen = () => {
      console.log("Connected to WebSocket server");

      socket.send(
        JSON.stringify({
          type: "init",
          user: {
            id: user?.id,
            name: user?.name,
            email: user?.email,
          },
          roomId,
        }),
      );
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("message", data, data.type);

      if (["messaged", "newMessage"].includes(data.type)) {
        appendMessage(data.data.data);
      }
    };

    socket.onerror = (error) => {
      console.log("WebSocket error:", error.message);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
      setShowInput(false);
    };

    socketRef.current = socket;

    return () => {
      socket.close();
    };
  }, [roomId]);

  const sendMessage = () => {
    if (!text || text == "") return;

    setText("");
    // inputRef.current?.blur();

    socketRef.current?.send(
      JSON.stringify({
        type: "message",
        user: {
          id: user?.id,
          name: user?.name,
          email: user?.email,
        },
        roomId,
        message: text,
      }),
    );
  };

  useEffect(() => {
    // scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F5F5F5",
      }}
    >
      {messages.length ? (
        <>
          <FlatList
            data={messages}
            inverted
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingVertical: 25,
              backgroundColor: "#F5F5F5",
            }}
            renderItem={({ item, index }) => {
              const from_id = item.from_id;
              const nextItem = messages[index + 1];

              const currentDate = new Date(item.created_at);
              const currentTime = format(currentDate, "h:mm a");

              let showTime = false;
              let senderChanged = true;

              if (!nextItem) {
                showTime = true;
              } else {
                const nextDate = new Date(nextItem.created_at);
                const nextTime = format(nextDate, "h:mm a");

                const minuteChanged = currentTime !== nextTime;
                const senderChangedLocal = item.from_id !== nextItem.from_id;

                const timeDiff =
                  (nextDate.getTime() - currentDate.getTime()) / 1000;

                const largeGap = timeDiff > 300;

                showTime = minuteChanged || senderChangedLocal || largeGap;
                senderChanged = senderChangedLocal;
              }

              return (
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    marginTop: !showTime ? 20 : 10,
                    alignSelf:
                      from_id != String(user?.id) ? "flex-start" : "flex-end",
                  }}
                >
                  {from_id != user?.id && (
                    <View
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 100,
                        backgroundColor: "#100152",
                        justifyContent: "center",
                        alignItems: "center",
                        opacity: senderChanged ? 1 : 0,
                      }}
                    >
                      <Image
                        source={require("@/assets/images/logo/white-icon.png")}
                        style={{ width: 11, height: 15 }}
                      />
                    </View>
                  )}

                  <View>
                    <View
                      style={[
                        {
                          borderWidth: 1,
                          borderColor:
                            from_id == String(user?.id) ? "#0A1ED9" : "#EAEAEA",
                          backgroundColor:
                            from_id == String(user?.id) ? "#E7E9FB" : "#EAEAEA",
                          padding: 16,
                          borderRadius: 16,
                        },
                        from_id == String(user?.id)
                          ? { borderTopRightRadius: 0 }
                          : { borderTopLeftRadius: 0 },
                      ]}
                    >
                      <Text
                        style={{
                          color: "#696969",
                          fontFamily: "Poppins",
                          fontSize: 14,
                        }}
                      >
                        {item.message}
                      </Text>
                    </View>

                    {showTime && (
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#717171",
                          marginTop: 6,
                          textAlign: from_id != user?.id ? "left" : "right",
                        }}
                      >
                        {currentTime}
                      </Text>
                    )}
                  </View>
                </View>
              );
            }}
            // 👇 LOAD OLDER MESSAGES (scroll up)
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }}
            onEndReachedThreshold={0.2}
            // 👇 Loader when fetching older messages
            ListFooterComponent={
              isFetchingNextPage ? (
                <View style={{ marginVertical: 10 }}>
                  <ScalingDots dotCount={3} dotSize={8} dotColor="#999" />
                </View>
              ) : null
            }
          />
        </>
      ) : (
        // <ScrollView
        //   style={{
        //     flex: 1,
        //     backgroundColor: "#F5F5F5",
        //     paddingHorizontal: 20,
        //   }}
        //   ref={scrollViewRef}
        //   onLayout={() =>
        //     scrollViewRef.current?.scrollToEnd({ animated: false })
        //   }
        //   onContentSizeChange={() =>
        //     scrollViewRef.current?.scrollToEnd({ animated: true })
        //   }
        // >
        //   <View
        //     style={{
        //       gap: 8,
        //       paddingVertical: 25,
        //     }}
        //   >
        //     {messages.map((item, key) => {
        //       const from_id = item.from_id;

        //       const currentDate = new Date(item.created_at);
        //       const nextItem = messages[key + 1];

        //       const currentTime = format(currentDate, "h:mm a");

        //       let showTime = false;
        //       let senderChanged = true;

        //       if (!nextItem) {
        //         // Last message in the list
        //         showTime = true;
        //       } else {
        //         const nextDate = new Date(nextItem.created_at);
        //         const nextTime = format(nextDate, "h:mm a");

        //         const minuteChanged = currentTime !== nextTime;

        //         const senderChanged = item.from_id !== nextItem.from_id;

        //         const timeDiff =
        //           (nextDate.getTime() - currentDate.getTime()) / 1000;

        //         const largeGap = timeDiff > 300; // 5 mins

        //         showTime = minuteChanged || senderChanged || largeGap;
        //       }
        //       return (
        //         <View
        //           key={key}
        //           style={{
        //             flexDirection: "row",
        //             gap: 10,
        //             marginTop: !showTime ? 20 : 0,
        //             alignSelf:
        //               from_id != String(user?.id) ? "flex-start" : "flex-end",
        //           }}
        //         >
        //           {from_id != user?.id && senderChanged && (
        //             <View
        //               style={{
        //                 width: 32,
        //                 height: 32,
        //                 borderRadius: "100%",
        //                 backgroundColor: "#100152",
        //                 padding: 2,
        //                 justifyContent: "center",
        //                 alignItems: "center",
        //               }}
        //             >
        //               <Image
        //                 source={require("@/assets/images/logo/white-icon.png")}
        //                 style={{
        //                   width: 11,
        //                   height: 15,
        //                 }}
        //               />
        //             </View>
        //           )}

        //           <View>
        //             <View
        //               style={{
        //                 gap: 0,
        //               }}
        //             >
        //               <View
        //                 style={[
        //                   {
        //                     borderWidth: 1,
        //                     borderColor:
        //                       from_id == String(user?.id)
        //                         ? "#0A1ED9"
        //                         : "#EAEAEA",
        //                     backgroundColor:
        //                       from_id == String(user?.id)
        //                         ? "#E7E9FB"
        //                         : "#EAEAEA",
        //                     padding: 16,
        //                     alignSelf:
        //                       from_id == String(user?.id)
        //                         ? "flex-end"
        //                         : "flex-start",
        //                     borderRadius: 16,
        //                   },
        //                   from_id == String(user?.id)
        //                     ? { borderTopRightRadius: 0 }
        //                     : { borderTopLeftRadius: 0 },
        //                 ]}
        //               >
        //                 <Text
        //                   style={{
        //                     color: "#696969",
        //                     fontFamily: "Poppins",
        //                     fontSize: 14,
        //                   }}
        //                 >
        //                   {item.message}
        //                 </Text>
        //               </View>
        //             </View>
        //             {showTime && (
        //               <Text
        //                 style={{
        //                   fontSize: 12,
        //                   color: "#717171",
        //                   fontFamily: "Poppins",
        //                   textAlign: "right",
        //                   marginTop: 6,
        //                 }}
        //               >
        //                 {currentTime}
        //               </Text>
        //             )}
        //           </View>
        //         </View>
        //       );
        //     })}
        //   </View>
        // </ScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F5F5F5",
          }}
        >
          <Text
            style={{
              color: "#999",
              fontFamily: "HostGroteskBold",
              fontSize: 14,
              textAlign: "center",
            }}
          >
            Send a message to start a conversation
          </Text>
        </View>
      )}
      {showInput ? (
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            backgroundColor: "#F7F7F7",
            alignItems: "flex-start",
            paddingVertical: 20,
          }}
        >
          <Pressable
            onPress={() => {}}
            hitSlop={40}
            style={{
              height: 40,
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
              alignItems: "flex-end",
            }}
          >
            <TextInput
              style={{
                color: "#000000",
                fontFamily: "Poppins",
                fontSize: 14,
                flex: 1,
              }}
              cursorColor={"#999"}
              ref={inputRef}
              multiline={true}
              numberOfLines={4}
              placeholder="Type your message"
              value={text}
              placeholderTextColor="#D0D0D0"
              onChangeText={setText}
              textAlignVertical="top"
            />
          </View>
          <Pressable
            hitSlop={40}
            style={{
              height: 40,
              width: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={sendMessage}
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
      ) : (
        <></>
      )}

      <Animated.View style={keyboardPadding} />
    </View>
  );
};

const Tag = ({
  item,
  setTicketId,
  user,
}: {
  item: any;
  setTicketId: any;
  user: any;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    try {
      setIsLoading(true);

      const formData = new FormData();

      formData.set("support_category_id", item?.id);
      formData.set("title", item?.name);
      formData.set("body", item?.name);
      formData.set("priority", "high");
      formData.set("user_id", user?.id);
      formData.set("channel", "rider");

      console.log("payload", JSON.stringify(formData));

      const res = await appService.createTicket(formData);

      console.log("ticket", res.data);

      setTicketId(res.data.id);
    } catch (error: any) {
      console.log(error);

      Toast.show({
        type: "error",
        text1: "Failed",
        text2:
          (error.errors !== undefined && error.errors[0]
            ? error.errors[0]
            : error.message) || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Pressable
      onPress={isLoading ? () => {} : sendMessage}
      style={{
        paddingHorizontal: 12,
        paddingVertical: 5,
        backgroundColor: "#E3EBFF",
        borderRadius: 8,
        borderWidth: 0.8,
        borderColor: "#2C1A90",
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontFamily: "HostGroteskBold",
          color: "#100152",
          fontSize: 12,
        }}
      >
        {Capitalize(item.name)}
      </Text>
      {isLoading && <ActivityIndicator size="small" color="#100152" />}
    </Pressable>
  );
};
