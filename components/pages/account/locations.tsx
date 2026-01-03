import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import CustomSwitch from "@/components/account/custom-switch";
import { GlowBG } from "@/components/account/glow-bg";
import { arrowLeft } from "@/icons";
import { router } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Path, SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

const options = [
  {
    text: "Home",
    heading: "123 Main St, Ikoyi, Lagos",
  },
  {
    text: "Work",
    heading: "456 Business Ave, Victoria Island, Lagos",
  },
  {
    text: "Parents",
    heading: "789 Family Rd, Lekki Phase 1, Lagos",
  },
];

export default function LocationsComponent() {
  const app = useSelector((state: any) => state.app);
  const [search, setSearch] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <GlowBG />
      <Delete
        setVisible={setOpenDelete}
        done={done}
        setDone={setDone}
        visible={openDelete}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          backgroundColor: "#fff",
          width: "100%",
          paddingVertical: 30,
          paddingHorizontal: 15,
          zIndex: 1000,
        }}
      >
        <Pressable
          onPress={() =>
            router.push("/account/marketplace/account/add-location")
          }
          style={{
            width: "100%",
            backgroundColor: "#100152",
            paddingVertical: 20,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontFamily: "HostGroteskBold",
              fontSize: 16,
            }}
          >
            ADD NEW ADDRESS
          </Text>
        </Pressable>
      </View>
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
              Location
            </Text>
            <Pressable
              style={{
                width: 70,
                height: 70,
                borderRadius: 100,
                backgroundColor: "#FFF7ED",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {}}
            >
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M10.115 21.811C10.721 22.311 11.353 22.768 12 23.214C12.6484 22.7739 13.2773 22.3058 13.885 21.811C14.898 20.9792 15.8513 20.0773 16.738 19.112C18.782 16.877 21 13.637 21 10C21 8.8181 20.7672 7.64778 20.3149 6.55585C19.8626 5.46392 19.1997 4.47177 18.364 3.63604C17.5282 2.80031 16.5361 2.13738 15.4442 1.68508C14.3522 1.23279 13.1819 1 12 1C10.8181 1 9.64778 1.23279 8.55585 1.68508C7.46392 2.13738 6.47177 2.80031 5.63604 3.63604C4.80031 4.47177 4.13738 5.46392 3.68508 6.55585C3.23279 7.64778 3 8.8181 3 10C3 13.637 5.218 16.876 7.262 19.112C8.14862 20.0777 9.10196 20.9789 10.115 21.811ZM12 13.25C11.138 13.25 10.3114 12.9076 9.7019 12.2981C9.09241 11.6886 8.75 10.862 8.75 10C8.75 9.13805 9.09241 8.3114 9.7019 7.7019C10.3114 7.09241 11.138 6.75 12 6.75C12.862 6.75 13.6886 7.09241 14.2981 7.7019C14.9076 8.3114 15.25 9.13805 15.25 10C15.25 10.862 14.9076 11.6886 14.2981 12.2981C13.6886 12.9076 12.862 13.25 12 13.25Z"
                  fill="black"
                />
              </Svg>
            </Pressable>
          </View>
          <View
            style={{
              backgroundColor: "#ffffff",
              marginTop: 15,
              flexDirection: "row",
              gap: 20,
              borderRadius: 10,
              padding: 12,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: "HostGroteskBold",
                  fontSize: 16,
                  color: "#2A2A2A",
                }}
              >
                Use current location for delivery
              </Text>
              <Text
                style={{
                  fontFamily: "HostGrotesk",
                  fontSize: 13,
                  color: "#7E7E7E",
                }}
              >
                Automatically detects your delivery address.
              </Text>
            </View>
            <CustomSwitch />
          </View>
          <View
            style={{
              marginTop: 50,
            }}
          >
            <Text
              style={{
                fontFamily: "HostGroteskBold",
                fontSize: 18,
              }}
            >
              Saved Addresses
            </Text>
            <View
              style={{
                paddingHorizontal: 0,
                marginTop: 15,
              }}
            >
              {options.map((item, key) => (
                <View
                  key={key}
                  style={[
                    {
                      flexDirection: "row",
                      gap: 20,
                      backgroundColor: "#ffffff",
                      paddingVertical: 20,
                      paddingHorizontal: 15,
                      justifyContent: "space-between",
                      alignItems: "center",
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
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "HostGroteskBold",
                        marginBottom: 5,
                      }}
                    >
                      {item.text}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: "HostGrotesk",
                        color: "#7E7E7E",
                      }}
                    >
                      {item.heading}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                    }}
                  >
                    <Pressable
                      onPress={() =>
                        router.push("/account/marketplace/account/add-location")
                      }
                    >
                      <Svg
                        width="14"
                        height="16"
                        viewBox="0 0 14 16"
                        fill="none"
                      >
                        <Path
                          d="M12.7009 0.513281C12.1111 -0.171094 11.1577 -0.171094 10.5679 0.513281L9.75729 1.45078L12.3939 4.51016L13.2045 3.56953C13.7943 2.88516 13.7943 1.77891 13.2045 1.09453L12.7009 0.513281ZM4.643 7.38828C4.47871 7.57891 4.35214 7.81328 4.27942 8.07266L3.48225 10.8477C3.40415 11.1164 3.46609 11.4133 3.63845 11.6164C3.81081 11.8195 4.06666 11.8883 4.30097 11.7977L6.69249 10.8727C6.91332 10.7883 7.11531 10.6414 7.28229 10.4508L11.7879 5.21953L9.14864 2.15703L4.643 7.38828ZM2.58543 1.83516C1.15806 1.83516 0 3.17891 0 4.83516V12.8352C0 14.4914 1.15806 15.8352 2.58543 15.8352H9.4799C10.9073 15.8352 12.0653 14.4914 12.0653 12.8352V9.83516C12.0653 9.28203 11.6802 8.83516 11.2035 8.83516C10.7268 8.83516 10.3417 9.28203 10.3417 9.83516V12.8352C10.3417 13.3883 9.95659 13.8352 9.4799 13.8352H2.58543C2.10874 13.8352 1.72362 13.3883 1.72362 12.8352V4.83516C1.72362 4.28203 2.10874 3.83516 2.58543 3.83516H5.17085C5.64754 3.83516 6.03266 3.38828 6.03266 2.83516C6.03266 2.28203 5.64754 1.83516 5.17085 1.83516H2.58543Z"
                          fill="#7E7E7E"
                        />
                      </Svg>
                    </Pressable>
                    <Pressable onPress={() => setOpenDelete(true)}>
                      <Svg
                        width="14"
                        height="19"
                        viewBox="0 0 14 19"
                        fill="none"
                      >
                        <Path
                          d="M4.16131 0.632143C4.32751 0.242857 4.66916 0 5.04158 0H8.74736C9.11979 0 9.46143 0.242857 9.62764 0.632143L9.84925 1.14286H12.804C13.3488 1.14286 13.7889 1.65357 13.7889 2.28571C13.7889 2.91786 13.3488 3.42857 12.804 3.42857H0.984925C0.440138 3.42857 0 2.91786 0 2.28571C0 1.65357 0.440138 1.14286 0.984925 1.14286H3.9397L4.16131 0.632143ZM0.984925 4.57143H12.804V16C12.804 17.2607 11.9207 18.2857 10.8342 18.2857H2.95477C1.86828 18.2857 0.984925 17.2607 0.984925 16V4.57143ZM3.9397 6.85714C3.66884 6.85714 3.44724 7.11429 3.44724 7.42857V15.4286C3.44724 15.7429 3.66884 16 3.9397 16C4.21055 16 4.43216 15.7429 4.43216 15.4286V7.42857C4.43216 7.11429 4.21055 6.85714 3.9397 6.85714ZM6.89447 6.85714C6.62362 6.85714 6.40201 7.11429 6.40201 7.42857V15.4286C6.40201 15.7429 6.62362 16 6.89447 16C7.16533 16 7.38693 15.7429 7.38693 15.4286V7.42857C7.38693 7.11429 7.16533 6.85714 6.89447 6.85714ZM9.84925 6.85714C9.57839 6.85714 9.35678 7.11429 9.35678 7.42857V15.4286C9.35678 15.7429 9.57839 16 9.84925 16C10.1201 16 10.3417 15.7429 10.3417 15.4286V7.42857C10.3417 7.11429 10.1201 6.85714 9.84925 6.85714Z"
                          fill="#7E7E7E"
                        />
                      </Svg>
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const Delete = ({
  visible,
  setVisible,
  done,
  setDone,
}: {
  visible: boolean;
  setVisible: any;
  done: boolean;
  setDone: any;
}) => {
  const [text, setText] = useState("");
  return (
    <Modal
      animationType="fade" // "none" | "slide" | "fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {done ? <SuccessModal /> : <DeleteModal setDone={setDone} />}
      </View>
    </Modal>
  );
};

const DeleteModal = ({ setDone }) => {
  const [text, setText] = useState("");
  return (
    <View
      style={{
        backgroundColor: "#fff",
        width: "70%",
        borderRadius: 30,
        padding: 30,
        gap: 30,
        alignItems: "center",
      }}
    >
      <Svg width="78" height="78" viewBox="0 0 78 78" fill="none">
        <Circle
          opacity="0.6"
          cx="38.8433"
          cy="38.8433"
          r="38.8433"
          fill="#FF7979"
        />
        <Circle
          opacity="0.6"
          cx="38.8431"
          cy="38.8432"
          r="31.7161"
          fill="#FF7979"
        />
        <Circle cx="38.8428" cy="38.8433" r="24.5889" fill="#FF7979" />
        <Path
          d="M35.0262 28.5594C35.2207 28.1038 35.6205 27.8196 36.0563 27.8196H40.3931C40.829 27.8196 41.2288 28.1038 41.4233 28.5594L41.6827 29.157H45.1406C45.7781 29.157 46.2932 29.7547 46.2932 30.4945C46.2932 31.2343 45.7781 31.832 45.1406 31.832H31.3089C30.6713 31.832 30.1562 31.2343 30.1562 30.4945C30.1562 29.7547 30.6713 29.157 31.3089 29.157H34.7668L35.0262 28.5594ZM31.3089 33.1694H45.1406V46.5441C45.1406 48.0195 44.1068 49.219 42.8353 49.219H33.6142C32.3427 49.219 31.3089 48.0195 31.3089 46.5441V33.1694ZM34.7668 35.8444C34.4498 35.8444 34.1905 36.1453 34.1905 36.5131V45.8754C34.1905 46.2432 34.4498 46.5441 34.7668 46.5441C35.0838 46.5441 35.3431 46.2432 35.3431 45.8754V36.5131C35.3431 36.1453 35.0838 35.8444 34.7668 35.8444ZM38.2247 35.8444C37.9078 35.8444 37.6484 36.1453 37.6484 36.5131V45.8754C37.6484 46.2432 37.9078 46.5441 38.2247 46.5441C38.5417 46.5441 38.8011 46.2432 38.8011 45.8754V36.5131C38.8011 36.1453 38.5417 35.8444 38.2247 35.8444ZM41.6827 35.8444C41.3657 35.8444 41.1063 36.1453 41.1063 36.5131V45.8754C41.1063 46.2432 41.3657 46.5441 41.6827 46.5441C41.9996 46.5441 42.259 46.2432 42.259 45.8754V36.5131C42.259 36.1453 41.9996 35.8444 41.6827 35.8444Z"
          fill="#A40000"
        />
      </Svg>
      <View>
        <Text
          style={{
            color: "#000000",
            fontFamily: "HostGroteskBold",
            fontSize: 18,
            marginBottom: 3,
            textAlign: "center",
          }}
        >
          Delete Address
        </Text>
        <Text
          style={{
            color: "#000000",
            fontFamily: "HostGroteskBold",
            fontSize: 12,
            marginBottom: 3,
            textAlign: "center",
          }}
        >
          You are about to delete your home address. Do you want to proceed?
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: 20,
          gap: 20,
          width: "100%",
        }}
      >
        <Pressable
          onPress={() => setVisible(false)}
          style={{
            width: "100%",
            backgroundColor: "#F5F5F5",
            paddingVertical: 18,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: "#000000",
              textAlign: "center",
              fontFamily: "HostGroteskBold",
              fontSize: 12,
            }}
          >
            CANCEL
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setDone(true)}
          style={{
            width: "100%",
            backgroundColor: "#100152",
            paddingVertical: 18,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontFamily: "HostGroteskBold",
              fontSize: 12,
            }}
          >
            DELETE
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const SuccessModal = () => {
  const [text, setText] = useState("");
  return (
    <View
      style={{
        backgroundColor: "#fff",
        width: "70%",
        borderRadius: 30,
        padding: 30,
        gap: 30,
        alignItems: "center",
      }}
    >
      <Svg width="103" height="103" viewBox="0 0 103 103" fill="none">
        <Circle cx="51.5" cy="51.5" r="51.5" fill="#E6F5E0" />
        <Path
          d="M31.3679 48.1029L41.6165 65.4476L76.0661 41.7638"
          stroke="#229D27"
          stroke-width="5.42609"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>

      <Text
        style={{
          color: "#000000",
          fontFamily: "HostGroteskBold",
          fontSize: 24,
          marginBottom: 3,
          textAlign: "center",
        }}
      >
        Successfully Deleted
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: "HostGrotesk",
  },
  input: {
    backgroundColor: "rgba(237, 237, 237, 1)",
    paddingVertical: 20,
    paddingHorizontal: 14,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: "rgba(227, 227, 227, 1)",
    marginTop: 8,
    fontFamily: "HostGrotesk",
  },
});
