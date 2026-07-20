'use client';

import React, { useMemo, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { OtpInput } from 'react-native-otp-entry';

import Button from '@/components/button';

import { spacing } from '@/constants/spacing';
import { colors } from '@/constants/colors';
import {
  fontFamily,
  fontSize,
  fontWeight,
} from '@/constants/fonts';

import { useMutationApi } from '@/hooks/useMutation';

const OtpVerification = () => {
  const params = useLocalSearchParams();

  const email = useMemo(
    () => (params.email as string) || '',
    [params.email]
  );

  const [otp, setOtp] = useState('');

  /* =========================================
      VERIFY OTP
  ========================================= */
  const verifyOtpMutation = useMutationApi({
    url: '/auth/verify-otp',

    onSuccess: () => {
      Alert.alert(
        'Success',
        'OTP verified successfully'
      );

      router.replace('/(tabs)');
    },

    onError: (error: any) => {
      console.log('VERIFY OTP ERROR', error);

      Alert.alert(
        'Verification Failed',
        error?.response?.data?.message ||
          'Unable to verify OTP'
      );
    },
  });

  /* =========================================
      RESEND OTP
  ========================================= */
  const resendOtpMutation = useMutationApi({
    url: '/auth/email/send-otp',

    onSuccess: () => {
      Alert.alert(
        'OTP Sent',
        'A new OTP has been sent to your email'
      );
    },

    onError: (error: any) => {
      console.log('RESEND OTP ERROR', error);

      Alert.alert(
        'Resend Failed',
        error?.response?.data?.message ||
          'Unable to resend OTP'
      );
    },
  });

  /* =========================================
      VERIFY
  ========================================= */
  const handleVerify = async () => {
    if (!email) {
      Alert.alert(
        'Error',
        'Email address is missing'
      );

      return;
    }

    if (otp.length !== 6) {
      Alert.alert(
        'Invalid OTP',
        'Please enter the complete 6-digit OTP'
      );

      return;
    }

    try {
      await verifyOtpMutation.mutateAsync({
        email,
        otp,
      });
    } catch (err) {
      console.log(err);
    }
  };

  /* =========================================
      RESEND OTP
  ========================================= */
  const handleResendOtp = async () => {
    if (!email) {
      Alert.alert(
        'Error',
        'Email address is missing'
      );

      return;
    }

    try {
      await resendOtpMutation.mutateAsync({
        email,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
      >
        <View style={styles.content}>
          {/* IMAGE */}
          <Image
            source={require('../../assets/images/7980d53500ebf2f85fa14bf71c25888fd179692a.png')}
            style={styles.image}
            resizeMode="contain"
          />

          {/* TITLE */}
          <Text style={styles.title}>
            OTP Verification
          </Text>

          {/* SUBTITLE */}
          <Text style={styles.subtitle}>
            Enter the 6-digit OTP sent to{' '}
            <Text style={styles.emailText}>
              {email || 'your email'}
            </Text>
          </Text>

          {/* OTP */}
          <View style={styles.otpWrapper}>
            <OtpInput
              numberOfDigits={6}
              focusColor={colors.primary}
              focusStickBlinkingDuration={400}
              onTextChange={setOtp}
              type="numeric"
              theme={{
                containerStyle:
                  styles.otpContainer,

                pinCodeContainerStyle:
                  styles.pinCodeContainer,

                focusedPinCodeContainerStyle:
                  styles.activePinCodeContainer,

                pinCodeTextStyle:
                  styles.pinCodeText,
              }}
            />
          </View>

          {/* RESEND */}
          <View
            style={styles.authQuestionContainer}
          >
            <Text style={styles.authQuestionText}>
              Didn’t receive the OTP?
            </Text>

            <Pressable
              disabled={
                resendOtpMutation.isPending
              }
              onPress={handleResendOtp}
            >
              {resendOtpMutation.isPending ? (
                <ActivityIndicator
                  size="small"
                  color={colors.primary}
                />
              ) : (
                <Text
                  style={
                    styles.authQuestionLinkText
                  }
                >
                  Resend OTP
                </Text>
              )}
            </Pressable>
          </View>

          {/* BUTTON */}
          <Button
            label="Verify & Sign In"
            onPress={handleVerify}
            variant="primary"
            loading={
              verifyOtpMutation.isPending
            }
            disabled={
              verifyOtpMutation.isPending ||
              otp.length !== 6
            }
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OtpVerification;

/* =========================================
    STYLES
========================================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  keyboard: {
    flex: 1,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing[6],
  },

  image: {
    width: 180,
    height: 180,
    alignSelf: 'center',
    marginBottom: spacing[5],
  },

  title: {
    fontFamily: fontFamily.logo,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
    textAlign: 'center',
  },

  subtitle: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.sm,
    color: colors.gray,
    textAlign: 'center',
    marginTop: spacing[2],
    lineHeight: 22,
    paddingHorizontal: spacing[4],
  },

  emailText: {
    color: colors.primary,
    fontWeight: fontWeight.semiBold,
  },

  otpWrapper: {
    marginTop: spacing[8],
    marginBottom: spacing[5],
    alignItems: 'center',
  },

  otpContainer: {
    width: '100%',
    justifyContent: 'center',
  },

  pinCodeContainer: {
    width: 52,
    height: 56,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },

  activePinCodeContainer: {
    borderColor: colors.primary,
    backgroundColor: '#EEF4FF',
  },

  pinCodeText: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.primary,
    textAlign: 'center',
  },

  authQuestionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginBottom: spacing[6],
  },

  authQuestionText: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.xs,
    color: colors.text,
  },

  authQuestionLinkText: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.xs,
    color: colors.primary,
    fontWeight: '600',
  },
});