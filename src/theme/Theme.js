import {Dimensions, StyleSheet} from 'react-native';

export const COLORS = {
  primary: '#F55006',
  primaryLight: '#D9ACC6',
  acccent: '#bde0fe',
  secondary: '#122C5E',
  secondaryLight: '#115DA4',
  darkBg: '#5C4FA8',
  lightBg: '#2885CC',

  white: '#FFFFFF',
  black: '#000000',

  dimGrey: '#696969',
  lgGrey: '#CFCFCF',

  btnBg: '#6274bd',

  red: 'red',
  green: 'green',
};

export const SIZES = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 22,
  xxl: 34,

  height: Dimensions.get('screen').height,
  width: Dimensions.get('screen').width,
};

export const FONTS = {
  thin: 'Lato-Thin',
  thinItalic: 'Lato-ThinItalic',

  light: 'Lato-Light',
  lightItalic: 'Lato-LightItalic',

  regular: 'Lato-Regular',
  Italic: 'Lato-Italic',

  bold: 'Lato-Bold',
  boldItalic: 'Lato-BoldItalic',

  black: 'Lato-Black',
  blackItalic: 'Lato-BlackItalic',
};

export const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.lg,
    backgroundColor: COLORS.white,
  },

  boxShadow: {
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 8,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 10,
  },
});
