import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { appService } from "@/api/appService";
import { GlowBG } from "@/components/account/glow-bg";
import ScalingDots from "@/components/scaling-dots";
import { arrowLeft } from "@/icons";
import { Capitalize } from "@/utils/helper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, SvgXml } from "react-native-svg";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";

export default function BankAccount() {
  const app = useSelector((state: any) => state.app);

  const [accountNumber, setAccountNumber] = useState("");

  // console.log("data", data);

  const [payload, setPayload] = useState({
    account_name: "",
    account_number: "",
    bank_name: "Moniepoint",
    primary: 1,
    bank_code: "50515",
  });

  const queryClient = useQueryClient();

  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ["getBankDetails"],
    queryFn: appService.getBankDetails,
  });

  const validate = useMutation({
    mutationFn: (payload) => appService.validateBankDetails(payload),
    onError: async (err) => {
      console.log("error", err);

      setPayload({
        ...payload,
        account_name: "",
      });

      Toast.show({
        type: "error",
        text1: "Failed!",
        text2: err?.message,
      });
    },
    onSuccess: async (data) => {
      setPayload({
        ...payload,
        account_name: data.data.account_name,
      });
    },
  });

  const submit = useMutation({
    mutationFn: (payload) => appService.setBankDetails(payload),
    onError: async (err) => {
      console.log("error", err);
    },
    onSuccess: async () => {
      setPayload({
        ...payload,
        account_number: accountNumber,
      });

      Toast.show({
        type: "success",
        text1: "Successful",
        text2: "Bank account set successfully!",
      });
    },
  });

  useEffect(() => {
    if (
      accountNumber.length === 10 &&
      payload.account_number != accountNumber
    ) {
      validate.mutate({
        ...payload,
        account_number: accountNumber,
      });
    }
  }, [accountNumber]);

  useEffect(() => {
    if (isSuccess) {
      setPayload({
        ...payload,
        account_name: data?.data?.account_name,
        account_number: data?.data?.account_number,
      });

      setAccountNumber(data?.data?.account_number ?? "");
    }
  }, [,isLoading]);

  console.log("data", data);
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
          onPress={() =>
            payload.account_name == "" || submit.isPending
              ? () => {}
              : submit.mutate({ ...payload, account_number: accountNumber })
          }
          style={{
            width: "100%",
            backgroundColor: "#100152",
            paddingVertical: 20,
            borderRadius: 12,
            opacity: payload.account_name == "" || submit.isPending ? 0.5 : 1,
          }}
        >
          {submit.isPending ? (
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
                textAlign: "center",
                fontFamily: "HostGroteskBold",
                fontSize: 16,
              }}
            >
              SUBMIT
            </Text>
          )}
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
              Bank Information
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
              <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <Path
                  d="M2.5 18.3333H17.5"
                  stroke="#2A2A2A"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  d="M5 15V9.16669"
                  stroke="#2A2A2A"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  d="M8.33398 15V9.16669"
                  stroke="#2A2A2A"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  d="M11.666 15V9.16669"
                  stroke="#2A2A2A"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  d="M15 15V9.16669"
                  stroke="#2A2A2A"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  d="M10.0007 1.66669L16.6673 5.83335H3.33398L10.0007 1.66669Z"
                  stroke="#2A2A2A"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </Svg>
            </Pressable>
          </View>
          <View
            style={{
              paddingHorizontal: 0,
              marginVertical: 30,
            }}
          >
            <View style={styles.container}>
              <Text style={styles.label}>Bank Name</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 8,
                  gap: 10,
                  backgroundColor: "rgba(237, 237, 237, 1)",
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                  borderRadius: 15,
                  borderWidth: 1.5,
                  borderColor: "rgba(227, 227, 227, 1)",
                }}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    backgroundColor: "#BDD5FF",
                    borderRadius: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("@/assets/images/logo/moniepoint.png")}
                    style={{
                      width: 25,
                      height: 25,
                    }}
                  />
                </View>
                <Text style={{ fontSize: 16, fontFamily: "HostGrotesk" }}>
                  {payload.bank_name}
                </Text>
              </View>
            </View>

            <View style={styles.container}>
              <Text style={styles.label}>Account Number</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor={"#A09F9F"}
                selectionColor={"#808080"}
                placeholder="Account Number"
                keyboardType="number-pad"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(text) => setAccountNumber(text)}
                value={accountNumber}
              />
            </View>

            <View>
              {validate.isPending ? (
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                    marginTop: -10,
                  }}
                >
                  <ActivityIndicator color={"#11D100"} size="small" />
                  <Text
                    style={{
                      fontFamily: "HostGrotesk",
                      fontSize: 12,
                      color: "#11D100",
                    }}
                  >
                    Validating Account
                  </Text>
                </View>
              ) : payload.account_name != "" ? (
                <Text
                  style={{
                    fontFamily: "HostGrotesk",
                    fontSize: 12,
                    color: "#11D100",
                    marginTop: -10,
                  }}
                >
                  {Capitalize(payload.account_name)}
                </Text>
              ) : (
                <></>
              )}
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
