import { useState } from "react";
import { Modal, View } from "react-native";

export const CustomModal = ({
  visible,
  setVisible,
  content,
}: {
  visible: boolean;
  setVisible: any;
  content: any;
}) => {
  const [text, setText] = useState("");
  return (
    <Modal
      animationType="fade" // "none" | "slide" | "fade"
      transparent={true}
      visible={visible ? true : false}
      onRequestClose={() => setVisible(false)}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {content}
      </View>
    </Modal>
  );
};
