import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import Animated, {
  FadeInDown,
  FadeOutUp,
} from 'react-native-reanimated';

import { globalStyles } from '@/constants/globalStyles';
import { fontFamily, fontSize } from '@/constants/fonts';
import { colors } from '@/constants/colors';

import { useAuth } from '@/hooks/AuthContext';

const Index = () => {
  const {
    isAuthenticated,
    isLoading,
  } = useAuth();

  /* =========================================================
     HANDLE REDIRECT
  ========================================================= */

  useEffect(() => {
    if (isLoading) return;

    console.log('authenticated', isAuthenticated);

      if (isAuthenticated) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(authentication)/onboarding');
      }
  }, [isAuthenticated]);

  /* =========================================================
     SPLASH SCREEN
  ========================================================= */

  return (
    <SafeAreaView
      style={[
        globalStyles.container,
        globalStyles.centerContent,
        styles.container,
      ]}
    >
      {/* LOGO */}
      <Animated.Image
        entering={FadeInDown.duration(900)}
        exiting={FadeOutUp.duration(500)}
        source={require('../assets/images/favicon.png')}
        style={styles.logoImage}
        resizeMode="contain"
      />

      {/* APP NAME */}
      <Animated.Text
        entering={FadeInDown.delay(250).duration(900)}
        exiting={FadeOutUp.duration(500)}
        style={styles.textStyle}
      >
        SchoolHouse
      </Animated.Text>
    </SafeAreaView>
  );
};

export default Index;

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },

  logoImage: {
    width: 90,
    height: 90,
  },

  textStyle: {
    marginTop: 18,

    fontSize: fontSize.xl,

    fontFamily: fontFamily.logo,

    color: colors.text2,

    letterSpacing: 0.5,
  },
});