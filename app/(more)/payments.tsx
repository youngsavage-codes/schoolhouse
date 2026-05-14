import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '@/components/AppHeader';
import { router } from 'expo-router';
import { spacing } from '@/constants/spacing';
import { fontFamily, fontWeight } from '@/constants/fonts';
import { colors } from '@/constants/colors';

const subscriptionInfo = {
  plan: "Premium School Plan",
  amount: "₦10,000 / month",
  nextBilling: "Feb 12, 2026",
  status: "Active",
};

const paymentHistory = [
  {
    id: "1",
    date: "Jan 12, 2026",
    amount: "₦10,000",
    status: "Successful",
  },
  {
    id: "2",
    date: "Dec 12, 2025",
    amount: "₦10,000",
    status: "Successful",
  },
  {
    id: "3",
    date: "Nov 12, 2025",
    amount: "₦10,000",
    status: "Failed",
  },
];

const PaymentCard = ({ item }) => (
  <View style={styles.card}>
    <View style={styles.cardTop}>
      <Text style={styles.amount}>{item.amount}</Text>
      <Text
        style={[
          styles.status,
          item.status === "Successful"
            ? styles.success
            : styles.failed,
        ]}
      >
        {item.status}
      </Text>
    </View>
    <Text style={styles.date}>{item.date}</Text>
  </View>
);

const Payments = () => {
  return (
    <View style={styles.safe}>
      <SafeAreaView style={{ flex: 1 }}>
        
        <View style={styles.headerWrap}>
          <AppHeader
            title="Payments"
            showBackButton
            onBackPress={() => router.back()}
          />
        </View>

        {/* Subscription Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subscription Status</Text>

          <View style={styles.subBox}>
            <Text style={styles.planText}>{subscriptionInfo.plan}</Text>
            <Text style={styles.subAmount}>{subscriptionInfo.amount}</Text>
            <Text style={styles.subLabel}>
              Next Billing: <Text style={styles.subValue}>{subscriptionInfo.nextBilling}</Text>
            </Text>
            <Text style={styles.subLabel}>
              Status:{" "}
              <Text
                style={[
                  styles.subValue,
                  subscriptionInfo.status === "Active"
                    ? styles.statusActive
                    : styles.statusInactive,
                ]}
              >
                {subscriptionInfo.status}
              </Text>
            </Text>
          </View>
        </View>

        {/* Payment History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment History</Text>

          {paymentHistory.length === 0 ? (
            <Text style={styles.empty}>No payments found</Text>
          ) : (
            <FlatList
              data={paymentHistory}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <PaymentCard item={item} />}
              contentContainerStyle={{ paddingBottom: spacing[10] }}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>

      </SafeAreaView>
    </View>
  );
};

export default Payments;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerWrap: {
    paddingHorizontal: spacing[4],
  },

  section: {
    marginTop: spacing[4],
    paddingHorizontal: spacing[4],
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fontFamily.heading,
    fontWeight: fontWeight.medium,
    marginBottom: spacing[3],
  },

  /* Subscription Box */
  subBox: {
    backgroundColor: colors.grayLight,
    padding: spacing[4],
    borderRadius: 12,
  },
  planText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: fontFamily.logo,
    marginBottom: spacing[1],
  },
  subAmount: {
    fontSize: 15,
    color: colors.text,
    marginBottom: spacing[2],
  },
  subLabel: {
    fontSize: 14,
    color: colors.grayDark,
    marginBottom: 4,
    fontFamily: fontFamily.heading,
  },
  subValue: {
    fontWeight: "600",
    fontFamily: fontFamily.heading,
  },
  statusActive: {
    color: "green",
    fontFamily: fontFamily.body,
  },
  statusInactive: {
    color: "red",
  },

  /* Payment History Card */
  card: {
    backgroundColor: "#F7F7F7",
    marginBottom: spacing[3],
    padding: spacing[4],
    borderRadius: 12,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amount: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: fontFamily.logo,
  },
  status: {
    fontSize: 13,
    fontWeight: "600",
  },
  success: {
    color: "green",
    fontFamily: fontFamily.logo,
  },
  failed: {
    color: "red",
    fontFamily: fontFamily.logo,
  },
  date: {
    marginTop: spacing[1],
    fontSize: 13,
    color: "#666",
    fontFamily: fontFamily.body,
  },

  empty: {
    textAlign: "center",
    color: "#999",
    fontSize: 14,
    paddingVertical: spacing[4],
  },
});
