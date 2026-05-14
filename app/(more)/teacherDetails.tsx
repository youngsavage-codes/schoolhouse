import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fontFamily, fontSize } from '@/constants/fonts';
import { colors } from '@/constants/colors';
import AppHeader from '@/components/AppHeader';
import { router } from 'expo-router';

const TeacherDetails = ({ route }: any) => {
  const teacher = route?.params?.teacher || {
    name: 'Mrs. Aisha Bello',
    subject: 'Mathematics',
    image:
      'https://api.dicebear.com/7.x/initials/png?seed=Aisha%20Bello&radius=50',
    isActive: true,
    address: '45 Broad Street, Lagos',
    contact: '08098765432',
    occupation: 'Teacher',
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={{ paddingHorizontal: 10 }}>
        <AppHeader
          title="Teacher Details"
          showBackButton
          onBackPress={() => router.back()}
        />
      </View>

      <View style={styles.container}>
        {/* PROFILE IMAGE */}
        <View style={styles.center}>
          <Image source={{ uri: teacher.image }} style={styles.avatar} />
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>

          <View
            style={[
              styles.statusTag,
              { backgroundColor: teacher.isActive ? '#4CAF50' : '#F44336' },
            ]}
          >
            <Text style={styles.statusText}>
              {teacher.isActive ? 'Active' : 'Inactive'}
            </Text>
          </View>
        </View>

        {/* GENERAL INFO */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Teacher Information</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Full Name:</Text>
            <Text style={styles.infoValue}>{teacher.name}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Subject:</Text>
            <Text style={styles.infoValue}>{teacher.subject}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status:</Text>
            <Text style={styles.infoValue}>
              {teacher.isActive ? 'Active' : 'Inactive'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Address:</Text>
            <Text style={styles.infoValue}>{teacher.address}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Contact:</Text>
            <Text style={styles.infoValue}>{teacher.contact}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Occupation:</Text>
            <Text style={styles.infoValue}>{teacher.occupation}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TeacherDetails;

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

  subject: {
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
