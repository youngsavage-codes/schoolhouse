import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/components/button'
import { colors } from '@/constants/colors'
import { spacing } from '@/constants/spacing'

const SigninScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Hello</Text>
        <Text>Welcome to School House</Text>
      </View>
      <View>
        <Text>Sign In to your account</Text>
        <View>
          <Button
            label="Book Now"
            onPress={() => console.log("Pressed")}
            variant="primary"
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SigninScreen

const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      flex: 1,
      padding: spacing[6],
    },
})