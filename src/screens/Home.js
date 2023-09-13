import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useCallback, useState} from 'react';
import Container from '../components/common/Container';
import AppBar from '../components/common/AppBar';
import {COLORS, FONTS, SIZES, STYLES} from '../theme/Theme';
import Toast from 'react-native-toast-message';
import {ToastError, ToastInfo} from '../components/common/ToastComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useFocusEffect} from '@react-navigation/native';
import {AndroidExitHandler} from '../service/AndroidBackHandler';
import {ApiCall, currentLocationData_URL} from '../service/API';
import Spinner from '../components/common/Spinner';
import Geolocation from '@react-native-community/geolocation';

import moment from 'moment';
import getImg from '../service/getImg';

const Home = props => {
  const [spinner, setSpinner] = useState(false);
  const [lat, setlat] = useState('');
  const [lon, setLon] = useState('');
  const [weatherDetails, setWeatherDetails] = useState({});
  const [hourlyDetails, setHourlyDetails] = useState([]);

  const [isNight, setIsNight] = useState(true);

  const i = '../assets/images/01d.png';

  useFocusEffect(
    useCallback(() => {
      return AndroidExitHandler();
    }, []),
  );

  useEffect(() => {
    getCoords();
    checkTime();
  }, []);

  const getCoords = () => {
    Geolocation.getCurrentPosition(
      info => {
        console.log('Location info', info);
        setlat(info?.coords.latitude);
        setLon(info?.coords.longitude);
        getCurrentLocationData(info?.coords.latitude, info?.coords.longitude);
      },
      err => console.log(err),
      {enableHighAccuracy: true},
    );
  };

  const getCurrentLocationData = async (lat, lon) => {
    try {
      setSpinner(true);
      const response = await ApiCall(currentLocationData_URL(lat, lon));
      console.log('getCurrentLocationData RESPONSE', response.data.hourly[0]);

      setWeatherDetails({
        ...response.data,
        current: {
          ...response.data.current,
          weather: [
            {
              ...response.data.current.weather[0],
              icon: getImg(`${response.data.current.weather[0].icon}`),
            },
          ],
        },
      });

      setHourlyDetails(
        response.data.hourly.map(item => ({
          ...item,
          weather: [
            {
              ...item.weather[0],
              icon: getImg(`${item.weather[0].icon}`),
            },
          ],
        })),
      );
      setSpinner(false);
    } catch (error) {
      setSpinner(false);
      ToastError();
      console.log('getCurrentLocationData ERROR', error);
    }
  };

  const checkTime = () => {
    if (
      moment().isAfter(moment('6:30', 'HH:mm')) &&
      moment().isBefore(moment('18:30', 'HH:mm'))
    ) {
      console.log('Day');
      setIsNight(false);
    } else {
      console.log('night');
      setIsNight(true);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Container
        img={isNight ? require('../assets/images/nightBg.jpg') : isNight}>
        {/* // @ HEADER */}
        <AppBar
          title=""
          leftIcn={
            <View style={styles.appbarleft}>
              <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                <Image
                  source={require('../assets/images/sidebaropen.png')}
                  style={{
                    height: 25,
                    width: 25,
                    resizeMode: 'contain',
                    tintColor: COLORS.white,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => null}>
                <MaterialCommunityIcons
                  name="refresh"
                  size={28}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            </View>
          }
          rightIcn={
            <View style={styles.appbarRight}>
              <TouchableOpacity onPress={() => null}>
                <MaterialCommunityIcons
                  name="star-outline"
                  size={28}
                  color={COLORS.white}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Search')}>
                <MaterialCommunityIcons
                  name="magnify"
                  size={28}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            </View>
          }
        />
        <Spinner visible={spinner} />
        <View style={{flex: 1}}>
          {/* // @ MAIN */}
          <View style={{alignItems: 'center', marginTop: -SIZES.lg}}>
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
                LOCATION
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
                {weatherDetails.current?.temp
                  ? `${weatherDetails.current?.temp}`.split('.')[0]
                  : ''}
                °
              </Text>
              <Image
                source={weatherDetails.current?.weather[0].icon}
                style={{
                  height: 50,
                  width: 50,
                  resizeMode: 'stretch',
                  position: 'absolute',
                  bottom: 5,
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
              {weatherDetails.current?.weather[0].description
                ? weatherDetails.current?.weather[0].description.toUpperCase()
                : '--'}
            </Text>
          </View>

          {/* // @ CARDS */}
          <View style={{paddingHorizontal: SIZES.lg}}>
            {/* // ~ C-1 */}
            <View style={styles.card}>
              <View style={{alignItems: 'center', width: '29%'}}>
                <Image
                  source={require('../assets/images/img.png')}
                  style={styles.cardIcons}
                />
                <Text style={styles.cardTxt}>Max Temp</Text>
                <Text style={styles.wthrValues}>
                  {weatherDetails.current?.temp}°C
                </Text>
              </View>

              <View style={{alignItems: 'center', width: '29%'}}>
                <Image
                  source={require('../assets/images/humidity.png')}
                  style={styles.cardIcons}
                />
                <Text style={styles.cardTxt}>Humidity</Text>
                <Text style={styles.wthrValues}>
                  {weatherDetails.current?.humidity}%
                </Text>
              </View>

              <View style={{alignItems: 'center', width: '29%'}}>
                <Image
                  source={require('../assets/images/wind.png')}
                  style={styles.cardIcons}
                />
                <Text style={styles.cardTxt}>Wind</Text>
                <Text style={styles.wthrValues}>
                  {weatherDetails.current?.wind_speed} m/s
                </Text>
              </View>
            </View>

            {/* // ~ C-2 */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                backgroundColor: COLORS.white,
                borderRadius: 30,
                marginTop: SIZES.xl,
                ...STYLES.boxShadow,
              }}
              contentContainerStyle={{
                padding: SIZES.xl,
              }}>
              {hourlyDetails.map((item, index) => (
                <View
                  key={index}
                  style={{alignItems: 'center', width: SIZES.width * 0.28}}>
                  <Text style={styles.wthrValues}>{item.temp}°C</Text>
                  <Text style={styles.cardTxt}>Max Temp</Text>

                  <Image
                    source={item.weather[0].icon}
                    style={styles.cardWthrIcn}
                  />
                  <Text style={styles.cardTxt}>
                    {moment(item.dt).format('hh:mm A')}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Container>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  appbarleft: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '20%',
    columnGap: SIZES.xl,
  },

  appbarRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: SIZES.xl,
    position: 'absolute',
    right: SIZES.lg,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 30,
    padding: SIZES.xl,
    paddingVertical: SIZES.xl + 4,
    marginTop: SIZES.xl,
    ...STYLES.boxShadow,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardIcons: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    marginBottom: SIZES.sm,
  },

  cardWthrIcn: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    marginTop: SIZES.md + 4,
  },

  cardTxt: {
    fontFamily: FONTS.bold,
  },

  wthrValues: {
    fontFamily: FONTS.bold,
    color: COLORS.black,
    fontSize: 16,
  },
});
