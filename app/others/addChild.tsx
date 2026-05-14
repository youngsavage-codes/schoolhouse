import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "@/constants/globalStyles";
import { colors } from "@/constants/colors";
import WardCard from "@/components/wardCard";
import Button from "@/components/button";
import StatusModal from "@/components/StatusModal";
import { router, useLocalSearchParams } from "expo-router";
import { useMutationApi } from "@/hooks/useMutation";

interface ParentData {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
  schoolId: string;
}

interface ChildData {
  firstName: string;
  lastName: string;
  class: string;
  age: number;
  middleName?: string;
  bloodGroup?: string;
  photo?: string;
}

const AddChildScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const { parentData } = useLocalSearchParams();
  const parsedParentData: ParentData = parentData ? JSON.parse(parentData as any) : null;

  const [child, setChild] = useState<ChildData>({
    firstName: "",
    lastName: "",
    class: "",
    age: 0,
    middleName: "",
    bloodGroup: "",
    photo: "",
  });

  const isFormComplete =
    child.firstName &&
    child.lastName &&
    child.class &&
    child.age > 0;

  const updateChild = (field: keyof ChildData, value: string | number) => {
    setChild((prev) => ({ ...prev, [field]: value }));
  };

  // Mutation to submit parent + child data
  const mutation = useMutationApi({
    url: '/register/parent',
    onSuccess: () => {
      setModalVisible(true);
    },
    onError: (error: any) => {
      Alert.alert("Error", error?.message || "Something went wrong");
    },
  });

  const handleSubmit = () => {
    if (!isFormComplete) {
      Alert.alert("Error", "Please fill all required child fields");
      return;
    }
    const payload = {
      ...parsedParentData,
      middleName: parsedParentData.middleName || "",
      childData: child,
    };

    mutation.mutateAsync(payload);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView style={[ {padding: 20,  flex: 1 }]}>
        <Text style={globalStyles.greetingText}>Add Child</Text>
        <Text style={globalStyles.greetingDesc}>
          Continue by adding child details
        </Text>

        <ScrollView keyboardShouldPersistTaps="handled">
          <WardCard
            wardNumber={1}
            firstName={child.firstName}
            lastName={child.lastName}
            selectedClass={child.class}
            age={child.age}
            middleName={child.middleName}
            bloodGroup={child.bloodGroup}
            photo={child.photo}
            onChangeFirstName={(v) => updateChild("firstName", v)}
            onChangeLastName={(v) => updateChild("lastName", v)}
            onSelectClass={(v) => updateChild("class", v)}
            onChangeAge={(v) => updateChild("age", Number(v))}
            onChangeMiddleName={(v) => updateChild("middleName", v)}
            onChangeBloodGroup={(v) => updateChild("bloodGroup", v)}
            onChangePhoto={(v) => updateChild("photo", v)}
          />
        </ScrollView>

        <Button
          label="Submit And Verify"
          disabled={!isFormComplete || mutation.isPending}
          loading={mutation.isPending}
          onPress={handleSubmit}
        />
      </SafeAreaView>

      <StatusModal
        visible={modalVisible}
        type="success"
        message="Your request was completed successfully!"
        onClose={() => router.push("/others/awaitVerification")}
      />
    </View>
  );
};

export default AddChildScreen;