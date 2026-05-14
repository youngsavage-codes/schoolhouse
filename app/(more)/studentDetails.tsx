import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fontFamily, fontSize } from '@/constants/fonts';
import { colors } from '@/constants/colors';
import AppHeader from '@/components/AppHeader';
import { router } from 'expo-router';

const StudentDetails = ({ route }: any) => {
  // General details
  const student = route?.params?.student || {
    name: 'Musa Ibrahim',
    class: 'JSS 2A',
    image:
      'https://api.dicebear.com/7.x/initials/png?seed=Musa%20Ibrahim&radius=50',
    isActive: true,
    address: '123 Main Street, Lagos',
    parentName: 'Abdul Ibrahim',
    parentContact: '08012345678',
    parentOccupation: 'Engineer',
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={{ paddingHorizontal: 10 }}>
        <AppHeader
          title="Student Details"
          showBackButton
          onBackPress={() => router.back()}
        />
      </View>

      <View style={styles.container}>
        {/* PROFILE IMAGE */}
        <View style={styles.center}>
          <Image source={{ uri: student.image }} style={styles.avatar} />
          <Text style={styles.name}>{student.name}</Text>
          <Text style={styles.class}>{student.class}</Text>

          <View
            style={[
              styles.statusTag,
              { backgroundColor: student.isActive ? '#4CAF50' : '#F44336' },
            ]}
          >
            <Text style={styles.statusText}>
              {student.isActive ? 'Active' : 'Inactive'}
            </Text>
          </View>
        </View>

        {/* GENERAL INFO */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Student Information</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Full Name:</Text>
            <Text style={styles.infoValue}>{student.name}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Class:</Text>
            <Text style={styles.infoValue}>{student.class}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status:</Text>
            <Text style={styles.infoValue}>
              {student.isActive ? 'Active' : 'Inactive'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Address:</Text>
            <Text style={styles.infoValue}>{student.address}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Parent Name:</Text>
            <Text style={styles.infoValue}>{student.parentName}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Parent Contact:</Text>
            <Text style={styles.infoValue}>{student.parentContact}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Parent Occupation:</Text>
            <Text style={styles.infoValue}>{student.parentOccupation}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StudentDetails;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  center: {
    alignItems: 'center',
    marginBottom: 25,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 100,
    marginBottom: 10,
  },

  name: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.heading,
    color: '#333',
  },

  class: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.body,
    color: '#777',
    marginTop: 3,
  },

  statusTag: {
    marginTop: 8,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 20,
  },

  statusText: {
    color: '#fff',
    fontFamily: fontFamily.body,
    fontSize: fontSize.xs,
  },

  infoCard: {
    backgroundColor: '#FAFAFA',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },

  sectionTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.heading,
    marginBottom: 15,
    color: colors.primary,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  infoLabel: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.body,
    color: '#555',
  },

  infoValue: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.body,
    color: '#222',
  },
});
