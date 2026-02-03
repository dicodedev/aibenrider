import { Dimensions, Image, Pressable, View } from "react-native";

import { cancel } from "@/icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

const { width } = Dimensions.get("window");

export default function Previewer() {
  const app = useSelector((state: any) => state.app);
  const images = app.images;

  const { currentIndex } = useLocalSearchParams();

  const [index, setIndex] = useState(Number(currentIndex));
  const mainRef = useRef(null);
  const thumbRef = useRef(null);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const i = viewableItems[0].index;
      setIndex(i);
      thumbRef.current?.scrollToIndex({ index: i, animated: true });
    }
  });

  useEffect(() => {
    if (!mainRef.current) return;

    setIndex(currentIndex);

    mainRef.current.scrollToIndex({
      index: currentIndex,
      animated: true,
    });
  }, [currentIndex]);
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Pressable
            onPress={() => router.back()}
            hitSlop={40}
            style={{
              height: 70,
              width: 70,
              justifyContent: "center",
              alignItems: "center",
              marginRight: -10,
            }}
          >
            <SvgXml xml={cancel()} width={21} height={16} />
          </Pressable>
        </View>
        <View
          style={{
            marginTop: 30,
            gap: 20,
            alignItems: "center",
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
              }}
            >
              <FlatList
                ref={mainRef}
                data={images}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(i) => i.id}
                onViewableItemsChanged={onViewableItemsChanged.current}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
                getItemLayout={(_, index) => ({
                  length: width,
                  offset: width * index,
                  index,
                })}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item.url }}
                    style={styles.mainImage}
                    contentFit="contain"
                  />
                )}
              />
            </View>
          </View>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              marginBottom: 20,
              paddingLeft: 4,
            }}
          >
            <FlatList
              ref={thumbRef}
              data={images}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(i) => i.id}
              contentContainerStyle={styles.thumbs}
              renderItem={({ item, index: i }) => (
                <Pressable
                  onPress={() => {
                    setIndex(i);
                    mainRef.current?.scrollToIndex({
                      index: i,
                      animated: true,
                    });
                  }}
                >
                  <Image
                    source={{ uri: item.url }}
                    style={[styles.thumb, index === i && styles.activeThumb]}
                    contentFit="contain"
                  />
                </Pressable>
              )}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainImage: {
    width: width,

  },
  thumbs: {
    height: "100%",
  },
  thumb: {
    width: 100,
    height: 100,
    marginRight: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  activeThumb: {
    borderColor: "#000",
    borderWidth: 2,
  },
});
