'use client';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { fontSize, fontFamily, fontWeight } from '@/constants/fonts';
import { spacing } from '@/constants/spacing';
import AppHeader from '@/components/AppHeader';
import { router } from 'expo-router';
import { useFetch } from '@/hooks/useFetch';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1080';

const AnnouncementDetails = () => {
  const route = useRoute();

  // ✅ Get ID from params
  const { id } = (route.params as { id: string }) || {};

  // ❌ if no id, go back (defensive)
  if (!id) {
    router.back();
    return null;
  }

  // ✅ Fetch single announcement
  const { data, isLoading } = useFetch({
    url: `/announcements/${id}`, // ✅ correct endpoint
    keys: [`announcement-${id}`],
  });

  const announcement = data?.data;

  // ✅ Loading state
  if (isLoading) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator color={colors.primary} />
      </SafeAreaView>
    );
  }

  // ✅ Empty state
  if (!announcement) {
    return (
      <SafeAreaView style={styles.loader}>
        <Text>Announcement not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader
        title="Announcement"
        showBackButton
        onBackPress={() => router.back()}
      />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Image */}
        <Image
          source={{
            uri: announcement.image || FALLBACK_IMAGE,
          }}
          style={styles.image}
        />

        {/* Title */}
        <Text style={styles.title}>{announcement.title}</Text>

        {/* Meta */}
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>
            Posted by {announcement.author || 'School Admin'}
          </Text>
          <Text style={styles.metaDot}>•</Text>
          <Text style={styles.metaText}>
            {announcement.scheduledAt
              ? new Date(announcement.scheduledAt).toDateString()
              : 'No date'}
          </Text>
        </View>

        {/* Content */}
        <Text style={styles.content}>{announcement.content}</Text>

        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnnouncementDetails;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: spacing[3],
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: spacing[2],
    marginBottom: spacing[3],
    backgroundColor: '#f3f4f6',
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing[1],
    fontFamily: fontFamily.heading,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  metaText: {
    fontSize: fontSize.xs,
    color: '#6B7280',
    fontFamily: fontFamily.body,
  },
  metaDot: {
    marginHorizontal: 6,
    fontSize: 10,
    color: '#6B7280',
  },
  content: {
    fontSize: fontSize.sm,
    lineHeight: 22,
    color: '#374151',
    fontFamily: fontFamily.body,
  },
  buttonText: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    fontFamily: fontFamily.body,
  },
  loader: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
