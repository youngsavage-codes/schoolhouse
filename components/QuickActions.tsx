import { fontFamily, fontWeight } from '@/constants/fonts';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const ACTION_WIDTH = width / 2 - 20; // 2 items per row

interface ActionItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  onPress?: () => void;
}

interface Props {
  actions: ActionItem[];
}

const QuickActions: React.FC<Props> = ({ actions }) => {
  return (
    <View style={styles.container}>
      {actions.map((action) => (
        <TouchableOpacity
          key={action.id}
          style={[styles.actionCard, { borderColor: action.color }]}
          activeOpacity={0.7}
          onPress={action.onPress}
        >
          <View style={styles.iconWrapper}>
            {React.cloneElement(action.icon as React.ReactElement, { color: action.color })}
          </View>
          <Text style={[styles.actionText, { color: action.color }]}>{action.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default QuickActions;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: ACTION_WIDTH,
    height: 80,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  iconWrapper: {
    marginRight: 12,
  },
  actionText: {
    fontSize: 14,
    fontFamily: fontFamily.body,
    fontWeight: fontWeight.medium,
  },
});
