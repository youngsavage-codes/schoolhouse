import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import { colors } from "@/constants/colors";
import { fontSize } from "@/constants/fonts";
import { spacing } from "@/constants/spacing";
import { ArrowDown2 } from "iconsax-react-native";

interface SelectFieldProps {
  label: string;
  value?: string;
  placeholder?: string;
  options: string[];
  onSelect: (value: string) => void;
  required?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value = "",
  placeholder = "Select an option",
  options,
  onSelect,
  required = false,
}) => {
  const [visible, setVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const open = () => {
    setVisible(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 220,
      useNativeDriver: true,
    }).start();
  };

  const close = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 180,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [350, 0],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>

      <Pressable style={styles.selectBox} onPress={open}>
        <Text style={[styles.valueText, !value && styles.placeholder]}>
          {value || placeholder}
        </Text>
        <ArrowDown2 size={16} color={colors.grayDark} />
      </Pressable>

      <Modal transparent visible={visible} animationType="none">
        <View style={styles.modalWrapper}>
          <Pressable style={styles.overlay} onPress={close} />

          <Animated.View
            style={[styles.sheet, { transform: [{ translateY }] }]}
          >
            <View style={styles.sheetHeader}>
              <View style={styles.handle} />
              <Text style={styles.sheetTitle}>{label}</Text>
            </View>

            <FlatList
              data={options}
              keyExtractor={(item, i) => `${item}-${i}`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onSelect(item);
                    close();
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      value === item && styles.activeOption,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

export default SelectField;

const styles = StyleSheet.create({
  container: { marginBottom: spacing[4] },
  label: { fontSize: fontSize.xs, fontWeight: "500", marginBottom: 6 },
  required: { color: colors.danger },
  selectBox: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing[2],
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  valueText: { fontSize: fontSize.xs, color: "#111827" },
  placeholder: { color: "#9CA3AF" },
  modalWrapper: { flex: 1, justifyContent: "flex-end" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.35)" },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "55%",
    paddingBottom: 30,
  },
  sheetHeader: { alignItems: "center", paddingVertical: 12 },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D1D5DB",
    marginBottom: 6,
  },
  sheetTitle: { fontSize: fontSize.xs, fontWeight: "500" },
  option: { paddingVertical: 14, paddingHorizontal: 20 },
  optionText: { fontSize: fontSize.xs },
  activeOption: { color: colors.primary, fontWeight: "600" },
});
