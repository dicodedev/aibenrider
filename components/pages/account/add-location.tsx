import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import CustomSwitch from "@/components/account/custom-switch";
import { GlowBG } from "@/components/account/glow-bg";
import { InputError } from "@/components/input-error";
import { arrowLeft } from "@/icons";
import { router } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

import MapView, { Marker } from "react-native-maps";

const options = ["Home", "Work", "Others"];

export default function AddLocationComponent() {
  const app = useSelector((state: any) => state.app);
  const [search, setSearch] = useState("");

  return (
    <View style={{ flex: 1 }}>
      <GlowBG />
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
                Address Label
              </Text>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  gap: 30,
                  width: "100%",
                }}
              >
                {options.map((item, key) => (
                  <View
                    key={key}
                    style={{
                      backgroundColor: key ? "#EAEAEA" : "#100152",
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      borderRadius: 12,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "HostGrotesk",
                        fontSize: 14,
                        color: key ? "#000000" : "#ffffff",
                      }}
                    >
                      {item}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "#ffffff",
              marginTop: 15,
              flexDirection: "row",
              gap: 20,
              borderRadius: 10,
              padding: 12,
            }}
          >
            <View
              style={{
                width: "100%",
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontFamily: "HostGroteskBold",
                  fontSize: 16,
                  color: "#2A2A2A",
                }}
              >
                Address Information
              </Text>
              <View
                style={{
                  marginTop: 10,
                  gap: 0,
                  width: "100%",
                  flex: 1,
                }}
              >
                <View style={styles.container}>
                  <View style={styles.labelContainer}>
                    <Text style={styles.label}>Street Address</Text>
                    <Text style={styles.important}>*</Text>
                  </View>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        height: 100,
                      },
                    ]}
                    selectionColor={"#808080"}
                    multiline={true}
                    numberOfLines={10}
                    autoCapitalize="none"
                    autoCorrect={false}
                    readOnly={false}
                    textAlignVertical="top"
                  />
                  <InputError message="Street address is required" />
                </View>
                <View style={styles.container}>
                  <View style={styles.labelContainer}>
                    <Text style={styles.label}>Apartment/Suite</Text>
                    <Text style={styles.important}></Text>
                  </View>
                  <TextInput
                    style={[styles.input]}
                    selectionColor={"#808080"}
                    autoCapitalize="none"
                    autoCorrect={false}
                    readOnly={false}
                    textAlignVertical="top"
                  />
                </View>
                <View style={styles.container}>
                  <View style={styles.labelContainer}>
                    <Text style={styles.label}>City</Text>
                    <Text style={styles.important}>*</Text>
                  </View>
                  <TextInput
                    style={[styles.input]}
                    selectionColor={"#808080"}
                    autoCapitalize="none"
                    autoCorrect={false}
                    readOnly={false}
                    textAlignVertical="top"
                  />
                </View>
                <View style={styles.container}>
                  <View style={styles.labelContainer}>
                    <Text style={styles.label}>State/Region</Text>
                    <Text style={styles.important}>*</Text>
                  </View>
                  <TextInput
                    style={[styles.input]}
                    selectionColor={"#808080"}
                    autoCapitalize="none"
                    autoCorrect={false}
                    readOnly={false}
                    textAlignVertical="top"
                  />
                </View>
                <View style={styles.container}>
                  <View style={styles.labelContainer}>
                    <Text style={styles.label}>Postal Code</Text>
                    <Text style={styles.important}>*</Text>
                  </View>
                  <TextInput
                    style={[styles.input]}
                    selectionColor={"#808080"}
                    autoCapitalize="none"
                    autoCorrect={false}
                    readOnly={false}
                    textAlignVertical="top"
                  />
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "#ffffff",
              marginTop: 15,
              flexDirection: "row",
              gap: 20,
              borderRadius: 24,
              padding: 15,
            }}
          >
            <View
              style={{
                width: "100%",
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontFamily: "HostGroteskBold",
                  fontSize: 16,
                  color: "#2A2A2A",
                }}
              >
                Pin Location on Map
              </Text>
              <View
                style={{
                  marginTop: 10,
                  gap: 0,
                  width: "100%",
                  flex: 1,
                }}
              >
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <View
                    style={{
                      height: 300,
                      width: "100%",
                      borderRadius: 12,
                      position: "relative",
                      marginBottom: 20,
                      overflow: "hidden",
                    }}
                  >
                    <MapView
                      style={{
                        flex: 1,
                        borderWidth: 1,
                      }}
                      initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                      }}
                    >
                      <Marker
                        coordinate={{
                          latitude: 37.78825,
                          longitude: -122.4324,
                        }}
                        pinColor="#100152"
                        title="Driver"
                      />
                    </MapView>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        paddingVertical: 16,
                        backgroundColor: "rgba(16, 1, 82, 1)",
                        borderBottomLeftRadius: 12,
                        borderBottomRightRadius: 12,
                      }}
                    >
                      <Svg
                        width="12"
                        height="11"
                        viewBox="0 0 12 11"
                        fill="none"
                      >
                        <Path
                          d="M5.81727 0C6.13999 0 6.43772 0.170452 6.60135 0.449994L11.5104 8.81353C11.6763 9.09534 11.6763 9.44307 11.5149 9.72488C11.3536 10.0067 11.0513 10.1817 10.7263 10.1817H0.908241C0.583245 10.1817 0.280976 10.0067 0.119614 9.72488C-0.0417474 9.44307 -0.0394747 9.09307 0.12416 8.81353L5.03319 0.449994C5.19682 0.170452 5.49455 0 5.81727 0ZM5.81727 2.90906C5.515 2.90906 5.27182 3.15223 5.27182 3.4545V5.99993C5.27182 6.3022 5.515 6.54537 5.81727 6.54537C6.11954 6.54537 6.36272 6.3022 6.36272 5.99993V3.4545C6.36272 3.15223 6.11954 2.90906 5.81727 2.90906ZM6.54454 7.9999C6.54454 7.80702 6.46791 7.62204 6.33152 7.48565C6.19514 7.34926 6.01015 7.27264 5.81727 7.27264C5.62439 7.27264 5.43941 7.34926 5.30302 7.48565C5.16663 7.62204 5.09001 7.80702 5.09001 7.9999C5.09001 8.19278 5.16663 8.37777 5.30302 8.51416C5.43941 8.65054 5.62439 8.72717 5.81727 8.72717C6.01015 8.72717 6.19514 8.65054 6.33152 8.51416C6.46791 8.37777 6.54454 8.19278 6.54454 7.9999Z"
                          fill="white"
                        />
                      </Svg>
                      <Text
                        style={{
                          fontFamily: "HostGrotesk",
                          fontSize: 12,
                          color: "rgba(255, 255, 255, 1)",
                        }}
                      >
                        Please pin your location on the map
                      </Text>
                    </View>
                  </View>
                </View>
                <Pressable
                  onPress={() =>
                    router.push("/account/marketplace/account/select-location")
                  }
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(159, 159, 159, 0.1)",
                    borderRadius: 12,
                    paddingVertical: 16,
                    borderWidth: 2,
                    borderColor: "rgba(220, 220, 220, 1)",
                  }}
                >
                  <Svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <Path
                      d="M6.26566 0C6.69887 0 7.04886 0.349996 7.04886 0.783207V1.03775C9.34219 1.37796 11.1534 3.19157 11.4936 5.48245H11.7481C12.1813 5.48245 12.5313 5.83245 12.5313 6.26566C12.5313 6.69887 12.1813 7.04886 11.7481 7.04886H11.4936C11.1534 9.34219 9.33975 11.1534 7.04886 11.4936V11.7481C7.04886 12.1813 6.69887 12.5313 6.26566 12.5313C5.83245 12.5313 5.48245 12.1813 5.48245 11.7481V11.4936C3.18912 11.1534 1.37796 9.34219 1.03775 7.04886H0.783207C0.349996 7.04886 0 6.69887 0 6.26566C0 5.83245 0.349996 5.48245 0.783207 5.48245H1.03775C1.37796 3.18912 3.18912 1.37796 5.48245 1.03775V0.783207C5.48245 0.349996 5.83245 0 6.26566 0ZM2.62864 7.04886C2.93458 8.47577 4.05799 9.59674 5.48245 9.90268V9.39849C5.48245 8.96527 5.83245 8.61528 6.26566 8.61528C6.69887 8.61528 7.04886 8.96527 7.04886 9.39849V9.90268C8.47577 9.59674 9.59674 8.47332 9.90268 7.04886H9.39849C8.96527 7.04886 8.61528 6.69887 8.61528 6.26566C8.61528 5.83245 8.96527 5.48245 9.39849 5.48245H9.90268C9.59674 4.05554 8.47577 2.93458 7.04886 2.62864V3.13283C7.04886 3.56604 6.69887 3.91604 6.26566 3.91604C5.83245 3.91604 5.48245 3.56604 5.48245 3.13283V2.62864C4.05554 2.93458 2.93458 4.05554 2.62864 5.48245H3.13283C3.56604 5.48245 3.91604 5.83245 3.91604 6.26566C3.91604 6.69887 3.56604 7.04886 3.13283 7.04886H2.62864ZM6.26566 5.48245C6.47338 5.48245 6.67259 5.56497 6.81947 5.71185C6.96635 5.85873 7.04886 6.05794 7.04886 6.26566C7.04886 6.47338 6.96635 6.67259 6.81947 6.81947C6.67259 6.96635 6.47338 7.04886 6.26566 7.04886C6.05794 7.04886 5.85873 6.96635 5.71185 6.81947C5.56497 6.67259 5.48245 6.47338 5.48245 6.26566C5.48245 6.05794 5.56497 5.85873 5.71185 5.71185C5.85873 5.56497 6.05794 5.48245 6.26566 5.48245Z"
                      fill="#100152"
                    />
                  </Svg>

                  <Text
                    style={{
                      fontFamily: "HostGrotesk",
                      fontSize: 13,
                      color: "rgba(16, 1, 82, 1)",
                    }}
                  >
                    Adjust Location
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "#ffffff",
              marginTop: 15,
              flexDirection: "row",
              gap: 20,
              borderRadius: 10,
              padding: 12,
            }}
          >
            <View
              style={{
                width: "100%",
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontFamily: "HostGroteskBold",
                  fontSize: 16,
                  color: "#2A2A2A",
                }}
              >
                Delivery Instructions (Optional)
              </Text>
              <View
                style={{
                  marginTop: 10,
                  gap: 0,
                  width: "100%",
                  flex: 1,
                }}
              >
                <View style={styles.container}>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        height: 100,
                        borderColor: "rgba(10, 10, 10, 0.6)",
                      },
                    ]}
                    selectionColor={"#808080"}
                    multiline={true}
                    numberOfLines={10}
                    autoCapitalize="none"
                    autoCorrect={false}
                    readOnly={false}
                    textAlignVertical="top"
                  />
                </View>
              </View>
            </View>
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
              marginBottom: 150,
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
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flex: 1,
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontFamily: "HostGrotesk",
  },
  input: {
    paddingVertical: 20,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFF5F5",
    marginTop: 8,
    fontFamily: "HostGrotesk",
    flex: 1,
    width: "100%",
  },
  important: {
    color: "#FF4D4D",
  },
  labelContainer: {
    flexDirection: "row",
    gap: 10,
  },
});
