import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FontAwesome } from "@expo/vector-icons";
import { SvgXml } from "react-native-svg";

import Toast from "react-native-toast-message";

import { authService } from "@/api/authService";
import { InputError } from "@/components/input-error";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import ScalingDots from "../components/scaling-dots";

import { useDispatch, useSelector } from "react-redux";

import { logo } from "@/icons";
import { appSlice } from "@/store/appSlice";

// import {
//   GoogleSignin,
//   isErrorWithCode,
//   isSuccessResponse,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const schema = yup.object().shape({
  name: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

export default function register() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const app = useSelector((state: any) => state.app);

  // const redirectUri = makeRedirectUri({ scheme: "aibenmart" });
  // console.log(redirectUri); // should output aibenmart://oauthredirect

  // Configure Google Auth request
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "641511239957-proorqn0nb6qq0q6eih379nn8ch4vpg9.apps.googleusercontent.com",
    androidClientId:
      "641511239957-bc8hjl8p07kfqih6d549g4b4gdkcdeo6.apps.googleusercontent.com",
    iosClientId:
      "641511239957-ekfdfptqn3vuv3bpfh6hqabuomo0dghj.apps.googleusercontent.com",
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const res = await authService.register({ ...data, ref_code: app.ref });

      dispatch(appSlice.actions.setUser(res.data.user));

      router.push(
        res.data.user.email_verified_at ? "/complete-profile" : "/otp"
      );
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

  const fetchUserInfo = async (token) => {
    try {
      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      console.log("data", data);

      const { name, email, photo } = data;

      const r = await authService.googleSignup({
        name,
        email,
        picture: photo,
        ref_code: app.ref,
      });

      dispatch(appSlice.actions.setUser(r.data.user));

      router.replace("/complete-profile");
    } catch (error) {
      console.error(error);

      Toast.show({
        type: "error",
        text1: "Failed",
        text2: "Google sign up failed",
      });
    }
  };

  // const handleGoogleSignup = async () => {
  //   try {
  //     setGoogleLoading(true);

  //     await GoogleSignin.hasPlayServices();
  //     const response = await GoogleSignin.signIn();
  //     if (isSuccessResponse(response)) {
  //       const { idToken, user } = response.data;
  //       const { name, email, photo } = user;

  //       const res = await authService.googleSignup({
  //         name,
  //         email,
  //         picture: photo,
  //         ref_code: app.ref,
  //       });

  //       dispatch(appSlice.actions.setUser(res.data.user));

  //       router.replace("/complete-profile");
  //     } else {
  //       Toast.show({
  //         type: "error",
  //         text1: "Failed",
  //         text2: "Google sign up failed",
  //       });
  //     }
  //     setGoogleLoading(false);
  //   } catch (error) {
  //     console.log("derro", error);
  //     if (isErrorWithCode(error)) {
  //       switch (error.code) {
  //         case statusCodes.IN_PROGRESS:
  //           Toast.show({
  //             type: "info",
  //             text1: "In Progress",
  //             text2: "Google sign up is in progress",
  //           });
  //           break;
  //         case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
  //           Toast.show({
  //             type: "error",
  //             text1: "Failed",
  //             text2: "Play service not available",
  //           });
  //           break;
  //         default:
  //           Toast.show({
  //             type: "error",
  //             text1: "Failed",
  //             text2: "Google sign up error occurred",
  //           });
  //           break;
  //       }
  //     } else {
  //       Toast.show({
  //         type: "error",
  //         text1: "Signup Failed",
  //         text2: error?.message ?? "Something went wrong",
  //       });
  //     }
  //     setGoogleLoading(false);
  //   }
  // };

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      fetchUserInfo(authentication.accessToken);
    }
  }, [response]);

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
            Create Account
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
            Create your Aibenmart account in seconds using your email or phone
            number.
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
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors.email && styles.errorInput]}
                    placeholderTextColor={"#A09F9F"}
                    selectionColor={"#A09F9F"}
                    placeholder="Full Name"
                    keyboardType="ascii-capable"
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="familyName"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.name && <InputError message={errors.name.message} />}
            </View>
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
          <TouchableOpacity
            style={{
              backgroundColor: "#100152",
              padding: 20,
              paddingHorizontal: 60,
              borderRadius: 10,
              marginTop: 10,
              display: "flex",
              width: "100%",
              alignItems: "center",
              opacity: loading ? 0.6 : 1,
            }}
            onPress={!loading ? handleSubmit(onSubmit) : () => {}}
            // onPress={() => router.push("/otp")}
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
                CREATE ACCOUNT
              </Text>
            )}
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 15,
              marginVertical: 20,
            }}
          >
            <View
              style={{
                height: 0.5,
                backgroundColor: "#000",
                flex: 1,
                marginVertical: 20,
              }}
            />
            <Text
              style={{
                fontFamily: "HostGrotesk",
                color: "#888888",
                fontSize: 16,
              }}
            >
              Or with
            </Text>
            <View
              style={{
                height: 0.5,
                backgroundColor: "#000",
                flex: 1,
              }}
            />
          </View>
          <Pressable
            onPress={() =>
              promptAsync({
                showInRecents: true,
              })
            }
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {googleLoading ? (
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
            ) : (
              <>
                <Image
                  source={require("../assets/images/google.png")}
                  style={{
                    height: 25,
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    fontFamily: "HostGroteskBold",
                    textTransform: "uppercase",
                    color: "#000000",
                    fontWeight: "500",
                    fontSize: 16,
                    paddingVertical: 20,
                  }}
                >
                  Sign up WITH Google
                </Text>
              </>
            )}
          </Pressable>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
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
              Already have an account?
            </Text>
            <TouchableOpacity
              style={{
                padding: 10,
              }}
              onPress={() => router.push("/login")}
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
