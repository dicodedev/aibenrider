import { router } from "expo-router";
import { Skeleton } from "moti/skeleton";
import { Image, Pressable, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

import { appService } from "@/api/appService";
import ProfilePicture from "@/assets/images/account/profile-picture.png";
import { requestCardConfig } from "@/constants/app";
import { useState } from "react";
import Toast from "react-native-toast-message";
import ScalingDots from "../scaling-dots";
import { useQueryClient } from "@tanstack/react-query";

export const RequestCard = ({
  data,
  loading,
  completed = false,
}: {
  data: any;
  loading: boolean;
  completed: boolean;
}) => {
  const queryClient = useQueryClient();

  const [sending, setSending] = useState(false);
  const [accepted, setAccepted] = useState(data.rider_id ? true : false);

  const accept = async () => {
    try {
      setSending(true);

      await appService.acceptOrder(data.id);

      setAccepted(true);

      ["getPendingRequests", "getRecentRequests"].forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });
    } catch (error: any) {
      console.log("error", error);

      Toast.show({
        type: "error",
        text1: "Acceptance Failed",
        text2:
          (error.errors !== undefined && error.errors[0]
            ? error.errors[0]
            : error.message) || "Something went wrong",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <Pressable
      onPress={
        loading
          ? () => {}
          : () => router.push("/account/dashboard/trip-details/" + data?.id)
      }
      style={{
        flexDirection: "row",
        gap: 10,
        backgroundColor: "#fff",
        padding: 20,
        paddingHorizontal: 20,
        borderRadius: 12,
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 20,
          flex: 1,
          overflow: "hidden",
        }}
      >
        {loading ? (
          <Skeleton colorMode="light" height={40} width={40} radius={100} />
        ) : (
          <Image
            source={
              data
                ? data?.user.picture && data?.user.picture != "null"
                  ? { uri: data?.user.picture }
                  : ProfilePicture
                : ProfilePicture
            }
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
            }}
          />
        )}

        <View
          style={{
            flex: 1,
            // borderWidth: 1,
          }}
        >
          {loading ? (
            <Skeleton colorMode="light" height={20} width={100} radius={5} />
          ) : (
            <Text
              style={{
                fontSize: 17,
                fontFamily: "HostGroteskBold",
                marginBottom: 8,
              }}
            >
              {data.user.name}
            </Text>
          )}

          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            {loading ? (
              <View
                style={{
                  marginTop: 5,
                }}
              >
                <Skeleton
                  colorMode="light"
                  height={20}
                  width={100}
                  radius={5}
                />
              </View>
            ) : (
              <>
                <Svg width="16" height="19" viewBox="0 0 16 19" fill="none">
                  <Path
                    d="M8.30482 17.2517C8.15522 17.3591 7.97567 17.4169 7.79149 17.4169C7.6073 17.4169 7.42775 17.3591 7.27815 17.2517C2.85157 14.0965 -1.84635 7.60652 2.9029 2.91685C4.20672 1.6343 5.96258 0.915884 7.79149 0.916688C9.62482 0.916688 11.3839 1.63627 12.6801 2.91594C17.4293 7.6056 12.7314 14.0947 8.30482 17.2517Z"
                    stroke="black"
                    stroke-width="1.83333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <Path
                    d="M7.79165 9.16673C8.27788 9.16673 8.74419 8.97357 9.08801 8.62976C9.43183 8.28594 9.62498 7.81962 9.62498 7.33339C9.62498 6.84716 9.43183 6.38085 9.08801 6.03703C8.74419 5.69322 8.27788 5.50006 7.79165 5.50006C7.30542 5.50006 6.8391 5.69322 6.49528 6.03703C6.15147 6.38085 5.95831 6.84716 5.95831 7.33339C5.95831 7.81962 6.15147 8.28594 6.49528 8.62976C6.8391 8.97357 7.30542 9.16673 7.79165 9.16673Z"
                    stroke="black"
                    stroke-width="1.83333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
                <Text
                  style={{
                    fontSize: 13,
                    color: "#6A6A6A",
                    fontFamily: "HostGroteskBold",
                    width: "90%",
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {data?.pickup_address?.split(",")[0]}
                </Text>
              </>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            {loading ? (
              <View
                style={{
                  marginTop: 2,
                }}
              >
                <Skeleton
                  colorMode="light"
                  height={15}
                  width={100}
                  radius={5}
                />
              </View>
            ) : (
              <>
                <Svg width="14" height="12" viewBox="0 0 14 12" fill="none">
                  <Path
                    d="M13.28 5.20129C13.4197 5.3423 13.4981 5.53278 13.4981 5.73129C13.4981 5.9298 13.4197 6.12028 13.28 6.26129L8.28 11.2613C8.21134 11.335 8.12854 11.3941 8.03654 11.4351C7.94454 11.4761 7.84522 11.4981 7.74452 11.4999C7.64382 11.5017 7.54379 11.4831 7.4504 11.4454C7.35701 11.4077 7.27218 11.3515 7.20096 11.2803C7.12974 11.2091 7.0736 11.1243 7.03588 11.0309C6.99816 10.9375 6.97963 10.8375 6.98141 10.7368C6.98318 10.6361 7.00523 10.5368 7.04622 10.4448C7.08721 10.3528 7.14631 10.27 7.22 10.2013L10.94 6.48129L0.75 6.48129C0.551087 6.48129 0.360322 6.40227 0.219669 6.26162C0.0790164 6.12097 -2.59217e-07 5.9302 -2.50523e-07 5.73129C-2.41828e-07 5.53238 0.0790165 5.34161 0.219669 5.20096C0.360322 5.06031 0.551087 4.98129 0.75 4.98129L10.94 4.98129L7.22 1.26129C7.08752 1.11912 7.0154 0.93107 7.01882 0.736769C7.02225 0.542468 7.10097 0.357083 7.23838 0.21967C7.37579 0.0822566 7.56118 0.0035448 7.75548 0.000116596C7.94978 -0.00331161 8.13782 0.0688113 8.28 0.201291L13.28 5.20129Z"
                    fill="black"
                  />
                </Svg>
                <Text
                  style={{
                    fontSize: 13,
                    color: "#1B1B1B",
                    fontFamily: "HostGroteskBold",
                    width: "90%",
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {data?.customer_address?.split(",")[0]}
                </Text>
              </>
            )}
          </View>
        </View>
      </View>
      <View
        style={{
          justifyContent: "space-between",
          width: 120,
          // borderWidth: 1,
        }}
      >
        {loading ? (
          <View
            style={{
              marginBottom: 5,
            }}
          >
            <Skeleton colorMode="light" height={20} width={100} radius={5} />
          </View>
        ) : (
          <Text
            style={{
              fontSize: 14,
              fontFamily: "HostGroteskBold",
              marginBottom: 6,
              textAlign: "right",
            }}
          >
            ₦ {Number(data.rider_price).toLocaleString()}
          </Text>
        )}
        {loading ? (
          <View
            style={{
              marginBottom: 5,
              alignItems: "flex-end",
              paddingRight: 20,
            }}
          >
            <Skeleton colorMode="light" height={15} width={60} radius={5} />
          </View>
        ) : (
          <Text
            style={{
              fontSize: 14,
              fontFamily: "HostGroteskBold",
              marginBottom: 6,
              textAlign: "right",
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontFamily: "HostGroteskBold",
                marginBottom: 8,
                color: "#6A6A6A",
                textAlign: "right",
              }}
            >
              {data.distance}
            </Text>
          </Text>
        )}

        {loading ? (
          <Skeleton colorMode="light" height={30} width={100} radius={8} />
        ) : !completed ? (
          accepted || data.rider_id ? (
            <View
              style={{
                borderRadius: 8,
                backgroundColor:
                  data.full_status == "cancelled"
                    ? "#ffb3b3"
                    : requestCardConfig[data.type].transparentBackground,
                padding: 7,
                paddingHorizontal: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "HostGroteskBold",
                  color:
                    data.full_status == "cancelled"
                      ? "#ff0000"
                      : requestCardConfig[data.type].color,
                  textAlign: "center",
                }}
              >
                {data.full_status == "cancelled" ? "Cancelled" : "Accepted"}
              </Text>
            </View>
          ) : (
            <Pressable
              onPress={accept}
              style={{
                borderRadius: 8,
                backgroundColor: requestCardConfig[data.type].background,
                padding: 7,
                paddingHorizontal: 15,
              }}
            >
              {sending ? (
                <ScalingDots
                  dotCount={3}
                  dotSize={6}
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
                    fontSize: 12,
                    fontFamily: "HostGroteskBold",
                    color: "#F5F5F5",
                    textAlign: "center",
                  }}
                >
                  Accept {requestCardConfig[data.type].text}
                </Text>
              )}
            </Pressable>
          )
        ) : (
          <View>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "HostGroteskBold",
                color: "#9F9F9F",
                textAlign: "right",
              }}
            >
              Completed
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};
