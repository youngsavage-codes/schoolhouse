import { StyleProp, TextStyle, ViewStyle } from "react-native";

export interface ButtonProp {
    label: string
    onPress: () => void;
    disabled?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
}