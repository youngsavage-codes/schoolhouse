import React from "react";
import { View, Text, Modal, StyleSheet, Image } from "react-native";
import { colors } from "@/constants/colors";
import { fontFamily, fontSize } from "@/constants/fonts";
import { spacing } from "@/constants/spacing";
import Button from "./button";

type ModalType = "success" | "error" | "verifying" | "verified";

interface StatusModalProps {
  visible: boolean;
  type: ModalType;
  message: string;
  onClose: () => void;
}

const StatusModal: React.FC<StatusModalProps> = ({
  visible,
  type,
  message,
  onClose,
}) => {
  let title = "";
  let buttonLabel = "Close";
  let color = colors.text;

  switch (type) {
    case "success":
      title = "Success";
      color = colors.success;
      buttonLabel = "Okay";
      break;
    case "error":
      title = "Error";
      color = colors.danger;
      buttonLabel = "Close";
      break;
    case "verifying":
      title = "Verification in Progress";
      color = colors.primary;
      buttonLabel = "Close";
      break;
    case "verified":
      title = "Verified";
      color = colors.success;
      buttonLabel = "Okay";
      break;
  }

  const imageSrc = require("../assets/images/7980d53500ebf2f85fa14bf71c25888fd179692a.png"); // same image for all

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Image source={imageSrc} style={styles.image} resizeMode="contain" />

          <Text style={[styles.title, { color }]}>{title}</Text>

          <Text style={styles.message}>{message}</Text>

          <Button label={buttonLabel} onPress={onClose} variant="primary" />
        </View>
      </View>
    </Modal>
  );
};

export default StatusModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing[4],
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: spacing[4],
    alignItems: "center",
    paddingVertical: spacing[5],
    paddingHorizontal: spacing[4],
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: spacing[3],
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: "700",
    marginBottom: 6,
    fontFamily: fontFamily.heading
  },
  message: {
    textAlign: "center",
    fontSize: fontSize.sm,
    color: "#403E47",
    marginBottom: 20,
    lineHeight: 20,
    fontFamily: fontFamily.body
  },
});
