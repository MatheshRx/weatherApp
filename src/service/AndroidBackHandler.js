import {Alert, BackHandler, Platform} from 'react-native';

export default AndroidBackHandler = props => {
  if (Platform.OS === 'android') {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        props.navigation.goBack();

        return true;
      },
    );
    return backHandler.remove;
  }
  return () => null;
};

export const AndroidExitHandler = () => {
  if (Platform.OS === 'android') {
    const onBackPress = () => {
      Alert.alert('ENVO', 'Do you want to exit the app ?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };
    const unSubscribe = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );
    return () => unSubscribe.remove();
  }
  return () => null;
};
