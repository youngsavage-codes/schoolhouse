import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ButtonProp } from '@/interface/others.interface'
import { colors } from '@/constants/colors'

const Button: React.FC<ButtonProp> = ({ label, onPress, disabled = false, labelStyle, containerStyle }) => {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={[styles.pressable, containerStyle]}>
      {/* Background Circles */}
      <View style={styles.buttonContainer1} />
      <View style={styles.buttonContainer2} />

      {/* Label */}
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
  pressable: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: 180,
    height: 160,
  },
  buttonContainer1: {
    width: 169,
    height: 140,
    backgroundColor: colors.btncon,
    borderRadius: 84.5, // Half of width/height to make it circular
    position: 'absolute',
    right: 10,
    top: -20,
    zIndex: 0,
  },
  buttonContainer2: {
    width: 169,
    height: 140,
    backgroundColor: colors.btncon,
    borderRadius: 84.5,
    position: 'absolute',
    right: 20,
    top: -10,
    zIndex: 1,
  },
  label: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '400',
    zIndex: 2,
  }
})
