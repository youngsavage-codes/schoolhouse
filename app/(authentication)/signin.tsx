import React from 'react';
import { Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Checkbox from 'expo-checkbox';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { router } from 'expo-router';

import Button from '@/components/button';
import CustomTextInput from '@/components/inputField';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { fontFamily, fontSize, fontWeight } from '@/constants/fonts';
import { globalStyles } from '@/constants/globalStyles';
import { useMutationApi } from '@/hooks/useMutation';

// ----------------------
// Yup Validation Schema
// ----------------------
const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

const SigninScreen = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema as any),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const remember = watch('remember');

  // ----------------------
  // Login Mutation
  // ----------------------
  const loginMutation = useMutationApi({
    url: '/auth/login', // update to your actual login endpoint
    invalidateKeys: ['user'], // optional cache invalidation
    onSuccess(data) {
      console.log('Login success', data);
      router.push({
        pathname: '/(authentication)/otp-verification',
        params: { email: '' },
      });
    },
    onError(error) {
      console.log('Login error', error);
      Alert.alert('Login Error', error?.response.data.message);
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
      await loginMutation.mutateAsync({
        email: data.email,
        password: data.password,
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View>
        <Text style={styles.greetingText}>Hello!</Text>
        <Text style={styles.greetingDesc}>Welcome to SchoolHouse</Text>
      </View>

      {/* Form */}
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={styles.introText}>Sign in to your account</Text>

        <View style={styles.formContainer}>
          {/* Email */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <CustomTextInput
                label="Email"
                value={value}
                onChangeText={onChange}
                placeholder="Enter your email"
                keyboardType="email-address"
                error={errors.email?.message}
              />
            )}
          />

          {/* Password */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <CustomTextInput
                label="Password"
                value={value}
                onChangeText={onChange}
                placeholder="Enter your password"
                secureTextEntry
                error={errors.password?.message}
              />
            )}
          />

          {/* Remember me + forgot password */}
          <View style={[globalStyles.row, styles.rememberContainer]}>
            <Controller
              control={control}
              name="remember"
              render={({ field: { onChange, value } }) => (
                <View style={styles.rememberLeft}>
                  <Checkbox
                    value={value}
                    onValueChange={onChange}
                    color={value ? colors.primary : undefined}
                  />
                  <Text style={styles.rememberText}>Remember Me</Text>
                </View>
              )}
            />
            <Pressable onPress={() => router.push('/(authentication)/forgot-password')}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </Pressable>
          </View>

          {/* Sign In Button */}
          <Button
            label="Sign In"
            onPress={handleSubmit(onSubmit)}
            variant="primary"
            disabled={loginMutation.isPending || !isValid}
            loading={loginMutation.isPending}
          />
        </View>

        {/* Create Account */}
        <View style={styles.authQuestionContainer}>
          <Text style={styles.authQuestionText}>Don’t have an account?</Text>
          <Pressable onPress={() => router.push('/(authentication)/account-type')}>
            <Text style={styles.authQuestionLinkText}> Create Account</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing[6],
  },
  greetingText: {
    fontFamily: fontFamily.logo,
    fontWeight: fontWeight.medium,
    fontSize: fontSize.sm,
    color: colors.primary,
  },
  greetingDesc: {
    fontFamily: fontFamily.body,
    color: colors.text,
  },
  introText: {
    fontWeight: '600',
    fontSize: fontSize.sm,
    marginVertical: 20,
    color: colors.text,
    fontFamily: fontFamily.heading,
  },
  formContainer: {
    gap: spacing[2],
  },
  rememberContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[4],
  },
  rememberLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rememberText: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.xs,
    color: colors.text,
  },
  forgotText: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.xs,
    color: colors.danger,
  },
  authQuestionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing[6],
  },
  authQuestionText: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.xs,
    color: colors.text,
  },
  authQuestionLinkText: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.xs,
    color: colors.link,
    fontWeight: '500',
  },
});