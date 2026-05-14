import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/constants/colors'
import { spacing } from '@/constants/spacing'
import { fontFamily, fontSize, fontWeight } from '@/constants/fonts'
import { AntDesign } from '@expo/vector-icons' // ✅ For arrow icon
import { router } from 'expo-router'

const OnboardingScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  // ✅ Carousel content
const carouselContent = [
  {
    id: 1,
    image: require('../../assets/images/onboarding1.png'),
    header: 'For Parents',
    desc: 'Be a part of your child’s education. Stay informed and be part of the community.'
  },
  {
    id: 2,
    image: require('../../assets/images/onboarding2.png'),
    header: 'For Teachers',
    desc: 'Communicate, earn, and achieve more—quickly and efficiently.'
  },
  {
    id: 3,
    image: require('../../assets/images/onboarding3.png'),
    header: 'For School Admins',
    desc: 'Experience a more reliable, simple, and efficient way to manage and administer your school.'
  }
]


  // ✅ Handle Next button click
  const handleNext = () => {
    if (activeIndex < carouselContent.length - 1) {
      setActiveIndex(activeIndex + 1)
    } else {
      // 🚀 Navigate or finish onboarding
      router.replace('/(authentication)/signin')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔹 Top Section: Skip Button */}
      <View style={styles.topSection}>
        <Pressable onPress={() => router.replace('/(authentication)/signin')}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </Pressable>
      </View>
      {/* 🔹 Middle Section: Logo + Illustration */}
        <View style={styles.middleSection}>
          <Image
            source={carouselContent[activeIndex].image}
            style={styles.illustrationImage}
            resizeMode="contain"
          />
        </View>

      {/* 🔹 Bottom Section: Text + Buttons */}
      <View style={styles.bottomSection}>
        <Text style={styles.headingText}>
          {carouselContent[activeIndex].header}
        </Text>
        <Text style={styles.descText}>
          {carouselContent[activeIndex].desc}
        </Text>

        <View style={styles.buttonContainer}>
          {/* 🔸 Progress Indicator (left side) */}
          <View style={styles.indicatorContainer}>
            {carouselContent.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicatorDot,
                  index === activeIndex && styles.activeDot,
                ]}
              />
            ))}
          </View>

          {/* 🔸 Next Button (right side) */}
          <Pressable style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
            <AntDesign
              name="right"
              size={15}
              color={colors.text2}
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default OnboardingScreen

// ===================== STYLES =====================
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    padding: spacing[6],
  },

  // 🔹 Sections
  topSection: {
    alignItems: 'flex-end',
  },
  middleSection: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: spacing[5],
  },

  // 🔹 Logo + Illustration
  illustrationImage: {
    width: '90%',
    height: 300,
  },

  // 🔹 Texts
  skipButtonText: {
    color: colors.primary,
    fontFamily: fontFamily.logo,
  },
  headingText: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.logo,
    color: colors.primary,
    marginBottom: spacing[3],
  },
  descText: {
    fontSize: fontSize.sm,
    color: colors.text,
    fontFamily: fontFamily.body,
    marginBottom: spacing[5],
  },

  // 🔹 Buttons + Indicators
  buttonContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  indicatorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.grayDark,
    opacity: 0.4,
  },
  activeDot: {
    width: 20,
    backgroundColor: colors.primary,
    opacity: 1,
  },
  nextButton: {
    flexDirection: 'row', // ✅ Align text and arrow horizontally
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 160,
    height: 55,
    borderRadius: 100,
    backgroundColor: colors.primary,
  },
  nextButtonText: {
    color: colors.text2,
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
    fontFamily: fontFamily.logo,
  },
})
