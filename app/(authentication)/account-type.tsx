import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { fontFamily, fontWeight, fontSize } from '@/constants/fonts';
import { globalStyles } from '@/constants/globalStyles';
import { AntDesign, MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import Button from '@/components/button';
import { router } from 'expo-router';
import { ArrowLeft2 } from 'iconsax-react-native';

const AccountsScreen = () => {
  const [accountType, setAccountType] = useState('');

  const accountOptions = [
    {
      type: 'admin',
      label: "I'm a School Admin",
      icon: <Ionicons name="school-outline" size={22} color={colors.primary} />,
    },
    {
      type: 'teacher',
      label: "I'm a Teacher",
      icon: <FontAwesome5 name="chalkboard-teacher" size={20} color={colors.primary} />,
    },
    {
      type: 'parent',
      label: "I'm a Parent",
      icon: <MaterialIcons name="family-restroom" size={24} color={colors.primary} />,
    },
  ];

  const handleContinue = () => {
    if (!accountType) return;

    if (accountType === 'teacher' || accountType === 'parent') {
      router.push({
        pathname: '/(authentication)/schools',
        params: { accountType }, // pass as params
      });
    } else {
      router.push({
        pathname: '/others/addSchool',
        params: { accountType },
      });
    }
    // You can store the selected type in a store/context before navigating
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <Pressable onPress={() => router.back()} style={styles.backBtn}>
        <ArrowLeft2 size={18} color={colors.text} />
      </Pressable>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greetingText}>Get Started</Text>
        <Text style={styles.greetingDesc}>
          Continue by creating {accountType ? accountType.replace('-', ' ') : 'an'} account
        </Text>
      </View>

      {/* Account Type Options */}
      <View style={styles.accountOptions}>
        {accountOptions.map((option) => {
          const isSelected = option.type === accountType;
          return (
            <Pressable
              key={option.type}
              onPress={() => setAccountType(option.type)}
              style={[
                styles.optionCard,
                isSelected && styles.optionCardSelected,
              ]}
            >
              <View style={styles.optionContent}>
                {option.icon}
                <Text
                  style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </View>
              {isSelected && <AntDesign name="check-circle" size={18} color={colors.primary} />}
            </Pressable>
          );
        })}
      </View>

      {/* Continue Button */}
      <Button
        label={accountType === 'teacher' || accountType === 'parent' ? "Pick A School" : 'Create Account'}
        onPress={handleContinue}
        variant="primary"
        disabled={!accountType}
      />
    </SafeAreaView>
  );
};

export default AccountsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing[6],
    justifyContent: 'space-between',
  },
  backBtn: {
    marginBottom: spacing[4],
  },
  header: {
    marginBottom: spacing[8],
  },
  greetingText: {
    fontFamily: fontFamily.logo,
    fontWeight: fontWeight.medium,
    fontSize: fontSize.md,
    color: colors.primary,
  },
  greetingDesc: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.sm,
    color: colors.text,
    marginTop: 4,
  },
  accountOptions: {
    gap: spacing[4],
    marginBottom: spacing[8],
  },
  optionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[5],
    borderRadius: 10,
    backgroundColor: colors.text2,
  },
  optionCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '15', // soft tint
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  optionText: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.text,
  },
  optionTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  learnText: {
    textAlign: 'center',
    fontSize: fontSize.sm,
    color: colors.primary,
    fontFamily: fontFamily.body,
  },
});
