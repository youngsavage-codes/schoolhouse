import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '@/components/AppHeader';
import { colors } from '@/constants/colors';
import { fontFamily, fontSize, fontWeight } from '@/constants/fonts';
import { router } from 'expo-router';
import { useFetch } from '@/hooks/useFetch';

const RequestDetails = () => {
  // Dummy request data

  const {} = useFetch({
    url: '/approvals/pending',
    keys: ['requests']
  })

  const request = {
    id: 'r1',
    type: 'teacher',
    name: 'Mr. Musa Ibrahim',
    role: 'Teacher',
    description: 'Request to join the platform as a teacher under your school.',
    image: 'https://randomuser.me/api/portraits/men/75.jpg', // Example image
  };

  const handleApprove = () => {
    alert('Request approved successfully');
    router.back();
  };

  const handleReject = () => {
    alert('Request rejected');
    router.back();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={{ paddingHorizontal: 10 }}>
        <AppHeader
          title="Request Details"
          showBackButton
          onBackPress={() => router.back()}
        />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: request.image }} style={styles.image} />
        </View>

        {/* Header */}
        <Text style={styles.header}>
          {request.type === 'teacher'
            ? 'Teacher Request'
            : request.type === 'parent'
            ? 'Parent Request'
            : 'Child Request'}
        </Text>

        {/* Description */}
        <Text style={styles.description}>{request.description}</Text>

        {/* Details */}
        <View style={styles.infoCard}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{request.name}</Text>

          {request.type === 'teacher' || request.type === 'parent' ? (
            <>
              <Text style={styles.label}>Role:</Text>
              <Text style={styles.value}>{request.role}</Text>
            </>
          ) : (
            <>
              <Text style={styles.label}>Class:</Text>
              <Text style={styles.value}>{request?.class}</Text>

              <Text style={styles.label}>Parent:</Text>
              <Text style={styles.value}>{request?.parent}</Text>
            </>
          )}
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, { backgroundColor: '#4CAF50' }]}
            onPress={handleApprove}
          >
            <Text style={styles.buttonText}>Approve</Text>
          </Pressable>
          <Pressable
            style={[styles.button, { backgroundColor: '#F44336', marginLeft: 10 }]}
            onPress={handleReject}
          >
            <Text style={styles.buttonText}>Reject</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RequestDetails;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: 'white' },
  container: { paddingHorizontal: 20, paddingVertical: 20 },

  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.primary,
  },

  header: {
    fontSize: fontSize.md + 2,
    fontFamily: fontFamily.heading,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: 10,
    textAlign: 'center',
  },

  description: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.body,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },

  infoCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 30,
  },

  label: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.body,
    color: '#777',
    marginTop: 10,
  },

  value: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.heading,
    color: '#222',
    marginTop: 2,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: fontSize.sm,
    fontFamily: fontFamily.body,
    fontWeight: fontWeight.bold,
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: fontSize.sm,
    color: colors.grayDark,
  },
});
