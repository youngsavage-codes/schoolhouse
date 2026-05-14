// screens/MessageScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  LayoutAnimation,
} from 'react-native';
import { colors } from '@/constants/colors';
import { fontSize, fontWeight, fontFamily } from '@/constants/fonts';
import { spacing } from '@/constants/spacing';
import { Send, ArrowLeft2 } from 'iconsax-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  time: string;
}

const initialMessages: Message[] = [
  { id: '1', text: 'Hello! How are you?', sender: 'other', time: '09:00 AM' },
  { id: '2', text: 'I am good, thanks! You?', sender: 'me', time: '09:01 AM' },
  { id: '3', text: 'Doing great. Have you seen the latest update?', sender: 'other', time: '09:02 AM' },
];

const MessageScreen = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [inputHeight, setInputHeight] = useState(40);
  const flatListRef = useRef<FlatList>(null);

  const chatUser = {
    name: 'Mrs. Johnson',
    avatar: '',
    status: 'Online',
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Math.random().toString(),
      text: inputText,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMessage]);
    setInputText('');
    setInputHeight(40); // Reset input height after sending

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isMe = item.sender === 'me';
    return (
      <View
        style={[
          styles.messageContainer,
          isMe ? styles.myMessage : styles.otherMessage,
        ]}
      >
        <Text style={[styles.messageText, { color: isMe ? '#fff' : colors.text }]}>
          {item.text}
        </Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft2 size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{chatUser.name[0]}</Text>
          </View>
          <View>
            <Text style={styles.userName}>{chatUser.name}</Text>
            <Text style={styles.userStatus}>{chatUser.status}</Text>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        {/* CHAT LIST */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: spacing[4], paddingBottom: 10 }}
        />

        {/* MODERN EXPANDING INPUT */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, { height: inputHeight }]}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Message..."
            placeholderTextColor="#9CA3AF"
            multiline
            onContentSizeChange={(event) => {
              LayoutAnimation.easeInEaseOut();
              const height = event.nativeEvent.contentSize.height + 10;
              setInputHeight(height < 120 ? height : 120); // Max height 120
            }}
          />
          <TouchableOpacity
            onPress={sendMessage}
            style={[
              styles.sendButton,
              { opacity: inputText.trim() ? 1 : 0.5 },
            ]}
            disabled={!inputText.trim()}
          >
            <Send size={22} color="#fff" variant="Bold" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  userInfo: { flexDirection: 'row', alignItems: 'center', marginLeft: spacing[3] },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[3],
  },
  avatarText: { color: '#fff', fontSize: fontSize.base, fontFamily: fontFamily.body, fontWeight: fontWeight.bold },
  userName: { fontSize: fontSize.sm, fontFamily: fontFamily.body, fontWeight: fontWeight.bold },
  userStatus: { fontSize: fontSize.xs, color: '#999' },

  messageContainer: {
    maxWidth: '75%',
    marginBottom: spacing[2],
    padding: spacing[3],
    borderRadius: 16,
  },
  myMessage: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  otherMessage: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
    borderWidth: 1,
    borderColor: '#eee',
  },
  messageText: { fontSize: fontSize.sm, fontFamily: fontFamily.body, fontWeight: fontWeight.normal },
  timeText: { fontSize: fontSize.xs, color: '#999', marginTop: 2, alignSelf: 'flex-end' },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderRadius: 25,
    fontSize: fontSize.sm,
    color: colors.text,
    paddingHorizontal: spacing[4],
    paddingVertical: 10,
    maxHeight: 120,
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
