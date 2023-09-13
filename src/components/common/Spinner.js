import {StyleSheet, Modal, View, ActivityIndicator} from 'react-native';
import React from 'react';
import {COLORS} from '../../theme/Theme';

const Spinner = ({visible}) => {
  return (
    <Modal transparent visible={visible}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={'large'} color={COLORS.primary} />
      </View>
    </Modal>
  );
};

export default Spinner;

const styles = StyleSheet.create({});
