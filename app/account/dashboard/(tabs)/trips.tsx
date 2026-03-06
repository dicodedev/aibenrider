import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { appService } from "@/api/appService";
import { GlowBG } from "@/components/account/glow-bg";
import { NoDataFound } from "@/components/account/no-data-found";
import { RequestCard } from "@/components/account/request-card";
import { requestCardConfig } from "@/constants/app";
import { arrowLeft } from "@/icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

const options = ["Open Trips", "Completed Trips"];

export default function Trips() {
  const app = useSelector((state: any) => state.app);
  const [section, setSection] = useState(0);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <View style={{ flex: 1 }}>
      <GlowBG />
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 10,
        }}
        edges={["left", "right", "top"]}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 45,
                  fontFamily: "HostGroteskBold",
                  lineHeight: 55,
                }}
              >
                My Trips
              </Text>
            </View>
            <Pressable
              onPress={() => router.back()}
              hitSlop={40}
              style={{
                height: 70,
                width: 70,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SvgXml xml={arrowLeft()} width={21} height={16} />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginBottom: 10,
            }}
          >
            <View
              style={{
                position: "relative",
                width: 160,
              }}
            >
              <Pressable
                onPress={() => {
                  setShow(!show);
                }}
                style={{
                  backgroundColor: "#fff",
                  flexDirection: "row",
                  padding: 5,
                  paddingHorizontal: 15,
                  gap: 10,
                  alignItems: "center",
                  borderRadius: 12,
                  justifyContent: "space-between",
                }}
              >
                {selected ? (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <View
                      style={{
                        width: 31,
                        height: 31,
                        borderRadius: "100%",
                        backgroundColor: selected.transparentBackground,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {selected.icon}
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "HostGroteskBold",
                      }}
                    >
                      {selected.text}
                    </Text>
                  </View>
                ) : (
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "HostGroteskBold",
                      paddingVertical: 5,
                      paddingHorizontal: 6,
                    }}
                  >
                    All Trips
                  </Text>
                )}
                <Svg width="17" height="10" viewBox="0 0 17 10" fill="none">
                  <Path
                    d="M1.475 4.78596e-06L9.82809e-08 1.48334L8.25 9.72501L16.5 1.47501L15.025 4.94754e-06L8.25 6.77501L1.475 4.78596e-06Z"
                    fill="black"
                  />
                </Svg>
              </Pressable>
              {show && (
                <View
                  style={{
                    backgroundColor: "#fff",
                    position: "absolute",
                    width: "100%",
                    top: "110%",
                    borderRadius: 10,
                    zIndex: 10000,
                  }}
                >
                  <Pressable
                    onPress={() => {
                      setSelected(null);
                      setShow(false);
                    }}
                    style={{
                      backgroundColor: "#fff",
                      flexDirection: "row",
                      padding: 10,
                      paddingHorizontal: 15,
                      gap: 10,
                      alignItems: "center",
                      borderRadius: 12,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "HostGroteskBold",
                        paddingTop: 6,
                      }}
                    >
                      See All Trips
                    </Text>
                  </Pressable>
                  {Object.keys(requestCardConfig).map(
                    (item, key) =>
                      selected?.text !== requestCardConfig[item].text && (
                        <Pressable
                          key={key}
                          onPress={() => {
                            setSelected(requestCardConfig[item]);
                            setShow(false);
                          }}
                          style={{
                            backgroundColor: "#fff",
                            flexDirection: "row",
                            padding: 10,
                            paddingHorizontal: 15,
                            gap: 10,
                            alignItems: "center",
                            borderRadius: 12,
                          }}
                        >
                          <View
                            style={{
                              width: 31,
                              height: 31,
                              borderRadius: "100%",
                              backgroundColor:
                                requestCardConfig[item].transparentBackground,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {requestCardConfig[item].icon}
                          </View>
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: "HostGroteskBold",
                            }}
                          >
                            {requestCardConfig[item].text}
                          </Text>
                        </Pressable>
                      ),
                  )}
                </View>
              )}
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 30,
              marginBottom: 5,
              marginTop: 10,
            }}
          >
            {options.map((item, key) => (
              <Pressable
                key={key}
                onPress={() => setSection(key)}
                style={{
                  backgroundColor: section == key ? "#ffffff" : "#EAEAEA",
                  flexDirection: "row",
                  padding: 10,
                  paddingHorizontal: 15,
                  gap: 10,
                  alignItems: "center",
                  borderRadius: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "HostGroteskBold",
                  }}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
          {section ? (
            <Completed filter={selected ? selected.text.toLowerCase() : null} />
          ) : (
            <Pending filter={selected ? selected.text.toLowerCase() : null} />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const Pending = ({ filter }: { filter: string }) => {
  const [requests, setRequests] = useState(null);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [canLoad, setCanLoad] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);

  const fetchRequests = async (page = 1) => {
    if (loading || !hasMore) return;

    setLoading(true);

    const res = await appService.getRequests(
      filter == "delivery" ? "marketplace" : filter,
      page,
    );

    console.log("page", page, res.data.length);

    if (res.data.length === 0) {
      setHasMore(false);
    }

    // console.log("res", res.data[0].packager);
    setRequests((prev) =>
      page == 1 ? res.data : [...(prev ? prev : []), ...res.data],
    );
    setLoading(false);
    setPage(page);
  };

  useEffect(() => {
    if (reachedEnd) {
      console.log("page", page);
      fetchRequests(page + 1);
      setReachedEnd(false);
    }
  }, [, reachedEnd]);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchRequests(1);
  }, [filter]);
  return (
    <View
      style={{
        marginTop: 15,
        paddingBottom: 15,
        gap: 10,
        flex: 1,
      }}
    >
      {requests ? (
        requests.length ? (
          <FlatList
            style={{
              flex: 1,
            }}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            data={requests}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <RequestCard completed={false} loading={false} data={item} />
            )}
            onEndReached={() => {
              setReachedEnd(true);
            }}
            onEndReachedThreshold={0.2}
            ListFooterComponent={
              loading ? (
                <View
                  style={{
                    paddingVertical: 10,
                  }}
                >
                  <ActivityIndicator size="large" />
                </View>
              ) : null
            }
          />
        ) : (
          <NoDataFound text={"No Trip found"} />
        )
      ) : (
        Array(4)
          .fill(0)
          .map((item, key) => (
            <RequestCard data={{}} key={key} loading={true} />
          ))
      )}
    </View>
  );
};

