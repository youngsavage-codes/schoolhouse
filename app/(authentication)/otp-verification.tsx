import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { spacing } from '@/constants/spacing';
import { colors } from '@/constants/colors';
import { fontFamily, fontSize, fontWeight } from '@/constants/fonts';
import Button from '@/components/button';
import { OtpInput } from 'react-native-otp-entry';
import { useMutationApi } from '@/hooks/useMutation';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  
  // Get params passed from previous screen
  const params = useLocalSearchParams();
  const email = params.email as string; // passed from previous screen

  const verifyOtpMutation = useMutationApi({
    url: '/auth/verify-otp', // your API endpoint
    onSuccess: (data) => {
      Alert.alert('Success', 'OTP verified successfully');
      router.replace('/(tabs)'); // navigate to main app
    },
    onError: (error) => {
      console.log('OTP verification error:', error);
      Alert.alert('Verification Error', JSON.stringify(error, null, 2));
    },
  });

  const handleVerify = async () => {
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter the complete 6-digit OTP');
      return;
    }

    try {
      await verifyOtpMutation.mutateAsync({
        email,
        otp,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../../assets/images/7980d53500ebf2f85fa14bf71c25888fd179692a.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>OTP Verification</Text>
        <Text style={styles.subtitle}>
          Enter the OTP sent to{' '}
          <Text style={styles.emailText}>{email || 'your email'}</Text>
        </Text>

        <View style={styles.otpWrapper}>
          <OtpInput
            numberOfDigits={6}
            focusColor={colors.primary}
            onTextChange={setOtp}
            textInputProps={{
              keyboardType: 'number-pad',
              maxLength: 6,
            }}
            theme={{
              containerStyle: { justifyContent: 'center', alignItems: 'center', width: '100%' },
              pinCodeContainerStyle: {
                width: 50,
                height: 50,
                borderRadius: 10,
                borderWidth: 1.5,
                borderColor: colors.gray,
                marginHorizontal: 6,
                backgroundColor: colors.gray,
                justifyContent: 'center',
                alignItems: 'center',
              },
              pinCodeTextStyle: {
                fontSize: fontSize.md,
                fontWeight: '600',
                color: colors.primary,
                textAlign: 'center',
              },
            }}
          />
        </View>

        <View style={styles.authQuestionContainer}>
          <Text style={styles.authQuestionText}>Didn’t receive an OTP? </Text>
          <Pressable onPress={() => Alert.alert('OTP resent')}>
            <Text style={styles.authQuestionLinkText}>Resend OTP</Text>
          </Pressable>
        </View>

        <Button
          label="Verify & Sign In"
          onPress={handleVerify}
          variant="primary"
          loading={verifyOtpMutation.isPending}
          disabled={verifyOtpMutation.isPending}
        />
      </View>
    </SafeAreaView>
  );
};

export default OtpVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing[6],
  },
  image: { width: 180, height: 180, marginBottom: spacing[4] },
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
    marginTop: 5,
    paddingHorizontal: 20,
  },
  otpWrapper: { width: '100%', alignItems: 'center', justifyContent: 'center', marginVertical: spacing[6] },
  emailText: { color: colors.primary, fontWeight: fontWeight.medium },
  authQuestionContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: spacing[4] },
  authQuestionText: { fontFamily: fontFamily.body, fontSize: fontSize.xs, color: colors.text },
  authQuestionLinkText: { fontFamily: fontFamily.body, fontSize: fontSize.xs, color: colors.link, fontWeight: '500' },
});