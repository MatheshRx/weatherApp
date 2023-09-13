import {Animated, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS, FONTS, SIZES, STYLES} from '../../theme/Theme';
import PropTypes from 'prop-types';

const FloatingInput = React.forwardRef((props, ref) => {
  const {
    txtInptStyle,
    cntnrStyle,
    floatingTxtCntnr,
    label,
    labelStyle,
    value,
    leftIcon,
    rightIcon,
    moveLblInY,
    moveLblInX,
  } = props;
  const [focused, setFocused] = useState(false);

  const [labelAnimationValue] = useState(new Animated.Value(0));
  const [labelAnimationFsValue] = useState(new Animated.Value(1));

  useEffect(() => {
    // console.log('input comp', props.multiline);
    // console.log('ref', ref);

    if (value && !labelAnimationValue._value) animateLabel();
    else if (!value && !focused) animateLabel('DOWN');
  }, [value]);

  const animateLabel = (direction = 'UP') => {
    Animated.timing(labelAnimationValue, {
      toValue: direction === 'DOWN' ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    Animated.timing(labelAnimationFsValue, {
      toValue: direction === 'DOWN' ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const textTransformX = labelAnimationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, moveLblInX ? moveLblInX : -1],
  });

  const textTransformY = labelAnimationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, moveLblInY ? moveLblInY : props.multiline ? -10 : -24],
  });

  const fontSizeAnimVal = labelAnimationFsValue.interpolate({
    inputRange: [0, 1],
    outputRange: [12, 14],
  });
  return (
    <View
      style={[
        STYLES.boxShadow,
        {
          backgroundColor: COLORS.white,
          borderRadius: SIZES.lg,
          flexDirection: 'row',
          justifyContent: 'space-between',
          minHeight: 52,
          position: 'relative',
        },
        cntnrStyle,
      ]}>
      {leftIcon && leftIcon}
      <Animated.View
        style={[
          styles.floatingTxtCntnr,
          floatingTxtCntnr,
          {
            top: props.multiline && (focused || value) ? 0 : '30%',
            transform: [
              {
                translateX: textTransformX,
              },
              {
                translateY: textTransformY,
              },
            ],
          },
        ]}>
        <Animated.Text
          style={[
            {fontSize: fontSizeAnimVal},
            styles.floatingText(focused || value),
            labelStyle,
          ]}>
          {label}
        </Animated.Text>
      </Animated.View>
      <TextInput
        ref={ref}
        onFocus={() => (setFocused(true), props.onFocus?.(), animateLabel())}
        onBlur={() => (
          setFocused(false), props.onBlur?.(), !value && animateLabel('DOWN')
        )}
        style={[
          {
            marginStart: '3%',
            fontFamily: FONTS.regular,
            width: '80%',
            marginTop: 2,
            color: props.disabled ? COLORS.dimGrey : COLORS.black,
            ...txtInptStyle,
          },
          props.multiline && {marginTop: '2.5%'},
        ]}
        {...props}
      />
      {rightIcon && (
        <View
          style={{
            width: '10%',
            alignSelf: 'center',
            marginEnd: '4%',
            ...props.rightIconStyle,
          }}>
          {rightIcon}
        </View>
      )}
    </View>
  );
});

export default FloatingInput;

FloatingInput.propTypes = {
  txtInptStyle: PropTypes.object,
  cntnrStyle: PropTypes.object,
  floatingTxtCntnr: PropTypes.object,
  label: PropTypes.string,
  labelStyle: PropTypes.object,
  value: PropTypes.any,
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
  moveLblInY: PropTypes.number,
  moveLblInX: PropTypes.number,
};

const styles = StyleSheet.create({
  floatingTxtCntnr: {
    position: 'absolute',
    top: '30%',
    left: '2%',
    zIndex: -999,
    backgroundColor: 'transparent',
    paddingHorizontal: '2%',
    width: '60%',
  },

  floatingText: highlight => ({
    paddingStart: '2%',
    color: highlight ? '#000' + 8 : COLORS.black,
    fontFamily: FONTS.bold,
  }),
});
