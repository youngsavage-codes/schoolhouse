import { StyleSheet, Text, View, Image, Animated, Easing } from "react-native";
import React, { useEffect, useRef } from "react";
import { colors } from "@/constants/colors";
import { fontFamily, fontSize } from "@/constants/fonts";
import { spacing } from "@/constants/spacing";
import { router } from "expo-router";

const AwaitVerification = () => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

        // ⏱️ Redirect after 5 seconds
    const timer = setTimeout(() => {
      router.replace("/(tabs)");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
        <Image
          source={require("../../assets/images/7980d53500ebf2f85fa14bf71c25888fd179692a.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </Animated.View>

      <Text style={styles.title}>Verification Pending</Text>
      <Text style={styles.message}>
        Your account is currently under review. Please wait while we verify
        your details. You will be notified once your account is approved.
      </Text>

      <View style={styles.dotsContainer}>
        <Animated.View style={[styles.dot, { opacity: pulseAnim }]} />
        <Animated.View style={[styles.dot, { opacity: pulseAnim.interpolate({
          inputRange: [1, 1.1],
          outputRange: [0.5, 1]
        }) }]} />
        <Animated.View style={[styles.dot, { opacity: pulseAnim.interpolate({
          inputRange: [1, 1.1],
          outputRange: [0.5, 1]
        }) }]} />
      </View>
    </View>
  );
};

export default AwaitVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing[4],
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: spacing[4],
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing[2],
    textAlign: "center",
    fontFamily: fontFamily.heading,
  },
  message: {
    fontSize: fontSize.sm,
    color: "#403E47",
    textAlign: "center",
    lineHeight: 22,
    fontFamily: fontFamily.body,
    marginBottom: spacing[4],
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
});
