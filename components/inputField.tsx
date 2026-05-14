import { colors } from '@/constants/colors';
import { fontSize } from '@/constants/fonts';
import { spacing } from '@/constants/spacing';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  Pressable,
} from 'react-native';
import { Eye, EyeSlash } from 'iconsax-react-native';

interface CustomTextInputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  required?: boolean;
  error?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  value,
  onChangeText,
  required = false,
  error,
  secureTextEntry,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(!!secureTextEntry);

  const borderColor = error
    ? colors.warning || '#EF4444'
    : isFocused
    ? colors.primary
    : colors.border;

  return (
    <View style={styles.container}>
      {/* LABEL */}
      <Text
        style={[
          styles.label,
          isFocused && styles.labelFocused,
          error && styles.labelError,
        ]}
      >
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>

      {/* INPUT WRAPPER */}
      <View style={[styles.inputWrapper, { borderColor }]}>
        <TextInput
          style={[
            styles.input,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#9CA3AF"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          {...props}
        />

        {/* 👁️ EYE ICON (ONLY FOR PASSWORD) */}
        {secureTextEntry && (
          <Pressable
            onPress={() => setHidePassword((prev) => !prev)}
            style={styles.eyeBtn}
          >
            {hidePassword ? (
              <EyeSlash size={20} color="#6B7280" />
            ) : (
              <Eye size={20} color="#6B7280" />
            )}
          </Pressable>
        )}
      </View>

      {/* ERROR */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[4],
    width: '100%',
  },

  label: {
    fontSize: fontSize.xs,
    color: colors.text,
    marginBottom: 4,
    fontWeight: '500',
  },

  labelFocused: {
    color: colors.primary,
  },

  labelError: {
    color: '#EF4444',
  },

  required: {
    color: '#EF4444',
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: spacing[3],
    paddingRight: spacing[3],
    backgroundColor: '#fff',
  },

  input: {
    flex: 1,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    fontSize: fontSize.sm,
    color: '#111827',
  },

  eyeBtn: {
    padding: 4,
  },

  errorText: {
    marginTop: 4,
    fontSize: fontSize.xs,
    color: '#EF4444',
  },
});