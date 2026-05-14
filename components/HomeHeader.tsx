import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { NotificationBing } from 'iconsax-react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { fontFamily, fontSize, fontWeight } from '@/constants/fonts';
import { router } from 'expo-router';

interface Props {
  firstName: string;
  schoolName: string;
}

const HomeHeader = ({ firstName, schoolName }: Props) => {
  const initial = firstName ? firstName.charAt(0).toUpperCase() : "";

  return (
    <View style={styles.header}>
      
      {/* LEFT SIDE — Name & School */}
      <View>
        <Text style={styles.welcomeText}>Hello, {firstName}</Text>
        <Text style={styles.schoolText}>{schoolName}</Text>
      </View>

      {/* RIGHT SIDE — Notification + Avatar Initial */}
      <View style={styles.rightContainer}>
        <Pressable style={styles.bellButton} onPress={() => router.push('/(more)/notification')}>
          <NotificationBing size={22} color={colors.text} variant='Bulk' />
        </Pressable>

        <View style={styles.initialCircle}>
          <Text style={styles.initialText}>{initial}</Text>
        </View>
      </View>

    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing[4],
  },

  welcomeText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.heading,
    fontWeight: fontWeight.medium,
    color: colors.text,
  },

  schoolText: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.body,
    color: '#6F6F6F',
    marginTop: 2,
  },

  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },

  bellButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
  },

  initialCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  initialText: {
    color: '#FFFFFF',
    fontSize: fontSize.md,
    fontFamily: fontFamily.heading,
    fontWeight: '600',
  },
});
