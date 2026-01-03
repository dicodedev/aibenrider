import { Image, View } from "react-native";

export function SampleMap() {
  return (
    <View
      style={{
        flex: 1,
        position: "relative",
        width: "100%",
        height: 600,
      }}
    >
      <Image
        source={require("@/assets/images/map.png")}
        style={{
          width: "100%",
          height: 700,
        }}
      />
      <View
        style={{
          height: 300,
          width: 300,
          borderRadius: "100%",
          backgroundColor: "#4EDCEE",
          opacity: 0.3,
          position: "absolute",
          top: 100,
          left: "50%",
          transform: [
            {
              translateX: "-50%",
            },
          ],
        }}
      ></View>
      <Image
        source={require("@/assets/images/car.png")}
        style={{
          width: 28,
          height: 58,
          position: "absolute",
          left: "47%",
          top: 290,
          transform: [
            {
              rotate: "90deg",
            },
          ],
        }}
      />
      <Image
        source={require("@/assets/images/car.png")}
        style={{
          width: 28,
          height: 58,
          position: "absolute",
          left: "28%",
          top: 180,
          transform: [
            {
              rotate: "45deg",
            },
          ],
        }}
      />
      <Image
        source={require("@/assets/images/car.png")}
        style={{
          width: 28,
          height: 58,
          position: "absolute",
          left: "30%",
          top: 280,
        }}
      />
      <Image
        source={require("@/assets/images/car.png")}
        style={{
          width: 28,
          height: 58,
          position: "absolute",
          left: "55%",
          top: 150,
          transform: [
            {
              rotate: "180deg",
            },
          ],
        }}
      />
      <Image
        source={require("@/assets/images/car.png")}
        style={{
          width: 28,
          height: 58,
          position: "absolute",
          left: "65%",
          top: 240,
          transform: [
            {
              rotate: "-50deg",
            },
          ],
        }}
      />
    </View>
  );
}
