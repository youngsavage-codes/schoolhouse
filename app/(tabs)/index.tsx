'use client';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import React, { useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Add } from 'iconsax-react-native';

import HomeHeader from '@/components/HomeHeader';
import NoticeBoardCarousel from '@/components/NoticeBoardCarousel';
import Dashboard from '@/components/Dashboard';

import { spacing } from '@/constants/spacing';
import { fontSize, fontWeight } from '@/constants/fonts';
import { colors } from '@/constants/colors';
import { dashboardItems } from '@/constants/data';
import { useAuth } from '@/hooks/AuthContext';

type Role = 'admin' | 'teacher' | 'parent';

// ✅ helper (can be moved to utils)
const filterByRole = <T extends { roles?: Role[] }>(
  items: T[],
  role: Role
) => {
  return items.filter((item) =>
    item.roles ? item.roles.includes(role) : true
  );
};

const HomeScreen = () => {
  // 🔥 Replace this with useAuth() later
  const { user } = useAuth()

  // ✅ memoized filtering (better performance)
  const filteredDashboardItems = useMemo(
    () => filterByRole(dashboardItems as any, user?.role as any),
    [user?.role]
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <HomeHeader
          firstName={user?.firstName as any}
          schoolName={user?.lastName as any}
        />
      </View>

      {/* CONTENT */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ANNOUNCEMENTS */}
        <View>
          <View style={styles.rowBetween}>
            <Text style={styles.heading}>Announcement</Text>

            {/* ✅ Only admin can create */}
            {user?.role === 'admin' && (
              <Pressable
                onPress={() =>
                  router.push('/(more)/createAnnouncement')
                }
              >
                <Add size={20} color={colors.primary} />
              </Pressable>
            )}
          </View>

          <NoticeBoardCarousel />
        </View>

        {/* DASHBOARD */}
        <View style={{ marginTop: 15 }}>
          <Text style={styles.sectionHeading}>Dashboard</Text>
          <Dashboard items={filteredDashboardItems as any} />
        </View>

        {/* QUICK ACTIONS (optional) */}
        {/*
        <View style={{ marginTop: 15 }}>
          <Text style={styles.sectionHeading}>Quick Actions</Text>
          <QuickActions actions={filteredQuickActions} />
        </View>
        */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  scrollContent: {
    paddingHorizontal: spacing[4],
    paddingBottom: 20,
  },
  sectionHeading: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.normal,
    marginBottom: 10,
  },
  heading: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.normal,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});