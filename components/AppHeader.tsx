import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeft2 } from 'iconsax-react-native';
import { colors } from '@/constants/colors';
import { fontSize, fontWeight, fontFamily } from '@/constants/fonts';
import { spacing } from '@/constants/spacing';

interface AppHeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
  onRightPress?: () => void; // new prop for right button
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  showBackButton = false,
  onBackPress,
  rightComponent,
  onRightPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {showBackButton && (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <ArrowLeft2 size={24} color={colors.text} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.center}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.right}>
        {rightComponent && (
          <TouchableOpacity onPress={onRightPress} style={styles.rightButton}>
            {rightComponent}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3],
    backgroundColor: colors.background,
  },
  left: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backButton: {
    padding: 4,
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: fontSize.base,
    fontFamily: fontFamily.body,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  right: {
    width: 40,
    alignItems: 'flex-end',
  },
  rightButton: {
    padding: 4,
  },
});
