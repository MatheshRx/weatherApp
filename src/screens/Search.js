import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Container from '../components/common/Container';
import {COLORS, FONTS, SIZES, STYLES} from '../theme/Theme';
import {useFocusEffect} from '@react-navigation/native';
import AndroidBackHandler from '../service/AndroidBackHandler';
import AppBar from '../components/common/AppBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FloatingInput from '../components/common/FloatinInput';
import {ToastError, ToastInfo} from '../components/common/ToastComponent';
import {ApiCall, cityData_URL} from '../service/API';
import Spinner from '../components/common/Spinner';
import moment from 'moment';
import getImg from '../service/getImg';

const Search = props => {
  const [city, setCity] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [weatherDetails, setWeatherDetails] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState('');

  useFocusEffect(useCallback(() => AndroidBackHandler(props), []));

  const searchCityData = async () => {
    try {
      setSpinner(true);
      const response = await ApiCall(cityData_URL(city));
      console.log('searchCityData RESPONSE', response.data.weather[0].icon);

      response.data
        ? setWeatherDetails({
            ...response.data,

            weather: [
              {
                ...response.data.weather[0],
                icon: getImg(response.data.weather[0].icon),
              },
            ],
          })
        : (setWeatherDetails(''), ToastInfo('No Data Found'));
      setWeatherIcon(response.data.weather[0].icon);
      setSpinner(false);
    } catch (error) {
      setWeatherDetails('');
      setSpinner(false);
      ToastError();
      console.log('searchCityData ERROR', error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Container img={require('../assets/images/searchCity.jpg')}>
        <AppBar
          title="Search City"
          leftIcn={
            <TouchableOpacity
              style={{marginEnd: SIZES.lg}}
              onPress={() => props.navigation.goBack()}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={28}
                color={COLORS.white}
              />
            </TouchableOpacity>
          }
        />
        <Spinner visible={spinner} />
        <View
          style={{
            flexDirection: 'row',
            // alignItems: 'center',
            paddingHorizontal: SIZES.lg,
          }}>
          <View
            style={{
              backgroundColor: COLORS.white,
              width: '75%',
              borderRadius: 8,
              height: 60,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: SIZES.md,
            }}>
            <MaterialCommunityIcons name="map-marker" size={30} />
            <TextInput
              style={{width: '85%'}}
              value={city}
              onChangeText={setCity}
              placeholder="City Name"
            />
          </View>

          <TouchableOpacity
            style={{
              width: '20%',
              backgroundColor: COLORS.btnBg,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              marginStart: '5%',
            }}
            onPress={() => searchCityData()}>
            <MaterialCommunityIcons
              name="magnify"
              size={25}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>

        {/* // @ MAIN */}
        {weatherDetails && (
          <View style={{alignItems: 'center', marginTop: SIZES.lg}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="map-marker"
                size={35}
                color={COLORS.white}
              />
              <Text
                style={{
                  fontFamily: FONTS.black,
                  fontSize: 20,
                  marginStart: SIZES.md,
                  color: COLORS.white,
                  letterSpacing: 0.8,
                  ...STYLES.textShadow,
                }}>
                {weatherDetails.name}
              </Text>
            </View>

            <View style={{marginTop: SIZES.sm}}>
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  color: COLORS.white,
                  ...STYLES.textShadow,
                }}>
                {moment().format('ddd DD MMMM hh:mm A')}
              </Text>
            </View>

            <View style={{marginTop: SIZES.md, flexDirection: 'row'}}>
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  fontSize: 110,
                  color: COLORS.white,
                  ...STYLES.textShadow,
                }}>
                {weatherDetails.main?.temp
                  ? `${weatherDetails.main?.temp}`.split('.')[0]
                  : ''}
                °
              </Text>
              <Image
                source={weatherDetails.weather[0].icon}
                style={{
                  height: 70,
                  width: 70,
                  resizeMode: 'contain',
                  position: 'absolute',
                  bottom: 0,
                  right: -70 / 2,
                }}
              />
            </View>
            <Text
              style={{
                fontFamily: FONTS.bold,
                color: COLORS.white,
                fontSize: 25,
                ...STYLES.textShadow,
              }}>
              {weatherDetails.weather?.[0].description
                ? weatherDetails.weather[0].description.toUpperCase()
                : '--'}
            </Text>
          </View>
        )}
      </Container>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({});
