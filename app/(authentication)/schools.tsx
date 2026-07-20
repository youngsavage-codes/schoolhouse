import {
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import React, { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import Button from '@/components/button';
import { AntDesign } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { fontFamily, fontSize } from '@/constants/fonts';
import { ArrowLeft2, SearchNormal1 } from 'iconsax-react-native';
import { useFetch } from '@/hooks/useFetch';

const SchoolsPage = () => {
  const { accountType } = useLocalSearchParams();
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  // Fetch schools from API
  const { data, isSuccess } = useFetch({
    url: '/schools',
    keys: ['schools', search],
    options: {
      params: [search]
    }
  });

  // console.log('schools', data.data.schools)

  // Extract schools array safely
  const schools = isSuccess && data?.data.schools ? data.data.schools : [];

  const handleProceed = () => {
    if (!selectedSchool) {
      alert('Please select a school before proceeding.');
      return;
    }

    router.push({
      pathname: '/(authentication)/signup',
      params: {
        accountType,
        schoolId: selectedSchool,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <Pressable onPress={() => router.back()} style={styles.backBtn}>
        <ArrowLeft2 size={18} color={colors.text} />
      </Pressable>

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Select Your School</Text>
        <Text style={styles.greetingDesc}>
          Select the school you want to belong to
        </Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <SearchNormal1 size={18} color={colors.grayDark} />
          <TextInput
            placeholder="Search by name, LGA, state or address"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
            placeholderTextColor={colors.grayDark}
          />
        </View>

        <FlatList
          data={schools}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ marginTop: spacing[4] }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No schools found</Text>
          }
          renderItem={({ item }) => {
            const isSelected = selectedSchool === item.id;

            // Get initials from school name
            const initials = item.name
              .split(' ')
              .map((word) => word[0])
              .join('')
              .toUpperCase()
              .slice(0, 2);

            return (
              <Pressable
                onPress={() => setSelectedSchool(item.id)}
                style={[
                  styles.schoolCard,
                  { borderColor: isSelected ? colors.primary : colors.border },
                ]}
              >
                {item.logo ? (
                  <Image
                    source={{ uri: item.logo }}
                    style={styles.logo}
                  />
                ) : (
                  <View style={styles.initialsLogo}>
                    <Text style={styles.initialsText}>{initials}</Text>
                  </View>
                )}

                <View style={{ flex: 1 }}>
                  <Text style={styles.schoolName}>{item.name}</Text>
                  <Text style={styles.schoolAddress}>
                    {item.streetAddress}, {item.lga}, {item.state}
                  </Text>
                  <Text style={styles.schoolPhone}>{item.phoneNumber}</Text>
                </View>

                {isSelected && (
                  <AntDesign
                    name="check-circle"
                    size={20}
                    color={colors.primary}
                  />
                )}
              </Pressable>
            );
          }}
        />
      </View>

      <Button
        disabled={!selectedSchool}
        label="Continue"
        onPress={handleProceed}
        variant="primary"
      />
    </SafeAreaView>
  );
};

export default SchoolsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing[6],
  },
  backBtn: {
    marginBottom: spacing[4],
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  greetingDesc: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.sm,
    color: colors.text,
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing[4],
    paddingHorizontal: spacing[4],
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    height: 44,
    backgroundColor: colors.background,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing[2],
    fontSize: 13,
    color: colors.text,
    fontFamily: fontFamily.body,
  },
  schoolCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[4],
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: spacing[3],
    backgroundColor: colors.background,
  },
  initialsLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + '33', // slightly transparent primary
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[4],
  },
  initialsText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: spacing[4],
  },
  schoolName: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.text,
  },
  schoolAddress: {
    fontSize: 12,
    color: colors.grayDark,
  },
  schoolPhone: {
    fontSize: 12,
    color: colors.grayDark,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: spacing[6],
    color: colors.grayDark,
    fontSize: 13,
  },
});