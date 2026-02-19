import { getOnboardedStatus } from "@/utils/mainStore";
import { getToken } from "@/utils/secureStore";
import { Redirect, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Image, View } from "react-native";
import { useSelector } from "react-redux";

export default function index() {
  const slideView = useRef(new Animated.Value(0)).current; // start off-screen
  const ViewOpacity = useRef(new Animated.Value(1)).current; // start off-screen

  const app = useSelector((state: any) => state.app);
  const data = app.user;

  const [token, setToken] = useState(null);
  const [onboarded, setOnboarded] = useState(null);

  const [step, setStep] = useState(1);

  // console.log("token", token);

  useEffect(() => {
    const deleteData = async () => {
      const keys = ["access_token", "user", "onboarded_status"];

      for (const key of keys) {
        await SecureStore.deleteItemAsync(key);
      }
    };
    // deleteData();

    const loadAuth = async () => {
      const res = await getToken();

      // console.log("token", res);

      setToken(res ? res : false);
    };
    loadAuth();

    const loadOnboardedStatus = async () => {
      const res = await getOnboardedStatus();

      // console.log("onboarded", res);

      setOnboarded(res ? res : false);
    };
    loadOnboardedStatus();
  }, []);

  if (token) {
    return <Redirect href="/account/dashboard" />;
  } else if (onboarded) {
    return <Redirect href="/login" />;
  } else if (onboarded == false && token == false) {
    return <First onboarded={onboarded} token={token} />;
  }
}

const First = ({ onboarded, token }) => {
  const sizeAmin = useRef(new Animated.Value(1)).current; // start off-screen
  const radiusAmin = useRef(new Animated.Value(0)).current; // start off-screen
  const slideAnim = useRef(new Animated.Value(300)).current; // start off-screen
  const opacity = useRef(new Animated.Value(1)).current; // start off-screen

  const { width, height } = Dimensions.get("window");

  const radius = radiusAmin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const hSize = sizeAmin.interpolate({
    inputRange: [0, 1],
    outputRange: [300, height],
  });

  const wSize = sizeAmin.interpolate({
    inputRange: [0, 1],
    outputRange: [300, width],
  });

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 900,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 900,
        useNativeDriver: true,
      }).start();

      Animated.timing(sizeAmin, {
        toValue: 0,
        duration: 600,
        useNativeDriver: false,
      }).start();
    }, 3000);

    setTimeout(() => {
      Animated.timing(radiusAmin, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }).start();

      Animated.timing(opacity, {
        toValue: 0,
        duration: 700,
        useNativeDriver: false,
      }).start();
    }, 3000);

    setTimeout(() => {
      console.log("d", token, onboarded);
      router.replace("/onboard");
    }, 4000);
  }, []);
  return (
    <View
      style={{ flex: 1, backgroundColor: "#ffffff", justifyContent: "center" }}
    >
      <View
        style={{
          top: 0,
          left: 0,
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Animated.View
          style={{
            width: wSize,
            height: hSize,
            opacity,
            backgroundColor: "#100152",
            borderRadius: radius,
          }}
        ></Animated.View>
      </View>

      <Animated.View
        style={{
          transform: [{ translateY: slideAnim }],
          alignItems: "center",
        }}
      >
        <Image
          source={require("@/assets/images/logo/white-logo.png")}
          style={{
            width: 275,
            height: 53,
          }}
        />
      </Animated.View>
    </View>
  );
};
