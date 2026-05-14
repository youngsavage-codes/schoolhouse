import React from 'react';
import { Pressable, StyleSheet, Text, View, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { colors } from '@/constants/colors';
import { fontSize, fontWeight } from '@/constants/fonts';

export interface ButtonProps {
  label: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'outline' | 'ghost'; // customizable button styles
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
}

/**
 * Reusable Button component with layered circular design and flexible variants.
 */
const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  containerStyle,
  labelStyle,
}) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.pressable,
        variant === 'primary' && styles.primary,
        variant === 'outline' && styles.outline,
        variant === 'ghost' && styles.ghost,
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        containerStyle,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  pressable: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    height: 50,
    borderRadius: 50,
    overflow: 'hidden',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  outline: {
    borderWidth: 2,
    borderColor: colors.btncon,
    backgroundColor: 'transparent',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    color: colors.text2,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.normal,
    zIndex: 2,
  },
});
