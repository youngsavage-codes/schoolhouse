import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fontFamily, fontSize, fontWeight } from '@/constants/fonts';
import { colors } from '@/constants/colors';
import AppHeader from '@/components/AppHeader';
import { router } from 'expo-router';

const ParentDetails = ({ route }: any) => {
  const parent = route?.params?.parent || {
    id: 'p1',
    name: 'Abdul Ibrahim',
    occupation: 'Engineer',
    contact: '08012345678',
    address: '12 Main Street, Lagos',
    isActive: true,
    image:
      'https://api.dicebear.com/7.x/initials/png?seed=Abdul%20Ibrahim&radius=50',
    children: [
      { id: 's1', name: 'Musa Ibrahim', class: 'JSS 2A', image: 'https://api.dicebear.com/7.x/initials/png?seed=Musa%20Ibrahim&radius=50' },
      { id: 's2', name: 'Aisha Ibrahim', class: 'JSS 1B', image: 'https://api.dicebear.com/7.x/initials/png?seed=Aisha%20Ibrahim&radius=50' },
    ],
  };

  const handleSelectChild = (child: any) => {
    router.push({
      pathname: '/(more)/studentDetails',
      params: { student: child },
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={{ paddingHorizontal: 10 }}>
        <AppHeader
          title="Parent Details"
          showBackButton
          onBackPress={() => router.back()}
        />
      </View>

      <View style={styles.container}>
        {/* Profile */}
        <View style={styles.center}>
          <Image source={{ uri: parent.image }} style={styles.avatar} />
          <Text style={styles.name}>{parent.name}</Text>
          <View
            style={[
              styles.statusTag,
              { backgroundColor: parent.isActive ? '#4CAF50' : '#F44336' },
            ]}
          >
            <Text style={styles.statusText}>
              {parent.isActive ? 'Active' : 'Inactive'}
            </Text>
          </View>
        </View>

        {/* Parent Info */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Parent Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Full Name:</Text>
            <Text style={styles.infoValue}>{parent.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Occupation:</Text>
            <Text style={styles.infoValue}>{parent.occupation}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Contact:</Text>
            <Text style={styles.infoValue}>{parent.contact}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Address:</Text>
            <Text style={styles.infoValue}>{parent.address}</Text>
          </View>
        </View>

        {/* Children */}
        <View style={[styles.infoCard, { marginTop: 20 }]}>
          <Text style={styles.sectionTitle}>Children</Text>
          <FlatList
            data={parent.children}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable
                style={styles.childRow}
                onPress={() => handleSelectChild(item)}
              >
                <Image source={{ uri: item.image }} style={styles.childAvatar} />
                <View>
                  <Text style={styles.childName}>{item.name}</Text>
                  <Text style={styles.childClass}>{item.class}</Text>
                </View>
              </Pressable>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ParentDetails;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { paddingHorizontal: 20, paddingTop: 10 },
  center: { alignItems: 'center', marginBottom: 25 },
  avatar: { width: 90, height: 90, borderRadius: 100, marginBottom: 10 },
  name: { fontSize: fontSize.lg, fontFamily: fontFamily.heading, color: '#333' },
  statusTag: { marginTop: 8, paddingHorizontal: 14, paddingVertical: 4, borderRadius: 20 },
  statusText: { color: '#fff', fontFamily: fontFamily.body, fontSize: fontSize.xs },
  infoCard: { backgroundColor: '#FAFAFA', padding: 20, borderRadius: 12, borderWidth: 1, borderColor: '#eee' },
  sectionTitle: { fontSize: fontSize.md, fontFamily: fontFamily.heading, marginBottom: 15, color: colors.primary },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  infoLabel: { fontSize: fontSize.sm, fontFamily: fontFamily.body, color: '#555' },
  infoValue: { fontSize: fontSize.sm, fontFamily: fontFamily.body, color: '#222' },
  childRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: colors.grayLight },
  childAvatar: { width: 40, height: 40, borderRadius: 100, marginRight: 10 },
  childName: { fontSize: fontSize.sm, fontFamily: fontFamily.heading, fontWeight: fontWeight.bold, color: '#333' },
  childClass: { fontSize: fontSize.xs, fontFamily: fontFamily.body, color: '#666' },
});
