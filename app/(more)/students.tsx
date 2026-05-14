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

const dummyStudents = [
  {
    id: '1',
    name: 'Musa Ibrahim',
    class: 'JSS 2A',
    image:
      'https://api.dicebear.com/7.x/initials/png?seed=Musa%20Ibrahim&radius=50',
    isActive: true,
  },
  {
    id: '2',
    name: 'Sarah Daniel',
    class: 'SSS 1B',
    image:
      'https://api.dicebear.com/7.x/initials/png?seed=Sarah%20Daniel&radius=50',
    isActive: false,
  },
  {
    id: '3',
    name: 'John Okafor',
    class: 'Primary 4',
    image:
      'https://api.dicebear.com/7.x/initials/png?seed=John%20Okafor&radius=50',
    isActive: true,
  },
];

const Students = () => {
  const handleSelectStudent = (student: any) => {
    router.push('/(more)/studentDetails');
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* APP HEADER */}
      <View style={{paddingHorizontal: 10}}>
        <AppHeader 
            title="Students" 
            showBackButton
            onBackPress={() => router.back()}
        />
      </View>

      <View style={styles.container}>
        <FlatList
          data={dummyStudents}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 50 }}
          renderItem={({ item }) => (
            <Pressable
              style={styles.row}
              onPress={() => handleSelectStudent(item)}
            >
              <Image source={{ uri: item.image }} style={styles.avatar} />

              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.class}>{item.class}</Text>
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
      </View>
    </SafeAreaView>
  );
};

export default Students;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
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

  class: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.body,
    color: colors.grayDark,
    marginTop: 2,
  },

  statusIndicator: {
    width: 9,
    height: 9,
    borderRadius: 10,
  },
});
