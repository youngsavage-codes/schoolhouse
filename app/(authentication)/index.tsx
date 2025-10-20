import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const index = () => {
  return (
    <View>
      <Text>index</Text>
      <Pressable onPress={() => router.push('/(authentication)/signin')} />
    </View>
  )
}

export default index

const styles = StyleSheet.create({})