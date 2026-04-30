import { router, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { authService } from "@/api/authService";
import Svg, { Path } from "react-native-svg";
import Toast from "react-native-toast-message";
import ScalingDots from "../components/scaling-dots";

export default function passwordOtp() {
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [token, setToken] = useState(null);

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef([]);

  const { email } = useLocalSearchParams<{
    email: string;
  }>();

  const onSubmit = async () => {
    try {
      setLoading(true);
      const res = await authService.verifyPasswordOtp({
        code: otp.join(""),
      });
      console.log("data", res.data);
      setToken(res.data.token);
      setSuccess("Verification completed");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    try {
      setSending(true);
      const res = await authService.forget({
        email,
      });

      Toast.show({
        type: "success",
        text1: "OTP sent",
        text2: "OTP mail successfully sent",
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "OTP mail failed",
        text2:
          (error.errors !== undefined && error.errors[0]
            ? error.errors[0]
            : error.message) || "Something went wrong",
      });
    } finally {
      setSending(false);
    }
  };

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto move to next
    if (text && index < 3) {
      inputs.current[index + 1].focus();
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
            display: "flex",
            alignItems: "center",
            marginTop: 20,
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontFamily: "HostGroteskBold",
              width: "100%",
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            Enter Code
          </Text>
          <View
            style={{
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "HostGrotesk",
                width: "100%",
                textAlign: "center",
                color: "#808080",
                fontSize: 14,
              }}
            >
              Enter the code sent to{" "}
              <Text
                style={{
                  fontFamily: "HostGroteskBold",
                }}
              >
                {email}
              </Text>
            </Text>
          </View>

          <View
            style={{
              width: "100%",
              marginTop: 20,
              flexDirection: "row",
              gap: 15,
              paddingHorizontal: 10,
            }}
          >
            {otp.map((value, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputs.current[index] = ref)}
                value={value}
                onChangeText={(text) => handleChange(text, index)}
                keyboardType="ascii-capable"
                maxLength={1}
                placeholderTextColor={"#CCC"}
                selectionColor={"#808080"}
                style={[
                  styles.input,
                  error && styles.errorInput,
                  success && styles.successInput,
                ]}
              />
            ))}
          </View>
          {success || error ? (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
                marginBottom: 30,
              }}
            >
              <Text
                style={{
                  color: success ? "#31D07A" : "red",
                  fontFamily: "HostGroteskBold",
                  fontWeight: 700,
                  fontSize: 14,
                  paddingHorizontal: 3,
                }}
              >
                {success || error}
              </Text>
            </View>
          ) : (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
                marginBottom: 30,
              }}
            >
              <Text
                style={{
                  fontFamily: "HostGrotesk",
                  color: "#000000",
                  fontSize: 14,
                }}
              >
                Code expires in
              </Text>
              <Text
                style={{
                  color: "#100152",
                  fontFamily: "HostGroteskBold",
                  fontWeight: 700,
                  fontSize: 14,
                  paddingHorizontal: 3,
                }}
              >
                15min
              </Text>
            </View>
          )}
          {success ? (
            <TouchableOpacity
              style={{
                backgroundColor: "#100152",
                padding: 20,
                paddingHorizontal: 60,
                borderRadius: 10,
                marginTop: 15,
                marginBottom: 10,
                display: "flex",
                width: "100%",
                alignItems: "center",
                opacity: 1,
              }}
              onPress={() =>
                router.replace({
                  pathname: "/reset-password",
                  params: {
                    token,
                  },
                })
              }
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: 500,
                  fontFamily: "HostGroteskBold",
                }}
              >
                NEXT
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor:
                  otp.join("").length == 4 ? "#100152" : "#686868",
                padding: 20,
                paddingHorizontal: 60,
                borderRadius: 10,
                marginTop: 20,
                marginBottom: 10,
                display: "flex",
                width: "100%",
                alignItems: "center",
                opacity: loading ? 0.6 : 1,
              }}
              onPress={
                !loading && otp.join("").length == 4
                  ? onSubmit
                  : otp.join("").length != 4
                    ? () => {
                        setError("OTP code is required");
                      }
                    : () => {}
              }
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
                  }}
                >
                  VERIFY
                </Text>
              )}
            </TouchableOpacity>
          )}

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                paddingVertical: 6,
              }}
              onPress={sending ? () => {} : () => resendOTP()}
            >
              <Text
                style={{
                  color: "#100152",
                  fontFamily: "HostGroteskBold",
                }}
              >
                {sending ? "Sending..." : " Resend code"}
              </Text>
            </TouchableOpacity>
          </View>
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
    fontFamily: "HostGroteskBold",
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: "#E3E3E3",
    borderRadius: 12,
    paddingHorizontal: 10,
    flex: 1,
    fontSize: 20,
    color: "#000000",
    textAlign: "center",
  },
  errorInput: {
    borderColor: "red",
  },
  successInput: {
    borderColor: "#31D07A",
  },
});
