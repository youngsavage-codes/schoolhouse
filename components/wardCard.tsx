import React from "react";
import { View } from "react-native";
import CustomTextInput from "@/components/inputField";
import SelectField from "./SelectField";
import UploadCard from "./UploadCard";

interface WardCardProps {
  wardNumber: number;
  firstName: string;
  lastName: string;
  middleName?: string;
  selectedClass: string;
  age: number;
  bloodGroup?: string;
  photo?: string;
  onChangeFirstName: (text: string) => void;
  onChangeLastName: (text: string) => void;
  onChangeMiddleName?: (text: string) => void;
  onSelectClass: (value: string) => void;
  onChangeAge?: (value: string) => void;
  onChangeBloodGroup?: (value: string) => void;
  onChangePhoto?: (uri: string) => void;
}

const WardCard: React.FC<WardCardProps> = ({
  wardNumber,
  firstName,
  lastName,
  middleName = "",
  selectedClass,
  age,
  bloodGroup = "",
  onChangeFirstName,
  onChangeLastName,
  onChangeMiddleName,
  onSelectClass,
  onChangeAge,
  onChangeBloodGroup,
  onChangePhoto,
}) => {
  return (
    <View style={{ marginTop: 25, backgroundColor: "#fff", borderRadius: 10 }}>
      {/* Photo Upload */}
      <UploadCard
        title="Upload child’s image in school uniform"
        onPress={() => onChangePhoto && onChangePhoto("https://example.com/photo.jpg")}
      />

      {/* First Name */}
      <CustomTextInput
        label={`First Name of Ward ${wardNumber}`}
        value={firstName}
        onChangeText={onChangeFirstName}
        required
      />

      {/* Middle Name */}
      {onChangeMiddleName && (
        <CustomTextInput
          label={`Middle Name of Ward ${wardNumber} (Optional)`}
          value={middleName}
          onChangeText={onChangeMiddleName}
        />
      )}

      {/* Last Name */}
      <CustomTextInput
        label={`Last Name of Ward ${wardNumber}`}
        value={lastName}
        onChangeText={onChangeLastName}
        required
      />

      {/* Class Selection */}
      <SelectField
        label="Select Ward Class"
        value={selectedClass}
        placeholder="Choose class"
        options={["Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6"]}
        onSelect={onSelectClass}
        required
      />

      {/* Age */}
      {onChangeAge && (
        <CustomTextInput
          label={`Age of Ward ${wardNumber}`}
          value={age ? age.toString() : ""}
          onChangeText={onChangeAge}
          keyboardType="numeric"
          required
        />
      )}

      {/* Blood Group */}
      {onChangeBloodGroup && (
        <SelectField
          label="Select Blood Group"
          value={bloodGroup}
          placeholder="Choose blood group"
          options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
          onSelect={onChangeBloodGroup}
        />
      )}
    </View>
  );
};

export default WardCard;