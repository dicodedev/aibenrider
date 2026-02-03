import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FontAwesome } from "@expo/vector-icons";
import Svg, { Circle, Path, SvgXml } from "react-native-svg";

import { authService } from "@/api/authService";

import ScalingDots from "@/components/scaling-dots";
import Toast from "react-native-toast-message";

import { useDispatch } from "react-redux";

import { CustomModal } from "@/components/custom-modal";
import { InputError } from "@/components/input-error";
import { logo } from "@/icons";
import { saveOnboardedStatus } from "@/utils/mainStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  access_code: yup.string().required("An access code is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

export default function setPassword() {
  const [visible, setVisible] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

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
      await authService.setPassword(data);

      await saveOnboardedStatus("completed");

      setVisible(true);
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Failed to register",
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
      <CustomModal
        setVisible={setVisible}
        visible={visible}
        content={<SuccessModal setVisible={setVisible} />}
      />
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
            Setup Account
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
            Welcome to Aibenmart, setup your password to complete your
            registration
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
                name="access_code"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors.code && styles.errorInput]}
                    placeholderTextColor={"#A09F9F"}
                    selectionColor={"#A09F9F"}
                    placeholder="Access Code"
                    keyboardType="a"
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType=""
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.access_code && (
                <InputError message={errors.access_code.message} />
              )}
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
                      style={[
                        styles.input,
                        errors.password && styles.errorInput,
                      ]}
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
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {!showPassword ? (
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
                CONTINUE
              </Text>
            )}
          </Pressable>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
          }}
        >
          <Text
            style={{
              fontFamily: "HostGrotesk",
              fontWeight: 500,
              color: "#888888",
              fontSize: 16,
            }}
          >
            Already set up your account?
          </Text>
          <TouchableOpacity
            style={{
              padding: 10,
            }}
            onPress={async () => {
              await saveOnboardedStatus("completed");
              router.push("/login");
            }}
          >
            <Text
              style={{
                color: "#100152",
                fontWeight: 500,
                fontFamily: "HostGroteskBold",
                fontSize: 16,
              }}
            >
              Login account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const SuccessModal = ({ setVisible }) => {
  useEffect(() => {
    setTimeout(() => {
      setVisible(false);

      router.replace("/login");
    }, 1000);
  }, []);
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
        Setup Completed
      </Text>
    </View>
  );
};

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
