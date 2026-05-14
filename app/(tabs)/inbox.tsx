import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { fontSize, fontWeight, fontFamily } from '@/constants/fonts';
import { spacing } from '@/constants/spacing';
import CustomTextInput from '@/components/inputField';
import AppHeader from '@/components/AppHeader';
import { Profile } from 'iconsax-react-native';
import { router } from 'expo-router';

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  avatar?: string;
  unreadCount?: number;
}

const chats: Chat[] = [
  { id: '1', name: 'Mrs. Johnson', lastMessage: 'Your child did great today!', time: '09:30 AM', unreadCount: 2 },
  { id: '2', name: 'Bright Future Academy', lastMessage: 'Reminder: PTA meeting tomorrow.', time: 'Yesterday' },
  { id: '3', name: 'Mr. Smith', lastMessage: 'Homework submitted.', time: '08:45 AM', unreadCount: 1 },
  { id: '4', name: 'Admin', lastMessage: 'Fee payment is due next week.', time: 'Dec 27' },
];

const InboxScreen = () => {
  const [searchText, setSearchText] = useState('');

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity style={styles.chatItem} onPress={() => router.push('/(more)/message')}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name[0]}</Text>
      </View>
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <View style={styles.chatFooter}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unreadCount ? (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unreadCount}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <AppHeader
        title="Inbox"
        showBackButton
        onBackPress={() => router.back()}
        rightComponent={<Profile size={28} variant="Bulk" color={colors.primary} />}
      />

      {/* SEARCH INPUT */}
      <CustomTextInput
        label=""
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Type a name..."
      />

      {/* CHAT LIST */}
      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
    </SafeAreaView>
  );
};

export default InboxScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing[4],
  },
  header: {
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.body,
    fontWeight: fontWeight.bold,
  },
  chatItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: fontSize.md,
    fontFamily: fontFamily.body,
    fontWeight: fontWeight.medium,
  },
  chatContent: {
    flex: 1,
    justifyContent: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.body,
    fontWeight: fontWeight.bold,
  },
  time: {
    fontSize: fontSize.xs,
    color: '#999',
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.light,
    color: '#555',
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: colors.primary,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginLeft: 8,
  },
  unreadText: {
    color: '#fff',
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
  },
});
