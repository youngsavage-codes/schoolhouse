// globalStyles.ts
import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { fontFamily, fontSize, fontWeight } from './fonts';

export const globalStyles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  column: {
    flexDirection: 'column',
  },

  // Typography
  heading: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    fontFamily: fontFamily.heading,
  },

  subheading: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semiBold,
    color: colors.text,
    fontFamily: fontFamily.heading,
  },

  bodyText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.normal,
    color: colors.text,
    fontFamily: fontFamily.body,
  },

  smallText: {
    fontSize: fontSize.sm,
    color: colors.grayDark,
    fontFamily: fontFamily.body,
  },

  linkText: {
    color: colors.link,
    textDecorationLine: 'underline',
    fontSize: fontSize.base,
    fontFamily: fontFamily.body,
  },

  // Buttons
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: fontSize.base,
    fontWeight: fontWeight.semiBold,
    fontFamily: fontFamily.body,
  },

  // Inputs
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    padding: 10,
    borderRadius: 6,
    fontSize: fontSize.base,
    fontFamily: fontFamily.body,
    color: colors.text,
  },

  // Spacing utilities (examples)
  mt2: {
    marginTop: 8,
  },
  mb3: {
    marginBottom: 16,
  },
});
