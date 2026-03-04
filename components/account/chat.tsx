import { arrowLeft } from "@/icons";
import { useEffect, useRef, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import Svg, { Path, SvgXml } from "react-native-svg";

import ProfilePicture from "@/assets/images/account/profile-picture.png";

export const Chat = ({
  rider,
  user,
  visible,
  setVisible,
  data,
  roomId,
}: {
  rider: any;
  user: any;
  visible: boolean;
  setVisible: any;
  data: any;
  roomId: string;
}) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState(data);

  // console.log("m", messages);

  const role = user.roles[0].name;

  const socketRef = useRef(null);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket("wss://socket.aibenmart.com/ws");

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
      socket.send(
        JSON.stringify({
          type: "init",
          user: rider,
          roomId,
        }),
      );
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("data", data);

      if (["messaged", "newMessage"].includes(data.type)) {
        setMessages((prev) => [...prev, data.data.data]);
      }
    };

    socket.onerror = (error) => {
      console.log("WebSocket error:", error.message);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    socketRef.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (!text || text == "") return;

    socketRef.current?.send(
      JSON.stringify({
        type: "message",
        user: rider,
        roomId,
        message: text,
      }),
    );

    setText("");
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);
  return (
    <Modal
      animationType="slide" // "none" | "slide" | "fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: "50%",
            width: "100%",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              flexDirection: "row",
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              padding: 20,
              paddingVertical: 18,
              gap: 30,
            }}
          >
            <Pressable
              onPress={() => setVisible(false)}
              hitSlop={40}
              style={{
                height: 40,
                width: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SvgXml xml={arrowLeft("#000000")} width={21} height={16} />
            </Pressable>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
              }}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "100%",
                  backgroundColor: "#A380FF",
                  padding: 2,
                }}
              >
                <Image
                  source={
                    user?.picture && user?.picture != "null"
                      ? { uri: user?.picture }
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
                    color: "#686868",
                    fontFamily: "HostGroteskBold",
                    fontSize: 13,
                    marginBottom: 3,
                  }}
                >
                  {role != "customer" ? "Packager" : "Custoner"}
                </Text>
                <Text
                  style={{
                    color: "#000000",
                    fontFamily: "HostGroteskBold",
                    fontSize: 14,
                    marginBottom: 3,
                  }}
                >
                  {user.name}
                </Text>
              </View>
            </View>
          </View>
          <ScrollView
            style={{
              flex: 1,
              backgroundColor: "#F5F5F5",
            }}
            ref={scrollViewRef}
            onLayout={() =>
              scrollViewRef.current?.scrollToEnd({ animated: false })
            }
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({ animated: true })
            }
          >
            <View
              style={{
                gap: 8,
                padding: 25,
              }}
            >
              {messages.map((item, key) =>
                item.from_id != rider.id ? (
                  <View
                    key={key}
                    style={{
                      padding: 10,
                      backgroundColor: "rgba(255, 218, 173, 0.6)",
                      alignSelf: "flex-start",
                      maxWidth: "80%",
                      borderRadius: 20,
                      borderTopLeftRadius: 0,
                    }}
                  >
                    <Text
                      style={{
                        color: "#4B4B4B",
                        fontFamily: "Outfit",
                        fontSize: 16,
                      }}
                    >
                      {item.message}
                    </Text>
                  </View>
                ) : (
                  <View
                    key={key}
                    style={{
                      padding: 10,
                      backgroundColor: "#FFFFFF",
                      alignSelf: "flex-end",
                      maxWidth: "80%",
                      borderRadius: 20,
                      borderTopRightRadius: 0,
                    }}
                  >
                    <Text
                      style={{
                        color: "#4B4B4B",
                        fontFamily: "Outfit",
                        fontSize: 16,
                      }}
                    >
                      {item.message}
                    </Text>
                  </View>
                ),
              )}
            </View>
          </ScrollView>
          <View
            style={{
              backgroundColor: "#fff",
              width: "100%",
              paddingBottom: 30,
              paddingTop: 15,
              paddingHorizontal: 20,
            }}
          >
            <View
              style={{
                backgroundColor: "#F5F5F5",
                flexDirection: "row",
                padding: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
                gap: 10,
              }}
            >
              <TextInput
                style={{
                  color: "#000000",
                  fontFamily: "Outfit",
                  fontSize: 16,
                  flex: 1,
                }}
                multiline={true}
                numberOfLines={4}
                placeholder="Type your message..."
                value={text}
                onChangeText={setText}
                textAlignVertical="top"
              />
              <Pressable
                hitSlop={40}
                onPress={sendMessage}
                style={{
                  marginTop: 10,
                }}
              >
                <Svg width="30" height="25" viewBox="0 0 30 25" fill="none">
                  <Path
                    d="M27.5437 1.65938C29.0787 1.75947 29.8181 3.58856 28.7838 4.72722L11.5363 23.6959C10.4167 24.9258 8.36891 24.1532 8.34129 22.491L8.17019 12.4317L15.712 9.38208C15.9657 9.26897 16.1655 9.0618 16.2695 8.80423C16.3735 8.54665 16.3734 8.25878 16.2693 8.00126C16.1652 7.74374 15.9652 7.53667 15.7115 7.42369C15.4577 7.31071 15.17 7.30063 14.909 7.39557L7.36645 10.4433L0.499324 3.09069C-0.635309 1.87488 0.301175 -0.101801 1.95954 0.00403475L27.5437 1.65938Z"
                    fill="black"
                  />
                </Svg>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
