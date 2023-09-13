import {StatusBar, StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';
import {} from 'react-native';

const Container = props => {
  return (
    <ImageBackground
      source={
        props.img ? props.img : require('../../assets/images/screensBg.jpg')
      }
      style={{flex: 1, paddingBottom: props.bottomNavigator ? '16%' : 0}}>
      <StatusBar
        barStyle="default"
        hidden={false}
        animated={true}
        // backgroundColor={color.darkBg}
        backgroundColor={'transparent'}
        translucent
      />
      {props.children}
    </ImageBackground>
  );
};

export default Container;

const styles = StyleSheet.create({});
