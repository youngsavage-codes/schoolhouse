import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '@/components/AppHeader';
import { colors } from '@/constants/colors';
import { fontSize, fontFamily, fontWeight } from '@/constants/fonts';
import { spacing } from '@/constants/spacing';
import { Building4, Message, Edit2 } from 'iconsax-react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');
const POST_SIZE = (width - spacing[6]) / 3;

const dummyPosts = [
  'https://i.pravatar.cc/150?img=12',
  'https://i.pravatar.cc/150?img=13',
  'https://i.pravatar.cc/150?img=14',
  'https://i.pravatar.cc/150?img=15',
  'https://i.pravatar.cc/150?img=16',
  'https://i.pravatar.cc/150?img=17',
];

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* HEADER */}
      <View style={{paddingHorizontal: 10}}>
        <AppHeader
          title="Profile"
          showBackButton
          onBackPress={() => router.back()}
          rightComponent={
            <TouchableOpacity onPress={() => alert('Edit Profile')}>
              <Edit2 size={24} color={colors.primary} variant='Bulk' />
            </TouchableOpacity>
          }
        />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Info */}
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=32' }}
            style={styles.avatar}
          />
          <View style={styles.info}>
            <Text style={styles.name}>Jane Doe</Text>
            <Text style={styles.role}>Teacher</Text>
            <Text style={styles.school}>
              <Building4 size={14} color="#6B7280" variant="Outline" /> Greenfield School
            </Text>
            <Text style={styles.contact}>
              <Message size={14} color="#6B7280" variant="Outline" /> janedoe@example.com
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statCount}>12</Text>
            <Text style={styles.statLabel}>Classes</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statCount}>180</Text>
            <Text style={styles.statLabel}>Students</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statCount}>24</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
        </View>

        {/* Bio */}
        <Text style={styles.bio}>
          Passionate teacher with 5 years of experience in teaching and mentoring students.
        </Text>

        {/* Posts Grid */}
        <FlatList
          data={dummyPosts}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.postImage} />
          )}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: spacing[2],
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: spacing[4],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing[4],
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: spacing[4],
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.body,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  role: {
    fontSize: fontSize.sm,
    color: '#6B7280',
    marginBottom: spacing[1],
  },
  school: {
    fontSize: fontSize.xs,
    color: '#6B7280',
    marginBottom: spacing[1],
  },
  contact: {
    fontSize: fontSize.xs,
    color: '#6B7280',
    marginBottom: spacing[2],
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing[4],
  },
  statItem: {
    alignItems: 'center',
  },
  statCount: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  statLabel: {
    fontSize: fontSize.xs,
    color: '#6B7280',
  },
  bio: {
    fontSize: fontSize.sm,
    color: colors.grayDark,
    marginBottom: spacing[4],
  },
  postImage: {
    width: POST_SIZE,
    height: POST_SIZE,
    borderRadius: spacing[1],
  },
});
