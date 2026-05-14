import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fontFamily, fontSize, fontWeight } from '@/constants/fonts';
import { colors } from '@/constants/colors';
import AppHeader from '@/components/AppHeader';
import { router } from 'expo-router';

const dummyClasses = [
  { id: '1', name: 'Primary 1', teacher: 'Mrs. Aisha Bello' },
  { id: '2', name: 'Primary 2', teacher: 'Mr. John Okafor' },
  { id: '3', name: 'JSS 1', teacher: 'Mrs. Sarah Daniel' },
  { id: '4', name: 'JSS 2', teacher: 'Mr. Musa Ibrahim' },
  { id: '5', name: 'SSS 1', teacher: 'Mrs. Fatima Bello' },
];

const Classes = () => {
  const handleSelectClass = (cls: any) => {
    router.push('/(more)/classDetails');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={{ paddingHorizontal: 10 }}>
        <AppHeader
          title="Classes"
          showBackButton
          onBackPress={() => router.back()}
        />
      </View>

      <View style={styles.container}>
        <FlatList
          data={dummyClasses}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 50 }}
          renderItem={({ item }) => (
            <Pressable
              style={styles.row}
              onPress={() => handleSelectClass(item)}
            >
              <View>
                <Text style={styles.className}>{item.name}</Text>
                <Text style={styles.teacherName}>Teacher: {item.teacher}</Text>
              </View>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Classes;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  row: {
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.grayLight,
  },
  className: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    fontFamily: fontFamily.heading,
    color: colors.text,
  },
  teacherName: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.body,
    color: '#555',
    marginTop: 3,
  },
});
