import { colors } from '@/constants/colors';
import { fontFamily, fontSize, fontWeight } from '@/constants/fonts';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 20;

interface DashboardItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  onPress?: () => void;
  disabled?: boolean; // ✅ added
}

interface Props {
  items: DashboardItem[];
}

const getSoftColor = (color: string) => {
  // if rgba already → reduce opacity
  if (color.startsWith('rgba')) {
    return color.replace(/[\d.]+\)$/g, '0.1)');
  }

  // if hex → add opacity
  if (color.startsWith('#')) {
    return color + '20'; // safe for hex
  }

  return color;
};

const Dashboard: React.FC<Props> = ({ items }) => {
  // ✅ safe empty state
  if (!items?.length) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No items available</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: DashboardItem }) => {
    const isDisabled = item.disabled;

    return (
      <Pressable
        style={({ pressed }) => [
          styles.card,
          {
            borderColor: item.color,
            backgroundColor: getSoftColor(item.color),
            opacity: isDisabled ? 0.5 : pressed ? 0.8 : 1,
          },
        ]}
        onPress={item.onPress}
        disabled={isDisabled}
      >
        <View style={styles.iconWrapper}>
          {React.isValidElement(item.icon)
            ? React.cloneElement(item.icon, {
                color: colors.grayDark,
              })
            : item.icon}
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    width: CARD_WIDTH,
    height: 100,
    borderRadius: 12,
    borderWidth: 1,
    padding: 15,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    marginRight: 12,
  },
  title: {
    fontSize: fontSize.base,
    fontFamily: fontFamily.heading,
    fontWeight: fontWeight.medium,
    color: colors.grayDark,
    flexShrink: 1,
  },
  empty: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
  },
});