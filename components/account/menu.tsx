import { useNavigation } from "expo-router";
import { Pressable } from "react-native";
import Svg, { Path } from "react-native-svg";

export const Menu = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.openDrawer()}
      style={{
        borderRadius: 6,
        backgroundColor: "#ffffff",
        width: 50,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Svg width="22" height="13" viewBox="0 0 22 13" fill="none">
        <Path
          d="M20.3607 0H0.885246C0.396338 0 0 0.396338 0 0.885246C0 1.37415 0.396338 1.77049 0.885246 1.77049H20.3607C20.8496 1.77049 21.2459 1.37415 21.2459 0.885246C21.2459 0.396338 20.8496 0 20.3607 0Z"
          fill="black"
        />
        <Path
          d="M16.8197 5.31152H0.885246C0.396338 5.31152 0 5.70786 0 6.19677C0 6.68568 0.396338 7.08202 0.885246 7.08202H16.8197C17.3086 7.08202 17.7049 6.68568 17.7049 6.19677C17.7049 5.70786 17.3086 5.31152 16.8197 5.31152Z"
          fill="black"
        />
        <Path
          d="M20.3607 10.623H0.885246C0.396338 10.623 0 11.0194 0 11.5083C0 11.9972 0.396338 12.3935 0.885246 12.3935H20.3607C20.8496 12.3935 21.2459 11.9972 21.2459 11.5083C21.2459 11.0194 20.8496 10.623 20.3607 10.623Z"
          fill="black"
        />
      </Svg>
    </Pressable>
  );
};
