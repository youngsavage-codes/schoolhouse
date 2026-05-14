import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '@/components/AppHeader';
import { colors } from '@/constants/colors';
import { fontSize, fontFamily, fontWeight } from '@/constants/fonts';
import { spacing } from '@/constants/spacing';
import { Send, Gallery, CloseCircle } from 'iconsax-react-native';
import { router } from 'expo-router';

const CreatePostScreen = () => {
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = () => {
    if (!content.trim() && images.length === 0) {
      Alert.alert('Post cannot be empty');
      return;
    }
    console.log({ content, images });
    Alert.alert('Post created!');
    setContent('');
    setImages([]);
  };

  const pickImage = () => {
    // Replace with actual image picker
    const fakeImage = `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`;
    setImages((prev) => [...prev, fakeImage]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <AppHeader
        title="Create Post"
        showBackButton
        onBackPress={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Post Input */}
        <TextInput
          style={styles.input}
          placeholder="What's on your mind?"
          placeholderTextColor="#9CA3AF"
          value={content}
          onChangeText={setContent}
          multiline
        />

        {/* Image Preview Row */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imageScroll}
        >
          {images.map((uri, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri }} style={styles.imagePreview} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeImage(index)}
              >
                <CloseCircle size={20} color="#fff" variant="Bold" />
              </TouchableOpacity>
            </View>
          ))}

          {/* Add Image Button */}
          <TouchableOpacity style={styles.addImageButton} onPress={pickImage}>
            <Gallery size={24} color="#9CA3AF" variant="Outline" />
            <Text style={styles.addImageText}>Add Photo</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Send size={20} color="#fff" variant="Bold" />
          <Text style={styles.submitText}>Post</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: spacing[4],
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: spacing[2],
    padding: spacing[3],
    fontSize: fontSize.sm,
    color: colors.text,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: spacing[3],
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  imageScroll: {
    flexDirection: 'row',
    marginBottom: spacing[4],
  },
  imageWrapper: {
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: spacing[2],
    overflow: 'hidden',
    marginRight: spacing[3],
    backgroundColor: '#f3f4f6',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  removeButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 12,
    padding: 2,
  },
  addImageButton: {
    width: 100,
    height: 100,
    borderRadius: spacing[2],
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  addImageText: {
    color: '#9CA3AF',
    fontSize: fontSize.xs,
    marginTop: spacing[1],
    textAlign: 'center',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing[3],
    borderRadius: spacing[2],
  },
  submitText: {
    color: '#fff',
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    marginLeft: spacing[2],
  },
});
