import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated'
import { StyleSheet} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import React, { useEffect } from 'react'
import { globalStyles } from '@/constants/globalStyles'
import { fontFamily, fontSize } from '@/constants/fonts'
import { colors } from '@/constants/colors'

const Index = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/(authentication)/onboarding')
    }, 5000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <SafeAreaView style={[globalStyles.container, globalStyles.centerContent]}>
      <Animated.Image
        entering={FadeInDown.duration(1000)}
        exiting={FadeOutUp.duration(1000)}
        source={require('../../assets/images/favicon.png')}
        style={styles.logoImage}
      />

      <Animated.Text
        entering={FadeInDown.delay(300).duration(1000)}
        exiting={FadeOutUp.duration(1000)}
        style={styles.textStyle}
      >
        School House
      </Animated.Text>
    </SafeAreaView>
  )
}

export default Index

const styles = StyleSheet.create({
  logoImage: {
    width: 70,
    height: 70,
    objectFit: 'cover',
  },
  textStyle: {
    fontSize: fontSize.xl,
    marginTop: 20,
    fontFamily: fontFamily.logo,
    color: colors.text2,
  },
})
