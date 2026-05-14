import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '@/components/AppHeader';
import { spacing } from '@/constants/spacing';
import { router } from 'expo-router';
import { fontFamily, fontWeight } from '@/constants/fonts';
import { colors } from '@/constants/colors';

const sampleNotifications = [
  {
    id: '1',
    title: 'School Resumes Monday',
    message: 'All students should resume school by 8:00am on Monday 12th January.',
    time: '2h ago',
    read: false,
  },
  {
    id: '2',
    title: 'PTA Meeting Reminder',
    message: 'Parents are reminded of the PTA meeting scheduled for Friday.',
    time: '1d ago',
    read: true,
  },
];

const NotificationCard = ({ item }: any) => (
  <View style={[styles.card, !item.read && styles.unread]}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.message}>{item.message}</Text>
    <Text style={styles.time}>{item.time}</Text>
  </View>
);

const Notification = () => {
  return (
    <View style={styles.safe}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.headerWrap}>
          <AppHeader
            title="Notification"
            showBackButton
            onBackPress={() => router.back()}
          />
        </View>

        {/* If empty */}
        {sampleNotifications.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>No notifications yet</Text>
          </View>
        ) : (
          <FlatList
            contentContainerStyle={{ padding: spacing[4] }}
            data={sampleNotifications}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <NotificationCard item={item} />}
            showsVerticalScrollIndicator={false}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerWrap: {
    paddingHorizontal: spacing[4],
  },

  /* Notification Card */
  card: {
    padding: spacing[4],
    backgroundColor: '#F7F7F7',
    marginBottom: spacing[3],
    borderRadius: 12,
  },
  unread: {
    backgroundColor: '#EAF2FF',
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  title: {
    fontSize: 16,
    fontWeight: fontWeight.bold,
    marginBottom: spacing[1],
    fontFamily: fontFamily.heading
  },
  message: {
    fontSize: 14,
    fontFamily: fontFamily.body,
    fontWeight: fontWeight.medium,
    color: colors.grayDark,
    marginBottom: spacing[2],
  },
  time: {
    fontSize: 12,
    color: '#777',
    textAlign: 'right',
  },

  /* Empty State */
  emptyWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
