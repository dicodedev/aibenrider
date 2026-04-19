import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useFonts } from "expo-font";

import { useColorScheme } from "@/hooks/use-color-scheme";

import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import AppLoader from "@/providers/AppLoader";
import { store } from "@/store";
import { Provider } from "react-redux";

import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

import { KeyboardProvider } from "react-native-keyboard-controller";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const unstable_settings = {
  anchor: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const app = useSelector((state: any) => state.app);
  // const data = app.user;

  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    Montserrat: require("../assets/fonts/Montserrat/static/Montserrat-Medium.ttf"),
    MontserratBold: require("../assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf"),
    MontserratThin: require("../assets/fonts/Montserrat/static/Montserrat-Regular.ttf"),
    MontserratItalic: require("../assets/fonts/Montserrat/static/Montserrat-SemiBoldItalic.ttf"),

    HostGrotesk: require("../assets/fonts/Host_Grotesk/static/HostGrotesk-Regular.ttf"),
    HostGroteskBold: require("../assets/fonts/Host_Grotesk/static/HostGrotesk-SemiBold.ttf"),

    Outfit: require("../assets/fonts/Outfit/static/Outfit-Regular.ttf"),
    OutfitBold: require("../assets/fonts/Outfit/static/Outfit-SemiBold.ttf"),

    Poppins: require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    const setupChannels = async () => {
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("chat", {
          name: "Chat Messages",
          importance: Notifications.AndroidImportance.HIGH,
          sound: "chat.wav",
          vibrationPattern: [0, 250, 250, 250],
          enableVibrate: true,
          lockscreenVisibility:
            Notifications.AndroidNotificationVisibility.PUBLIC,
        });

        await Notifications.setNotificationChannelAsync("normal", {
          name: "General Notifications",
          importance: Notifications.AndroidImportance.DEFAULT,
          sound: "normal.wav",
          vibrationPattern: [0, 100, 100, 100],
        });
      }
    };

    if (loaded) {
      SplashScreen.hideAsync();

      setupChannels();
    }
  }, [loaded]);

  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: "#25D366",
          width: "90%", // 👈 expand width
          alignSelf: "center", // center the toast horizontally
        }}
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
        text1Style={{
          fontSize: 16,
          fontWeight: "600",
          fontFamily: "MontserratBold",
        }}
        text2Style={{
          fontSize: 14,
          fontFamily: "Montserrat",
          numberOfLines: 0,
        }}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: "#ED2939",
          width: "90%",
          alignSelf: "center",
        }}
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
        text1Style={{
          fontSize: 16,
          fontWeight: "600",
          fontFamily: "MontserratBold",
        }}
        text2Style={{
          fontSize: 14,
          fontFamily: "Montserrat",
          flexWrap: "wrap",
          numberOfLines: 0,
        }}
      />
    ),
  };

  return (
    <Provider store={store}>
      <ThemeProvider value={DefaultTheme}>
        <KeyboardProvider>
          <QueryClientProvider client={queryClient}>
            <AppLoader>
              <Stack>
                <Stack.Screen name="account" options={{ headerShown: false }} />
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="onboard" options={{ headerShown: false }} />
                <Stack.Screen
                  name="referral"
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen
                  name="set-password"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="complete-profile"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="profile-completed"
                  options={{ headerShown: false }}
                />
              </Stack>
              <StatusBar style="auto" />
              <Toast position="top" config={toastConfig} />
            </AppLoader>
          </QueryClientProvider>
        </KeyboardProvider>
      </ThemeProvider>
    </Provider>
  );
}
