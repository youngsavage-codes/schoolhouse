import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { GalleryAdd } from 'iconsax-react-native';
import * as ImagePicker from 'expo-image-picker';

import { colors } from '@/constants/colors';
import { fontFamily, fontSize } from '@/constants/fonts';
import { spacing } from '@/constants/spacing';
import { useAuth } from '@/hooks/AuthContext';

interface UploadCardProps {
  title: string;
  subtitle?: string;

  value?: string;

  /* 🔥 RETURNS FULL RESPONSE */
  onChange?: (data: any) => void;
}

const UploadCard: React.FC<UploadCardProps> = ({
  title,
  subtitle = 'Tap to upload image',
  value,
  onChange,
}) => {
  const {access_token} = useAuth()
  const [loading, setLoading] =
    useState(false);

  console.log(access_token);

  /* =========================================================
     PICK IMAGE
  ========================================================= */

  const pickImage = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          'Permission Required',
          'Please allow gallery access'
        );

        return;
      }

      const result =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes:
            ImagePicker.MediaTypeOptions.Images,

          quality: 0.7,

          allowsEditing: true,

          aspect: [1, 1],
        });

      if (result.canceled) return;

      const asset = result.assets[0];

      uploadFile(asset);
    } catch (err) {
      console.log(err);
    }
  };

  /* =========================================================
     UPLOAD FILE
  ========================================================= */

  const uploadFile = async (
    file: ImagePicker.ImagePickerAsset
  ) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append(
        'file',
        {
          uri: file.uri,
          name:
            file.fileName ||
            `upload-${Date.now()}.jpg`,
          type:
            file.mimeType || 'image/jpeg',
        } as any
      );

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/upload`,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'multipart/form-data',
          },

          body: formData,
        }
      );

      const data = await response.json();

      console.log('UPLOAD RESPONSE', data);

      if (!response.ok) {
        throw new Error(
          data?.message || 'Upload failed'
        );
      }

      /* 🔥 RETURN FULL RESPONSE */
      onChange?.(data);

      Alert.alert(
        'Success',
        'Document uploaded successfully'
      );
    } catch (error: any) {
      console.log('UPLOAD ERROR', error);

      Alert.alert(
        'Upload Failed',
        error?.message ||
          'Something went wrong'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Pressable
      onPress={pickImage}
      style={styles.card}
      disabled={loading}
    >
      {/* LOADING */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />
      ) : value ? (
        <Image
          source={{ uri: value }}
          style={styles.image}
        />
      ) : (
        <GalleryAdd
          size={35}
          color={colors.grayDark}
        />
      )}

      {/* TITLE */}
      <Text style={styles.title}>
        {loading
          ? 'Uploading...'
          : value
          ? `${title} Uploaded`
          : title}
      </Text>

      {/* SUBTITLE */}
      {!value && !loading && (
        <Text style={styles.subtitle}>
          {subtitle}
        </Text>
      )}
    </Pressable>
  );
};

export default UploadCard;

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({
  card: {
    borderWidth: 1.5,

    borderColor: colors.grayLight,

    borderStyle: 'dashed',

    borderRadius: 12,

    paddingVertical: 25,

    paddingHorizontal: 16,

    alignItems: 'center',

    justifyContent: 'center',

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

    textAlign: 'center',
  },

  subtitle: {
    fontFamily: fontFamily.body,

    fontSize: fontSize.xs,

    color: colors.gray,

    marginTop: 3,

    textAlign: 'center',
  },
});