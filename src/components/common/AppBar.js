import {StyleSheet, Text, View, Pressable, Platform} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../../theme/Theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

const AppBar = props => {
  const {leftIcn, title, rightIcn} = props;
  return (
    <View style={styles.appBar}>
      {leftIcn && leftIcn}
      <Text style={styles.title}>{title}</Text>
      {rightIcn && rightIcn}
    </View>
  );
};

export default AppBar;

AppBar.propTypes = {
  title: PropTypes.string,
  leftIcn: PropTypes.element,
  onLeftIcnPress: PropTypes.func,
  rightIcn: PropTypes.element,
};

const styles = StyleSheet.create({
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: SIZES.lg,
    marginTop: Platform.OS === 'android' ? '10%' : '3%',
  },

  title: {
    fontFamily: FONTS.black,
    fontSize: 20,
    color: COLORS.white,
    paddingVertical: SIZES.md,
  },
});
