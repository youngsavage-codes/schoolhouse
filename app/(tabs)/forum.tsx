import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Messages1, Profile } from 'iconsax-react-native';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import AppHeader from '@/components/AppHeader';
import PostItem, { Post } from '@/components/forum/PostItem';
import { router } from 'expo-router';

// Initial posts
const initialPosts: Post[] = [
  {
    id: '1',
    author: 'Mr. Smith',
    avatar: 'https://i.pravatar.cc/150?img=32',
    content: 'Good morning students! Please remember to submit your math homework by tomorrow. 📚✏️',
    time: '2025-11-29',
    likes: 5,
    replies: [
      { id: 'r1', author: 'Jane Doe', content: 'Thanks for the reminder, Mr. Smith!', time: '09:10 AM' },
    ],
  },
  {
    id: '2',
    author: 'Jane Doe',
    avatar: 'https://i.pravatar.cc/150?img=47',
    content: 'Does anyone want to form a study group for the upcoming science test? 🔬',
    time: '2025-11-29',
    likes: 3,
    replies: [
      { id: 'r2', author: 'John Lee', content: 'I’m in! When do you want to meet?', time: '09:20 AM' },
      { id: 'r3', author: 'Jane Doe', content: 'How about after school today in the library?', time: '09:25 AM' },
    ],
  },
];

const ForumScreen = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [replyTexts, setReplyTexts] = useState<{ [key: string]: string }>({});

  // Toggle like
  const toggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
      )
    );
  };

  // Toggle reply input
  const toggleReplyInput = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, showReplyInput: !p.showReplyInput } : p
      )
    );
  };

  // Send reply
  const sendReply = (postId: string) => {
    const replyText = replyTexts[postId];
    if (!replyText?.trim()) return;

    const newReply = {
      id: Math.random().toString(),
      author: 'You',
      content: replyText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, replies: [...(p.replies || []), newReply], showReplyInput: false }
          : p
      )
    );

    setReplyTexts((prev) => ({ ...prev, [postId]: '' }));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <View style={{paddingHorizontal: 10}}>
        <AppHeader
          title="School Forum"
          showBackButton
          onBackPress={() => router.back()}
          rightComponent={<Messages1 size={28} variant="Bulk" color={colors.primary} />}
          onRightPress={() => router.push('/(more)/createPost')}
        />
      </View>


      {/* Posts List */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostItem
            post={item}
            toggleLike={toggleLike}
            toggleReplyInput={toggleReplyInput}
            sendReply={sendReply}
            replyText={replyTexts[item.id] || ''}
            setReplyText={(text) =>
              setReplyTexts((prev) => ({ ...prev, [item.id]: text }))
            }
          />
        )}
        contentContainerStyle={{ padding: spacing[4] }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ForumScreen;
