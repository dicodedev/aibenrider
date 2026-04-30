import { router } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Svg, { Path, SvgXml } from "react-native-svg";

import { authService } from "@/api/authService";

import ScalingDots from "@/components/scaling-dots";
import Toast from "react-native-toast-message";

import { useDispatch } from "react-redux";

import { InputError } from "@/components/input-error";
import { logo } from "@/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email address is required"),
});

export default function forget() {
  const [visible, setVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const email = watch("email");

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const res = await authService.forget(data);

      router.replace({
        pathname: "/password-otp",
        params: {
          email,
        },
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Failed to forget",
        text2:
          (error.errors !== undefined && error.errors[0]
            ? error.errors[0]
            : error.message) || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
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
            marginTop: 0,
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 40,
              fontFamily: "HostGroteskBold",
              width: "100%",
              marginBottom: 0,
              textAlign: "center",
            }}
          >
            Forgot Password
          </Text>
          <Text
            style={{
              fontFamily: "HostGrotesk",
              width: "100%",
              textAlign: "center",
              fontSize: 16,
              lineHeight: 22,
              color: "#888888",
            }}
          >
            Recover your account access
          </Text>
          <View
            style={{
              width: "100%",
              marginTop: 20,
            }}
          >
            <View style={styles.container}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors.email && styles.errorInput]}
                    placeholderTextColor={"#A09F9F"}
                    selectionColor={"#A09F9F"}
                    placeholder="Email Address"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="emailAddress"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />

              {errors.email && <InputError message={errors.email.message} />}
              <Text
                style={{
                  fontFamily: "HostGrotesk",
                  fontWeight: 500,
                  color: "#6A7282",
                  fontSize: 12,
                  marginTop: 6,
                }}
              >
                We'll send a verification code to this phone to reset your
                password.
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: !email ? "#686868" : "#100152",
              padding: 20,
              paddingHorizontal: 60,
              borderRadius: 10,
              marginTop: 20,
              width: "100%",
              alignItems: "center",
              opacity: loading ? 0.5 : 1,
            }}
            onPress={!loading ? handleSubmit(onSubmit) : () => {}}
          >
            {loading ? (
              <ScalingDots
                dotCount={3}
                dotSize={9}
                dotColor="#ffffff"
                speed={300}
                style={{
                  marginVertical: 5,
                }}
                scaleRange={[1, 1.5]}
              />
            ) : (
              <Text
                style={{
                  color: "#fff",
                  fontWeight: 500,
                  fontFamily: "HostGroteskBold",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Send Code
              </Text>
            )}
          </TouchableOpacity>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 15,
            }}
          >
            <Pressable
              onPress={() => router.back()}
              style={{
                flexDirection: "row",
                gap: 6,
                alignItems: "center",
              }}
            >
              <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <Path
                  d="M7.99441 12.6576L3.33105 7.99429L7.99441 3.33093"
                  stroke="#4A5565"
                  stroke-width="1.33239"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  d="M12.6578 7.99438H3.33105"
                  stroke="#4A5565"
                  stroke-width="1.33239"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </Svg>
              <Text
                style={{
                  fontFamily: "HostGrotesk",
                  fontWeight: 500,
                  color: "#4A5565",
                  fontSize: 14,
                  width: 120,
                }}
              >
                Back to Sign In
              </Text>
            </Pressable>
          </View>
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
    fontFamily: "HostGrotesk",
    marginBottom: 6,
  },
  input: {
    fontFamily: "HostGrotesk",
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: "#E3E3E3",
    borderRadius: 15,
    paddingHorizontal: 13,
    width: "100%",
    backgroundColor: "#EDEDED",
    fontSize: 16,
    color: "#000000",
  },
  errorInput: {
    borderColor: "red",
  },
});
