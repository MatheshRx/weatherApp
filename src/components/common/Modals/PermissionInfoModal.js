import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
  Modal,
  Linking,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS, FONTS, SIZES} from '../../../theme/Theme';

const PermissionInfoModal = ({
  permissionInfoModal,
  setPermissionInfoModal,
  permissionNoteTxt,
}) => {
  return (
    <Modal visible={permissionInfoModal} transparent animationType={'slide'}>
      <Pressable
        onPress={() => setPermissionInfoModal(!permissionInfoModal)}
        //   onPress={() => null}
        style={{
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }}>
        <Pressable
          style={{
            flexDirection: 'row',
            backgroundColor: COLORS.white,
            padding: '3%',
            borderRadius: 4,
            width: SIZES.width * 0.95,
          }}>
          <View>
            <Text // # TITLE
              style={{
                fontFamily: FONTS.bold,
                fontSize: 25,
                marginBottom: '2%',
              }}>
              Note{' '}
              <MaterialCommunityIcons
                name="alert"
                size={25}
                color={COLORS.primary}
              />
            </Text>

            {/* // # BODY */}
            <View style={{paddingStart: '2%'}}>
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  color: COLORS.black,
                  fontSize: 16,
                }}>
                ENVO can't access your {permissionNoteTxt}, to allow
              </Text>

              {/* // # step 1 */}
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  color: COLORS.black,
                  marginVertical: '2%',
                }}>
                <FontAwesome
                  name="dot-circle-o"
                  size={15}
                  color={COLORS.dimGrey}
                />{' '}
                Go to App Settings{' '}
                <Ionicons
                  name="md-open-outline"
                  size={20}
                  color={COLORS.primary}
                  onPress={() => (
                    setPermissionInfoModal(!permissionInfoModal),
                    Linking.openSettings()
                  )}
                />
              </Text>

              {Platform.OS === 'android' && (
                <>
                  {/* // # step 2 */}
                  <Text
                    style={{
                      fontFamily: FONTS.regular,
                      color: COLORS.black,
                      marginBottom: '2%',
                    }}>
                    <FontAwesome
                      name="dot-circle-o"
                      size={15}
                      color={COLORS.dimGrey}
                    />{' '}
                    Select Permissions
                  </Text>
                  {/* // # step 3 */}
                  <Text style={{color: COLORS.black}}>
                    <FontAwesome
                      name="dot-circle-o"
                      size={15}
                      color={COLORS.dimGrey}
                    />{' '}
                    Select {`"${permissionNoteTxt}"`} and choose "Allow"
                  </Text>
                </>
              )}
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default PermissionInfoModal;

const styles = StyleSheet.create({});