const Completed = ({ filter }: { filter: string }) => {
  const [requests, setRequests] = useState(null);

  const fetchRequests = async () => {
    const res = await appService.getCompletedRequests(
      filter == "delivery" ? "marketplace" : filter,
    );
    // console.log("res", res.data[0].packager);
    setRequests(res.data);
  };

  useFocusEffect(
    useCallback(() => {
      fetchRequests();
    }, [, filter]),
  );
  return (
    <View
      style={{
        marginTop: 15,
        paddingBottom: 15,
        gap: 10,
      }}
    >
      {requests ? (
        requests.length ? (
          requests.map((item, key) => (
            <RequestCard
              completed={true}
              key={key}
              loading={false}
              data={item}
            />
          ))
        ) : (
          <NoDataFound text={"No Trip found"} />
        )
      ) : (
        Array(4)
          .fill(0)
          .map((item, key) => (
            <RequestCard data={{}} key={key} loading={true} />
          ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#0E0E0E",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  logo: {
    height: 45,
    width: 45,
  },
  banner: {
    height: 114,
    width: "100%",
  },
  sectionTabText: {
    color: "#B0B0B0",
    paddingVertical: 15,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: "MontserratItalic",
  },
  btn: {
    backgroundColor: "#08A9D2",
    borderRadius: 5,
    paddingTop: 10,
    paddingHorizontal: 10,
    height: 40,
    fontFamily: "Montserrat",
    marginHorizontal: 20,
  },
  categoryView: {
    borderBottomColor: "#B0B0B0",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
});
