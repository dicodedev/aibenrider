import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FontAwesome } from "@expo/vector-icons";
import { SvgXml } from "react-native-svg";

import { authService } from "@/api/authService";

import ScalingDots from "@/components/scaling-dots";
import Toast from "react-native-toast-message";

import { useDispatch } from "react-redux";

import { InputError } from "@/components/input-error";
import { logo } from "@/icons";
import { appSlice } from "@/store/appSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email address is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

export default function login() {
  const [visible, setVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const res = await authService.login(data);

      const user = res.data.user;
      const role = user.roles[0].name;

      if (role === "rider") {
        dispatch(appSlice.actions.setUser(user));
        router.replace("/account/dashboard");
      } else {
        Toast.show({
          type: "error",
          text1: "Unauthorized",
          text2: "Kindly login with a valid rider account",
        });
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Failed to login",
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
            Login Account
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
            Login to your Aibenmart account in seconds using your email or
            password.
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
            </View>
            <View style={styles.container}>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  position: "relative",
                }}
              >
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.input, errors.email && styles.errorInput]}
                      placeholderTextColor={"#A09F9F"}
                      selectionColor={"#A09F9F"}
                      placeholder="Password"
                      secureTextEntry={!visible}
                      autoCapitalize="none"
                      autoCorrect={false}
                      textContentType="password"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                  )}
                />
                <Pressable
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: [{ translateY: -12 }],
                  }}
                  onPress={() => setVisible(!visible)}
                >
                  {!visible ? (
                    <FontAwesome name="eye-slash" size={20} color="#CCC" />
                  ) : (
                    <FontAwesome name="eye" size={20} color="#CCC" />
                  )}
                </Pressable>
              </View>
              {errors.password && (
                <InputError message={errors.password.message} />
              )}
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Pressable>
              <Text
                style={{
                  textAlign: "right",
                  fontFamily: "HostGroteskBold",
                  color: "#100152",
                }}
              >
                Forget Password?
              </Text>
            </Pressable>
          </View>
          <Pressable
            style={{
              backgroundColor: "#100152",
              padding: 20,
              paddingHorizontal: 60,
              borderRadius: 10,
              marginTop: 20,
              display: "flex",
              width: "100%",
              alignItems: "center",
              opacity: loading ? 0.6 : 1,
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
                  fontFamily: "HostGrotesk",
                }}
              >
                LOGIN ACCOUNT
              </Text>
            )}
          </Pressable>
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
