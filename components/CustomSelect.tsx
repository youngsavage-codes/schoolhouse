import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { fontFamily, fontSize } from "@/constants/fonts";

interface SelectOption {
  label: string;
  value: string;
}

interface CustomSelectProps {
  label?: string;
  placeholder?: string;
  value?: string | null;
  options: string[] | SelectOption[];
  onSelect: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  placeholder = "Select option",
  value = null,
  options,
  onSelect,
  required = false,
  disabled = false,
}) => {
  const items: SelectOption[] = options.map((opt) =>
    typeof opt === "string"
      ? { label: opt, value: opt }
      : opt
  );

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      <RNPickerSelect
        value={value}
        disabled={disabled}
        items={items}
        onValueChange={(val) => {
          if (val !== null && val !== undefined) {
            onSelect(val);
          }
        }}
        placeholder={{
          label: placeholder,
          value: null,
          color: colors.grayLight,
        }}
        style={{
          inputIOS: [
            styles.input,
            disabled && styles.disabledInput,
          ],
          inputAndroid: [
            styles.input,
            disabled && styles.disabledInput,
          ],
          placeholder: styles.placeholder,
          iconContainer: styles.iconContainer,
        }}
        useNativeAndroidPickerStyle={false}
      />
    </View>
  );
};

export default CustomSelect;

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[4],
  },
  label: {
    fontSize: fontSize.xs,
    color: colors.text,
    marginBottom: 4,
    fontFamily: fontFamily.body,
    fontWeight: "500",
  },
  required: {
    color: colors.danger,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing[3],
    paddingHorizontal: spacing[4],
    paddingVertical: Platform.OS === "ios" ? spacing[4] : spacing[3],
    fontSize: fontSize.sm,
    color: "#111827",
    backgroundColor: "#fff",
  },
  disabledInput: {
    backgroundColor: colors.grayLight,
    opacity: 0.6,
  },
  placeholder: {
    color: colors.grayDark,
    fontSize: fontSize.sm,
  },
  iconContainer: {
    top: Platform.OS === "ios" ? 15 : 18,
    right: 12,
  },
});
