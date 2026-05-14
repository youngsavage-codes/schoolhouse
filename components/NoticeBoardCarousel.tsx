'use client';

import { colors } from '@/constants/colors';
import { fontFamily, fontSize, fontWeight } from '@/constants/fonts';
import { useAuth } from '@/hooks/AuthContext';
import { useFetch } from '@/hooks/useFetch';
import { router } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import Swiper from 'react-native-swiper';

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.9;
const CARD_HEIGHT = 180;

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1080';

const NoticeBoardCarousel = () => {
  const { user } = useAuth()
  const { data, isLoading } = useFetch({
    url: `/announcements/school/${user?.id}`, // ✅ replace dynamically
    keys: ['announcements'],
  });

  const announcements = data?.data || [];

  const handlePress = (notice: any) => {
    router.push({
      pathname: '/(more)/announcementDetails',
      params: { id: notice.id }, // ✅ pass id
    });
  };

  // ✅ Loading state
  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  // ✅ Empty state
  if (!announcements.length) {
    return (
      <View style={styles.loader}>
        <Text>No announcements available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Swiper
        height={CARD_HEIGHT + 30}
        showsPagination
        loop={false}
        autoplay
        autoplayTimeout={4}
        activeDotColor={colors.primary}
        dotColor="#ccc"
        paginationStyle={{ bottom: -5 }}
      >
        {announcements.map((notice: any) => (
          <View key={notice.id} style={styles.slide}>
            <ImageBackground
              source={{
                uri: notice.image || FALLBACK_IMAGE, // ✅ fallback
              }}
              style={styles.card}
              imageStyle={styles.cardImage}
            >
              {/* Overlay */}
              <View style={styles.overlay} />

              <View style={styles.cardContent}>
                <Text style={styles.title}>{notice.title}</Text>
                <Text style={styles.desc} numberOfLines={2}>
                  {notice.content}
                </Text>

                {notice.scheduledAt && (
                  <Text style={styles.date}>
                    {new Date(notice.scheduledAt).toDateString()}
                  </Text>
                )}
              </View>

              <Pressable
                style={styles.button}
                onPress={() => handlePress(notice)}
              >
                <Text style={styles.buttonText}>View Details</Text>
              </Pressable>
            </ImageBackground>
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default NoticeBoardCarousel;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: 200,
  },
  slide: {
    width: '100%',
    alignItems: 'center',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden',
    padding: 20,
    justifyContent: 'space-between',
  },
  cardImage: {
    borderRadius: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  cardContent: {
    zIndex: 2,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: '#fff',
    fontFamily: fontFamily.body,
    marginBottom: 6,
  },
  desc: {
    fontSize: fontSize.sm,
    color: '#f1f1f1',
    fontFamily: fontFamily.body,
  },
  date: {
    fontSize: fontSize.xs,
    color: '#e5e5e5',
    marginTop: 6,
    fontFamily: fontFamily.body,
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    zIndex: 2,
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