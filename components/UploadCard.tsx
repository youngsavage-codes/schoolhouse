import React from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { GalleryAdd } from "iconsax-react-native";
import * as ImagePicker from "expo-image-picker";

import { colors } from "@/constants/colors";
import { fontFamily, fontSize } from "@/constants/fonts";
import { spacing } from "@/constants/spacing";

interface UploadCardProps {
  title: string;
  subtitle?: string;
  value?: string;
  onChange?: (uri: string) => void;
}

const UploadCard: React.FC<UploadCardProps> = ({
  title,
  subtitle = "Tap to upload image",
  value,
  onChange,
}) => {

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permission required to access gallery");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      onChange?.(uri);
    }
  };

  return (
    <Pressable onPress={pickImage} style={styles.card}>
      {value ? (
        <Image source={{ uri: value }} style={styles.image} />
      ) : (
        <GalleryAdd size={35} color={colors.grayDark} />
      )}

      <Text style={styles.title}>
        {value ? `${title} Uploaded` : title}
      </Text>

      {!value && <Text style={styles.subtitle}>{subtitle}</Text>}
    </Pressable>
  );
};

export default UploadCard;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1.5,
    borderColor: colors.grayLight,
    borderStyle: "dashed",
    borderRadius: 12,
    paddingVertical: 25,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    marginBottom: spacing[4],
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 8,
  },
  title: {
    marginTop: 10,
    fontFamily: fontFamily.heading,
    fontSize: fontSize.sm,
    color: colors.grayDark,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.xs,
    color: colors.gray,
    marginTop: 3,
    textAlign: "center",
  },
});