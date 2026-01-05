import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { GlowBG } from "@/components/account/glow-bg";
import { arrowLeft } from "@/icons";
import { router } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

export default function ProfileComponent() {
  const app = useSelector((state: any) => state.app);
  const [search, setSearch] = useState("");

  return (
    <View style={{ flex: 1 }}>
      <GlowBG />
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
          showsVerticalScrollIndicator={false}
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
              Profile
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
                  d="M12 10C14.2091 10 16 8.20914 16 6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6C8 8.20914 9.79086 10 12 10Z"
                  fill="black"
                />
                <Path
                  d="M20 17.5C20 19.985 20 22 12 22C4 22 4 19.985 4 17.5C4 15.015 7.582 13 12 13C16.418 13 20 15.015 20 17.5Z"
                  fill="black"
                />
              </Svg>
            </Pressable>
          </View>
          <View
            style={{
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <View
              style={{
                width: 170,
                height: 170,
                borderRadius: "100%",
                borderWidth: 1,
                borderColor: "#FFDAAD",
                padding: 3,
              }}
            >
              <Image
                source={{ uri: "https://avatar.iran.liara.run/public" }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 100,
                }}
              />
            </View>
            <View
              style={{
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "HostGroteskBold",
                  textAlign: "center",
                }}
              >
                Sarah Davies
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "HostGrotesk",
                  color: "#7E7E7E",
                  textAlign: "center",
                }}
              >
                sarah.davies@example.com
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 0,
              marginVertical: 30,
            }}
          >
            <View style={styles.container}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor={"#A09F9F"}
                selectionColor={"#808080"}
                placeholder="Full Name"
                keyboardType="ascii-capable"
                autoCapitalize="none"
                autoCorrect={false}
                readOnly={false}
                textContentType="name"
                value={""}
              />
            </View>
            <View style={styles.container}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor={"#A09F9F"}
                selectionColor={"#808080"}
                placeholder="Email Address"
                keyboardType="ascii-capable"
                autoCapitalize="none"
                autoCorrect={false}
                readOnly={false}
                textContentType="name"
                value={""}
              />
            </View>
            <View style={styles.container}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor={"#A09F9F"}
                selectionColor={"#808080"}
                placeholder="Phone Number"
                keyboardType="ascii-capable"
                autoCapitalize="none"
                autoCorrect={false}
                readOnly={false}
                textContentType="name"
                value={""}
              />
            </View>
            <View style={styles.container}>
              <Text style={styles.label}>Date Of Birth</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor={"#A09F9F"}
                selectionColor={"#808080"}
                placeholder="Date Of Birth"
                keyboardType="ascii-capable"
                autoCapitalize="none"
                autoCorrect={false}
                readOnly={false}
                textContentType="name"
                value={""}
              />
            </View>
            <View style={styles.container}>
              <Text style={styles.label}>Gender</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor={"#A09F9F"}
                selectionColor={"#808080"}
                placeholder="Gender"
                keyboardType="ascii-capable"
                autoCapitalize="none"
                autoCorrect={false}
                readOnly={false}
                textContentType="name"
                value={""}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

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
