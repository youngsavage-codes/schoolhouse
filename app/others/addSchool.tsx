import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomTextInput from "@/components/inputField";
import Button from "@/components/button";
import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { ArrowLeft2 } from "iconsax-react-native";
import { globalStyles } from "@/constants/globalStyles";
import CustomSelect from "@/components/CustomSelect";
import { State, City } from "country-state-city";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchoolSchema } from "@/schema/schoolSchema";
import { useMutationApi } from "@/hooks/useMutation";
import { router } from "expo-router";
import { useAuth } from "@/hooks/AuthContext";

const AddSchool = () => {
  const [step, setStep] = useState(1);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const {login} = useAuth()

  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchoolSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      schoolData: {
        name: "",
        streetAddress: "",
        state: "",
        lga: "",
        phoneNumber: "",
      },
    },
  });

  const addSchoolMutation = useMutationApi({
    url: "/auth/register/admin",
    invalidateKeys: [""],
    onSuccess(data) {
      login({user: data.data.user, token: 'test token'})
      router.push("/others/awaitVerification");
    },
    onError(error) {
      console.log("error", error.response.data.message);
      Alert.alert("Submission Error", error.response.data.message);
    },
  });

  /* Load states */
  useEffect(() => {
    const nigeriaStates = State.getStatesOfCountry("NG");
    setStates(nigeriaStates);
  }, []);

  const handleStateSelect = (stateName: string) => {
    const selected = states.find((s) => s.name === stateName);
    if (selected) {
      const stateCities = City.getCitiesOfState("NG", selected.isoCode);
      setCities(stateCities);
    }
  };

  const handleNext = async () => {
    let fields: string[] = [];

    if (step === 1) {
      // Include the nested schoolData.phoneNumber for validation
      fields = [
        "schoolData.name",
        "schoolData.streetAddress",
        "schoolData.state",
        "schoolData.lga",
        "schoolData.phoneNumber", // ✅ must match Yup
      ];
    } else if (step === 2) {
      fields = ["firstName", "lastName", "phoneNumber"];
    } else if (step === 3) {
      fields = ["email", "password"];
    }

    const valid = await trigger(fields as any);

    if (!valid) {
      console.log("Validation errors:", errors);

      // Flatten nested errors for Alert
      const flattenErrors = (errs: any, parentKey = ""): string[] => {
        return Object.entries(errs).flatMap(([key, value]: any) => {
          const fullKey = parentKey ? `${parentKey}.${key}` : key;
          if (value?.message) return [`${fullKey}: ${value.message}`];
          if (typeof value === "object") return flattenErrors(value, fullKey);
          return [];
        });
      };

      Alert.alert("Validation Error", flattenErrors(errors).join("\n"));
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit(onSubmit, onErrorSubmit)();
    }
  };

  const onErrorSubmit = (formErrors: any) => {
    console.log("Submit validation errors:", formErrors);
    Alert.alert("Submit Error", JSON.stringify(formErrors, null, 2));
  };

  const onSubmit = async (data: any) => {
    await addSchoolMutation.mutateAsync(data);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const stepTitles = ["School Details", "School Admin Details", "Account Verification"];

  return (
    <View style={[globalStyles.container, { backgroundColor: "white" }]}>
      <SafeAreaView style={{ flex: 1 }}>
        <Pressable onPress={handleBack} style={styles.backBtn} disabled={step === 1}>
          <ArrowLeft2 size={20} color={colors.text} />
        </Pressable>

        <View>
          <Text style={globalStyles.greetingText}>{stepTitles[step - 1]}</Text>
          <Text style={globalStyles.greetingDesc}>Step {step} of 3</Text>
        </View>

        <ScrollView contentContainerStyle={{ marginTop: spacing[4] }}>
          {/* STEP 1 */}
          {step === 1 && (
            <View style={styles.formSection}>
              <Controller
                control={control}
                name="schoolData.name"
                render={({ field: { onChange, value } }) => (
                  <CustomTextInput
                    label="School Name"
                    value={value}
                    onChangeText={onChange}
                    placeholder="Enter school name"
                    error={errors?.schoolData?.name?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="schoolData.streetAddress"
                render={({ field: { onChange, value } }) => (
                  <CustomTextInput
                    label="Street"
                    value={value}
                    onChangeText={onChange}
                    placeholder="Enter street"
                    error={errors?.schoolData?.streetAddress?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="schoolData.state"
                render={({ field: { onChange, value } }) => (
                  <CustomSelect
                    label="State"
                    value={value}
                    options={states.map((s) => s.name)}
                    onSelect={(val) => {
                      onChange(val);
                      handleStateSelect(val);
                    }}
                  />
                )}
              />
              <Controller
                control={control}
                name="schoolData.lga"
                render={({ field: { onChange, value } }) => (
                  <CustomSelect label="City" value={value} options={cities.map((c) => c.name)} onSelect={onChange} />
                )}
              />
              <Controller
                control={control}
                name="schoolData.phoneNumber"
                render={({ field: { onChange, value } }) => (
                  <CustomTextInput
                    label="School Phone"
                    value={value}
                    onChangeText={onChange}
                    placeholder="Enter school phone"
                    error={errors?.schoolData?.phoneNumber?.message}
                  />
                )}
              />
            </View>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <View style={styles.formSection}>
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, value } }) => (
                  <CustomTextInput label="First Name" value={value} onChangeText={onChange} error={errors?.firstName?.message} />
                )}
              />
              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, value } }) => (
                  <CustomTextInput label="Last Name" value={value} onChangeText={onChange} error={errors?.lastName?.message} />
                )}
              />
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field: { onChange, value } }) => (
                  <CustomTextInput label="Phone Number" value={value} onChangeText={onChange} keyboardType="phone-pad" error={errors?.phoneNumber?.message} />
                )}
              />
            </View>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <View style={styles.formSection}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <CustomTextInput label="Email" value={value} onChangeText={onChange} keyboardType="email-address" error={errors?.email?.message} />
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <CustomTextInput label="Password" value={value} onChangeText={onChange} secureTextEntry error={errors?.password?.message} />
                )}
              />
            </View>
          )}

          <View style={styles.navButtons}>
            <Button
              label={step === 3 ? "Create School Account" : "Next"}
              variant="primary"
              onPress={handleNext}
              disabled={addSchoolMutation.isPending}
              loading={addSchoolMutation.isPending}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default AddSchool;

const styles = StyleSheet.create({
  formSection: {
    marginBottom: spacing[6],
  },
  backBtn: {
    marginBottom: spacing[4],
  },
  navButtons: {
    marginTop: spacing[4],
    marginBottom: spacing[6],
  },
});