import { useRef, useState } from "react";
import { Animated, Pressable } from "react-native";

export default function CustomSwitch() {
  const [on, setOn] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;

  const toggle = () => {
    Animated.timing(translateX, {
      toValue: on ? 0 : 16,
      duration: 200,
      useNativeDriver: true,
    }).start();

    setOn(!on);
  };

  return (
    <Pressable
      onPress={toggle}
      style={{
        width: 40,
        height: 24,
        borderRadius: 16,
        padding: 3,
        backgroundColor: on ? "#FF9C34" : "#cbd5e1",
      }}
    >
      <Animated.View
        style={{
          width: 18,
          height: 18,
          borderRadius: 100,
          backgroundColor: "#fff",
          transform: [{ translateX }],
        }}
      />
    </Pressable>
  );
}
