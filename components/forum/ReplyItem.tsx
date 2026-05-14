import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { fontSize, fontWeight } from '@/constants/fonts';
import { spacing } from '@/constants/spacing';

export interface Reply {
  id: string;
  author: string;
  content: string;
  time: string;
}

interface ReplyItemProps {
  reply: Reply;
}

const ReplyItem: React.FC<ReplyItemProps> = ({ reply }) => (
  <View style={styles.container}>
    <Text style={styles.author}>{reply.author}</Text>
    <Text style={styles.content}>{reply.content}</Text>
    <Text style={styles.time}>{reply.time}</Text>
  </View>
);

export default ReplyItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent', // no background, keep it minimal
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E7EB', // subtle bottom border
  },
  author: {
    fontWeight: fontWeight.bold,
    fontSize: fontSize.sm,
    marginBottom: 2,
    color: colors.text,
  },
  content: {
    fontSize: fontSize.sm,
    color: colors.gray,
    fontWeight: fontWeight.light,
    marginBottom: 2,
  },
  time: {
    fontSize: fontSize.xs,
    color: colors.gray,
    alignSelf: 'flex-end',
  },
});
