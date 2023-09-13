import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, SIZES} from '../../theme/Theme';
import Home from '../../screens/Home';

const DrawerNaigation = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerType="front"
      detachInactiveScreens={true}
      drawerPosition="left"
      screenOptions={{
        unmountOnBlur: true,
        gestureEnabled: true,
        swipeEnabled: true,
        headerShown: false,
        drawerStyle: {
          width: '85%',
        },
      }}
      initialRouteName={'DrawerHome'}
      backBehavior="initialRoute"
      hideStatusBar={false}
      drawerContent={props => (
        <View style={{flex: 1, paddingTop: SIZES.xxl}}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={{width: '100%', height: SIZES.height * 0.3}}
            resizeMode="contain"
          />

          <DrawerContentScrollView>
            {props.state.routes.map((route, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: SIZES.md,
                  paddingHorizontal: SIZES.lg,
                }}>
                <MaterialCommunityIcons
                  name={
                    route.name === 'Daily Forecast'
                      ? 'calendar-blank'
                      : route.name === 'Today Forecast'
                      ? 'circle-slice-5'
                      : 'star'
                  }
                  size={25}
                  color={COLORS.black}
                />
                <Text
                  style={{
                    width: '80%',
                    fontFamily: FONTS.bold,
                    color: COLORS.black,
                  }}>
                  {route.name}
                </Text>
              </TouchableOpacity>
            ))}
          </DrawerContentScrollView>
        </View>
      )}
      statusBarAnimation={true}>
      <Drawer.Screen
        name={'Daily Forecast'}
        component={Home}
        options={{
          drawerIcon: ({focused, size}) => (
            <Ionicons
              name={'home'}
              color={focused ? COLORS.primary : COLORS.lgGrey}
              size={size}
            />
          ),
        }}
      />

      <Drawer.Screen
        name={'Today Forecast'}
        component={Home}
        options={{
          drawerIcon: ({focused, size}) => (
            <MaterialCommunityIcons
              name={'account'}
              color={focused ? COLORS.primary : COLORS.lgGrey}
              size={size}
            />
          ),
        }}
      />

      <Drawer.Screen
        name={'Saved Locations'}
        component={Home}
        options={{
          drawerIcon: ({focused, size}) => (
            <MaterialCommunityIcons
              name={'bank-transfer'}
              color={focused ? COLORS.primary : COLORS.lgGrey}
              size={size}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNaigation;

const styles = StyleSheet.create({});
