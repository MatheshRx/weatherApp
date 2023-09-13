import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {COLORS, FONTS} from './src/theme/Theme';
import Splash from './src/screens/Splash';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';
import DrawerNaigation from './src/components/navigator/DrawerNaigation';

import Geolocation from '@react-native-community/geolocation';
import Search from './src/screens/Search';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  useEffect(() => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'auto',
      enableBackgroundLocationUpdates: false,
      locationProvider: 'auto',
    });
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Splash">
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Home" component={DrawerNaigation} />
          <Stack.Screen name="Search" component={Search} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast position="bottom" bottomOffset={20} />
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },

  testText: {
    fontFamily: FONTS.black,
    fontSize: 22,
    color: COLORS.black,
  },
});

export default App;
