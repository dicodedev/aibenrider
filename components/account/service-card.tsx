import { Pressable, Text, View } from "react-native";

export const ServiceCard = ({
  index,
  color,
  borderColor,
  icon,
  title,
  text,
  active,
  setSelected,
  editable = true,
}) => {
  return (
    <Pressable
      onPress={
        editable
          ? () =>
              setSelected((prev) =>
                prev.includes(title.toLowerCase())
                  ? prev.filter((i) => i !== title.toLowerCase())
                  : [...prev, title.toLowerCase()],
              )
          : () => {}
      }
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: active ? borderColor : "#ffffff",
        flexDirection: "row",
        padding: 20,
        borderRadius: 12,
        gap: 20,
        width: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 20,
          flex: 1,
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: color,
            borderRadius: "100%",
            justifyContent: "center",
            alignItems: "center",
            width: 48,
            height: 48,
          }}
        >
          {icon}
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: "HostGroteskBold",
              marginBottom: 3,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "HostGrotesk",
              color: "#686868",
            }}
          >
            {text}
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#F5F5F5",
          borderWidth: 4,
          borderRadius: "100%",
          borderColor: active ? borderColor : "#D9D9D9",
          width: 16,
          height: 16,
        }}
      ></View>
    </Pressable>
  );
};
