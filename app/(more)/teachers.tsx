import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { fontFamily, fontSize, fontWeight } from '@/constants/fonts';
import { router } from 'expo-router';
import AppHeader from '@/components/AppHeader';

const dummyTeachers = [
  {
    id: '1',
    name: 'Mrs. Amina Yusuf',
    subject: 'Mathematics',
    image:
      'https://api.dicebear.com/7.x/initials/png?seed=Amina%20Yusuf&radius=50',
    isActive: true,
  },
  {
    id: '2',
    name: 'Mr. John Okeke',
    subject: 'English',
    image:
      'https://api.dicebear.com/7.x/initials/png?seed=John%20Okeke&radius=50',
    isActive: false,
  },
  {
    id: '3',
    name: 'Miss Sarah Bello',
    subject: 'Science',
    image:
      'https://api.dicebear.com/7.x/initials/png?seed=Sarah%20Bello&radius=50',
    isActive: true,
  },
];

const Teachers = () => {
  const handleSelectTeacher = (teacher: any) => {
    router.push('/(more)/teacherDetails');
  };

  return (
    <SafeAreaView style={styles.container}>
        <AppHeader 
            title="Teachers" 
            showBackButton
            onBackPress={() => router.back()}
        />

      <FlatList
        data={dummyTeachers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 50 }}
        renderItem={({ item }) => (
          <Pressable
            style={styles.row}
            onPress={() => handleSelectTeacher(item)}
          >
            <Image source={{ uri: item.image }} style={styles.avatar} />

            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.subject}>{item.subject}</Text>
            </View>

            <View
              style={[
                styles.statusIndicator,
                { backgroundColor: item.isActive ? '#4CAF50' : '#F44336' },
              ]}
            />
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

export default Teachers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.grayLight,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginRight: 15,
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.heading,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },

  subject: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.body,
    color: '#666',
    marginTop: 2,
  },

  statusIndicator: {
    width: 9,
    height: 9,
    borderRadius: 10,
  },
});
