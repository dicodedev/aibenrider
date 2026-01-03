import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { logo } from "@/icons";

import { SvgXml } from "react-native-svg";

import { appSlice } from "@/store/appSlice";
import { saveOnboardedStatus } from "@/utils/mainStore";
import { router } from "expo-router";
import { useDispatch } from "react-redux";

export default function referral() {
  const [code, setCode] = useState(null);

  const dispatch = useDispatch();

  const onSubmit = async () => {
    await saveOnboardedStatus("completed");

    dispatch(appSlice.actions.setRef(code));

    router.push("/register");
  };

  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        flex: 1,
        backgroundColor: "#F5F5F5",
        justifyContent: "flex-start",
        paddingBottom: 20,
      }}
    >
      <View
        style={{
          flex: 1,
          height: "100%",
        }}
      >
        <View
          style={{
            width: "100%",
            height: 60,
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <SvgXml xml={logo()} width={200} height={50} />
        </View>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 20,
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              width: "100%",
              marginTop: 20,
            }}
          >
            <View style={styles.container}>
              <TextInput
                style={[styles.input]}
                placeholderTextColor={"#A09F9F"}
                selectionColor={"#A09F9F"}
                placeholder="Referral Code (Optional)"
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="name"
                value={code}
                onChangeText={(value) => setCode(value)}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#100152",
              padding: 20,
              paddingHorizontal: 60,
              borderRadius: 10,
              marginTop: 0,
              display: "flex",
              width: "100%",
              alignItems: "center",
              opacity: 1,
            }}
            onPress={onSubmit}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: 500,
                fontFamily: "Montserrat",
                textTransform: "uppercase",
              }}
            >
              CONTINUE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontFamily: "Montserrat",
    marginBottom: 6,
  },
  input: {
    fontFamily: "HostGrotesk",
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: "#E3E3E3",
    borderRadius: 15,
    paddingHorizontal: 10,
    width: "100%",
    backgroundColor: "#EDEDED",
    fontSize: 16,
    color: "#000000",
  },
  errorInput: {
    borderColor: "red",
  },
});
