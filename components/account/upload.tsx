import { appService } from "@/api/appService";
import { useEffect } from "react";
import { Image, Pressable, Text, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import Toast from "react-native-toast-message";

export const Upload = ({ item, setImages, index, setTargetItem }) => {
  const setProgress = (progress) => {
    setImages((prev) =>
      prev.map((p, key) => (key === index ? { ...item, progress } : p)),
    );
  };

  const deleteItem = (item) => {
    setTargetItem(item);
  };

  useEffect(() => {
    if (item?.uri) {
      (async () => {
        try {
          const formData = new FormData();

          formData.append("file", {
            uri: item.uri,
            name: item.fileName || "photo.jpg",
            type: item.mimeType || "image/jpeg",
          });

          const res = await appService.uploadVehicleImage(
            formData,
            setProgress,
          );
          let data = res.data;

          // console.log("image " + (Number(index) + 1), data);

          setImages((prev) =>
            prev.map((p, key) => (key === index ? { ...data } : p)),
          );
        } catch (error: any) {
          // console.log("error", error);

          setImages((prev) =>
            prev.map((p, key) =>
              key === index ? { ...item, progress: 0 } : p,
            ),
          );

          Toast.show({
            type: "error",
            text1: "Failed",
            text2:
              (error.errors !== undefined && error.errors[0]
                ? error.errors[0]
                : error.message) || "Something went wrong",
          });
        }
      })();
    }
  }, []);
  return (
    <View
      style={{
        width: 80,
        height: 80,
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        overflow: "visible",
        zIndex: 10,
        marginBottom: 10,
      }}
    >
      {item?.uri ? (
        <>
          <View
            style={{
              width: (item.progress > 100 ? 100 : item.progress) + "%",
              backgroundColor: "#fafafa",
              position: "absolute",
              left: 0,
              height: "100%",
            }}
          ></View>
          <Text
            style={{
              fontFamily: "HostGrotesk",
              fontSize: 12,
              textAlign: "center",
            }}
          >
            {item.progress > 100 ? 100 : item.progress}%
          </Text>
        </>
      ) : (
        <>
          <Pressable
            style={{
              position: "absolute",
              right: -11,
              top: -4,
              zIndex: 500,
            }}
            onPress={() => deleteItem(item)}
          >
            <Svg width="21" height="21" viewBox="0 0 21 21" fill="none">
              <Circle cx="10.0692" cy="10.0692" r="10.0692" fill="#CCD9F8" />
              <Path
                d="M14.8379 5.3385L6.52418 13.6522"
                stroke="#100152"
                stroke-width="1.41088"
              />
              <Path
                d="M14.8438 13.6522L6.53004 5.33851"
                stroke="#100152"
                stroke-width="1.41088"
              />
            </Svg>
          </Pressable>

          <Image
            source={{ uri: item.url }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 6,
            }}
          />
        </>
      )}
    </View>
  );
};
