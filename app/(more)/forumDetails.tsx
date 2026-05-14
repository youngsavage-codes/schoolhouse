import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '@/components/AppHeader';
import { colors } from '@/constants/colors';
import { fontSize, fontWeight, fontFamily } from '@/constants/fonts';
import { spacing } from '@/constants/spacing';
import { Heart, Message, Send2 } from 'iconsax-react-native';
import { router } from 'expo-router';

const ForumDetails = () => {
  const [comment, setComment] = useState('');

  const comments = [
    {
      id: '1',
      name: 'Mrs. Jessica',
      avatar: 'https://i.pravatar.cc/150?img=12',
      text: 'Great update. Thank you for sharing!',
    },
    {
      id: '2',
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=22',
      text: 'Looking forward to the school event!',
    },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER */}
      <AppHeader
        title="Forum Post"
        showBackButton
        onBackPress={() => router.back()}
      />

      <View style={styles.container}>
        {/* POST HEADER */}
        <View style={styles.postHeader}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=35' }}
            style={styles.avatar}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>Greenfield School</Text>
            <Text style={styles.time}>2 hours ago</Text>
          </View>
        </View>

        {/* POST CONTENT */}
        <Text style={styles.postText}>
          We are excited to announce the upcoming inter-house sports event. 
          All students are encouraged to participate actively.
        </Text>

        <Image
          source={{ uri: 'https://i.pravatar.cc/400?img=55' }}
          style={styles.postImage}
        />

        {/* POST STATS */}
        <View style={styles.statsRow}>
          <View style={styles.statsLeft}>
            <Heart size={20} color={colors.primary} variant="Bold" />
            <Text style={styles.statText}>124 Likes</Text>
          </View>

          <View style={styles.statsLeft}>
            <Message size={20} color={colors.primary} variant="Bold" />
            <Text style={styles.statText}>{comments.length} Comments</Text>
          </View>
        </View>

        {/* COMMENTS LIST */}
        <Text style={styles.commentsHeader}>Comments</Text>
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.commentItem}>
              <Image source={{ uri: item.avatar }} style={styles.commentAvatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.commentName}>{item.name}</Text>
                <Text style={styles.commentText}>{item.text}</Text>
              </View>
            </View>
          )}
          scrollEnabled={false}
        />
      </View>

      {/* COMMENT INPUT */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Add a comment..."
            placeholderTextColor="#9CA3AF"
            value={comment}
            onChangeText={setComment}
            multiline
          />

          <TouchableOpacity style={styles.sendButton}>
            <Send2 size={22} color={colors.primary} variant="Bold" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForumDetails;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: spacing[4],
    flex: 1,
  },

  // POST HEADER
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22,
    marginRight: spacing[3],
  },
  name: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.text,
  },
  time: {
    fontSize: fontSize.xs,
    color: colors.gray,
  },

  // POST CONTENT
  postText: {
    fontSize: fontSize.base,
    color: colors.grayDark,
    marginBottom: spacing[3],
  },
  postImage: {
    width: '100%',
    height: 240,
    borderRadius: spacing[2],
    marginBottom: spacing[3],
  },

  // STATS
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing[4],
  },
  statsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: fontSize.sm,
    color: '#6B7280',
  },

  // COMMENTS
  commentsHeader: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    marginBottom: spacing[2],
    color: colors.text,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: spacing[3],
  },
  commentAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: spacing[2],
  },
  commentName: {
    fontWeight: fontWeight.bold,
    fontSize: fontSize.sm,
    color: colors.text,
  },
  commentText: {
    fontSize: fontSize.xs,
    color: colors.grayDark,
  },

  // INPUT BAR
  inputRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'flex-end',
    backgroundColor: colors.background,
  },
  input: {
    flex: 1,
    maxHeight: 120,
    padding: spacing[2],
    paddingHorizontal: spacing[3],
    borderRadius: spacing[2],
    backgroundColor: '#F3F4F6',
    fontSize: fontSize.base,
    color: colors.text,
  },
  sendButton: {
    marginLeft: spacing[2],
  },
});
