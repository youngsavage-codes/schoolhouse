import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '@/components/AppHeader';
import { colors } from '@/constants/colors';
import { fontFamily, fontSize, fontWeight } from '@/constants/fonts';
import { router } from 'expo-router';
import { useFetch } from '@/hooks/useFetch';
import { useMutationApi } from '@/hooks/useMutation';

// Dummy requests data
const dummyRequests = [
  {
    id: 'r1',
    type: 'teacher',
    name: 'Mr. Musa Ibrahim',
    role: 'Teacher',
    description: 'Request to join the platform as a teacher under your school.',
  },
  {
    id: 'r2',
    type: 'parent',
    name: 'Fatima Daniel',
    role: 'Parent',
    description: 'Request to join as a parent and link children to your school.',
  },
  {
    id: 'r3',
    type: 'child',
    name: 'Sarah Daniel',
    parent: 'Fatima Daniel',
    class: 'JSS 2A',
    description: 'Parent requests to add this child to the school platform.',
  },
];

const Requests = () => {
  const [requests, setRequests] = useState(dummyRequests);

  const handlePress = (request: any) => {
    router.push('/(more)/requestDetails');
  };

  const {} = useFetch({
    url: '/approvals/pending',
    keys: ['requests']
  })

  const approveParentsMutation = useMutationApi({
    url: (parent_id: string) =>  `/approvals/parent/${parent_id}/approve`,
    invalidateKeys: ['requests']
  })

  const approveTeacherMutation = useMutationApi({
    url: (teacher_id: string) => `/approvals/teacher/${teacher_id}/approve`,
    invalidateKeys: ['requests']
  })

  const renderItem = ({ item }: any) => (
    <TouchableOpacity onPress={() => handlePress(item)} style={styles.row}>
      <Text style={styles.header}>
        {item.type === 'teacher'
          ? 'Teacher Request'
          : item.type === 'parent'
          ? 'Parent Request'
          : 'Child Request'}
      </Text>
      <Text style={styles.description}>
        {item.name} {item.type === 'child' ? `(Class: ${item.class})` : `- ${item.role}`}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={{ paddingHorizontal: 10 }}>
        <AppHeader
          title="Requests"
          showBackButton
          onBackPress={() => router.back()}
        />
      </View>

      <View style={styles.container}>
        {requests.length === 0 ? (
          <Text style={styles.emptyText}>No pending requests</Text>
        ) : (
          <FlatList
            data={requests}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Requests;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: 'white' },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 10 },

  row: {
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.grayLight,
  },

  header: {
    fontSize: fontSize.sm + 2,
    fontFamily: fontFamily.heading,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: 4,
  },

  description: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.body,
    color: '#555',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: fontSize.sm,
    color: colors.grayDark,
  },
});
