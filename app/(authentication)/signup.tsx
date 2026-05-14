import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '@/components/button';
import CustomTextInput from '@/components/inputField';
import UploadCard from '@/components/UploadCard';
import { signupSchema } from '@/schema/authSchema';
import { useMutationApi } from '@/hooks/useMutation';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { fontFamily, fontSize, fontWeight } from '@/constants/fonts';

const SignupScreen = () => {
  const { accountType, schoolId } = useLocalSearchParams();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: '',
      password: '',
      confirmPassword: '',
      photo: '',
      staffIdDocument: '',
    },
  });

  // ✅ watch values
  const formValues = watch();

  // ✅ MUTATION
  const registerMutation = useMutationApi({
    url: '/auth/register/staff',
    onSuccess() {
      router.push('/others/awaitVerification');
    },
    onError(error) {
      Alert.alert('Error', JSON.stringify(error));
    },
  });

  const onSubmit = (data: any) => {
    // ✅ PARENT FLOW
    if (accountType === 'parent') {
      router.push({
        pathname: '/others/addChild',
        params: {
          parentData: JSON.stringify({
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            phoneNumber: data.phoneNumber,
            address: data.address,
            schoolId,
          }),
        },
      });
      return;
    }

    // ✅ TEACHER FLOW
    if (accountType === 'teacher') {
      if (!data.photo || !data.staffIdDocument) {
        Alert.alert('Error', 'Upload profile image and staff ID');
        return;
      }

      registerMutation.mutate({
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        address: data.address,
        schoolId,
        photo: data.photo,
        staffIdDocument: data.staffIdDocument,
      });

      return;
    }

    // ✅ SCHOOL ADMIN FLOW
    router.push('/others/addSchool');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View>
          <Text style={styles.greetingText}>Get Started</Text>
          <Text style={styles.greetingDesc}>
            Continue by creating your account
          </Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.introText}>Create your account</Text>

          <View style={styles.formContainer}>
            {/* TEXT INPUTS (NO CONTROLLER) */}
            <CustomTextInput
              label="First Name"
              value={formValues.firstName}
              onChangeText={(v) => setValue('firstName', v, { shouldValidate: true })}
              error={errors.firstName?.message}
            />

            <CustomTextInput
              label="Middle Name"
              value={formValues.middleName}
              onChangeText={(v) => setValue('middleName', v)}
            />

            <CustomTextInput
              label="Last Name"
              value={formValues.lastName}
              onChangeText={(v) => setValue('lastName', v, { shouldValidate: true })}
              error={errors.lastName?.message}
            />

            <CustomTextInput
              label="Email"
              value={formValues.email}
              onChangeText={(v) => setValue('email', v, { shouldValidate: true })}
              keyboardType="email-address"
              error={errors.email?.message}
            />

            <CustomTextInput
              label="Phone Number"
              value={formValues.phoneNumber}
              onChangeText={(v) => setValue('phoneNumber', v)}
              keyboardType="phone-pad"
              error={errors.phoneNumber?.message}
            />

            <CustomTextInput
              label="Address"
              value={formValues.address}
              onChangeText={(v) => setValue('address', v)}
              error={errors.address?.message}
            />

            <CustomTextInput
              label="Password"
              value={formValues.password}
              onChangeText={(v) => setValue('password', v, { shouldValidate: true })}
              secureTextEntry
              error={errors.password?.message}
            />

            <CustomTextInput
              label="Confirm Password"
              value={formValues.confirmPassword}
              onChangeText={(v) =>
                setValue('confirmPassword', v, { shouldValidate: true })
              }
              secureTextEntry
              error={errors.confirmPassword?.message}
            />

            {/* 👇 ONLY CONTROLLER FOR UPLOAD */}
            {/* {accountType === 'teacher' && (
              <>
                <Controller
                  control={{ setValue, watch } as any}
                  name="photo"
                  render={({ field: { value } }) => (
                    <UploadCard
                      title="Upload Profile Image"
                      value={value}
                      onPress={() => {
                        const url = 'uploaded-image-url';
                        setValue('photo', url, { shouldValidate: true });
                      }}
                    />
                  )}
                />

                <Controller
                  control={{ setValue, watch } as any}
                  name="staffIdDocument"
                  render={({ field: { value } }) => (
                    <UploadCard
                      title="Upload Staff ID Document"
                      value={value}
                      onPress={() => {
                        const url = 'uploaded-id-url';
                        setValue('staffIdDocument', url, { shouldValidate: true });
                      }}
                    />
                  )}
                />
              </>
            )} */}

            <Button
              label={
                accountType === 'parent'
                  ? 'Proceed To Add Child'
                  : 'Create Account'
              }
              loading={registerMutation.isPending}
              disabled={!isValid || registerMutation.isPending}
              onPress={handleSubmit(onSubmit)}
            />
          </View>

          {/* FOOTER */}
          <View style={styles.authQuestionContainer}>
            <Text style={styles.authQuestionText}>Have an account?</Text>
            <Pressable onPress={() => router.push('/(authentication)/signin')}>
              <Text style={styles.authQuestionLinkText}> Sign In</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing[6],
  },
  scrollContent: {
    paddingBottom: spacing[8],
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
    marginVertical: 20,
    fontSize: fontSize.sm,
    color: colors.text,
    fontFamily: fontFamily.heading,
  },
  formContainer: {
    gap: spacing[2],
  },
  authQuestionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
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