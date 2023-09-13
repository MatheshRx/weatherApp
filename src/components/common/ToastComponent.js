import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import Toast from 'react-native-toast-message';

export const ToastSuccess = msg =>
  Toast.show({
    type: 'success',
    text1: msg ? msg : 'Action Success 👍',
  });

export const ToastInfo = msg =>
  Toast.show({
    type: 'info',
    text1: `ℹ️ ${msg}`,
  });

export const ToastError = msg =>
  Toast.show({
    type: 'error',
    text1: msg ? msg : 'Oops, Somethig went wrong❗',
  });

const styles = StyleSheet.create({});
