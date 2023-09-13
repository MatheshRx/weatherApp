import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SIZES, COLORS, STYLES, FONTS} from '../theme/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApiCall, verifyDeviceUrl} from '../service/API';

const Splash = props => {
  useEffect(() => {
    const timeOutID = setTimeout(() => {
      props.navigation.navigate('Home');
    }, 2000);

    return () => clearTimeout(timeOutID);
  }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <View
        style={[
          STYLES.container,
          {alignItems: 'center', justifyContent: 'center'},
        ]}>
        <Image
          source={require('../assets/images/splash.png')}
          style={{width: '95%'}}
        />
      </View>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  nametxt: {
    fontFamily: FONTS.bold,
    color: COLORS.lightBg,
    fontSize: 40,
    marginBottom: SIZES.xxl,
  },
});
