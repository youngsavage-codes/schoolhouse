import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Send, Heart, Message } from 'iconsax-react-native';
import { colors } from '@/constants/colors';
import { fontSize, fontFamily, fontWeight } from '@/constants/fonts';
import { spacing } from '@/constants/spacing';
import ReplyItem from './ReplyItem';
import { router } from 'expo-router';

export interface Reply {
  id: string;
  author: string;
  content: string;
  time: string;
}

export interface Post {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  time: string;
  likes: number;
  replies?: Reply[];
  showReplyInput?: boolean;
  liked?: boolean;
}

interface PostItemProps {
  post: Post;
  toggleLike: (postId: string) => void;
  toggleReplyInput: (postId: string) => void;
  sendReply: (postId: string) => void;
  replyText: string;
  setReplyText: (text: string) => void;
}

const PostItem: React.FC<PostItemProps> = ({
  post,
  toggleLike,
  toggleReplyInput,
  sendReply,
  replyText,
  setReplyText,
}) => {
  return (
    <TouchableOpacity 
    onPress={() => router.push('/(more)/forumDetails')}
    style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image
          source={{ uri: post.avatar || 'https://i.pravatar.cc/150?img=1' }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.author}>{post.author}</Text>
          <Text style={styles.date}>{post.time}</Text>
        </View>
      </View>

      <Text style={styles.content}>{post.content}</Text>

      {/* Social Buttons */}
      <View style={styles.socialRow}>
        <TouchableOpacity onPress={() => toggleLike(post.id)} style={styles.socialButton}>
          <Heart
            size={18}
            color={post.liked ? colors.primary : '#999'}
            variant={post.liked ? 'Bold' : 'Outline'}
          />
          <Text style={styles.socialCount}>{post.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => toggleReplyInput(post.id)}
          style={styles.socialButton}
        >
          <Message size={18} color="#999" variant="Outline" />
          <Text style={styles.socialCount}>{post.replies?.length || 0}</Text>
        </TouchableOpacity>
      </View>

{/* Replies */}
{post.replies?.slice(0, 2).map((reply) => (
  <ReplyItem key={reply.id} reply={reply} />
))}

      {/* Reply Input */}
      {post.showReplyInput && (
        <View style={styles.replyInputWrapper}>
          <TextInput
            style={styles.replyInput}
            placeholder="Write a reply..."
            placeholderTextColor="#9CA3AF"
            value={replyText}
            onChangeText={setReplyText}
            multiline
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => sendReply(post.id)}
          >
            <Send size={20} color="#fff" variant="Bold" />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#fff',
    padding: spacing[3],
    borderRadius: spacing[2],
    marginBottom: spacing[3],
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing[2],
  },
  author: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.body,
    fontWeight: fontWeight.bold,
  },
  date: {
    fontSize: fontSize.xs,
    color: '#999',
  },
  content: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.body,
    marginBottom: 6,
    color: colors.text,
  },
  socialRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing[4],
  },
  socialCount: {
    marginLeft: 4,
    fontSize: fontSize.xs,
    color: '#555',
  },
  replyInputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 6,
    paddingVertical: 4,
  },
  replyInput: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderRadius: 25,
    fontSize: fontSize.sm,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    maxHeight: 100,
  },
  sendButton: {
    marginLeft: spacing[2],
    backgroundColor: colors.primary,
    padding: spacing[2],
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
