//Library import
import {StyleSheet, View} from 'react-native';
import React, { useState } from 'react';
import {useSelector} from 'react-redux';

//Local import
import {colors, styles} from '@style';
import GSafeAreaView from '@components/common/GSafeAreaView';
import GText from '@components/common/GText';
import {moderateScale} from '@common/constants';
import strings from '@i18n/strings';
import GInput from '@components/common/GInput';
import GButton from '@components/common/GButton';
import Toast from 'react-native-toast-message';
import Verificatonmodal from '@components/modal/verificatonmodal';
import { Digit_code } from '@assets/svg';


export default function Numberverification({navigation,route}) {
  const theme = useSelector(state => state.theme.theme);
   const {name, password, phoneNumber} = route.params;
  const localStyle = getLocalStyle(theme);
   const [modalVisible, setModalVisible] = useState(false);


   const BASE_URL = `http://192.168.1.40:3001/users`;

   const Verified = async () => {
    if (!name || !name.trim() || !password || !phoneNumber) {
    Toast.show({
      type: 'error',
      text1: 'Missing required fields',
      text2: 'Please enter name, password, and phone number.',
    });
    return;
  }
 
    try {
      const userData = {
        name: name.trim(),
        password,
        mobile_number: phoneNumber,
      };

      // POST to json-server
      const response = await fetch(BASE_URL,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        Toast.show({
          type: 'success',
          text1: 'User signed up successfully!',
        });
        setModalVisible(true)
      } else {
        throw new Error('Failed to create user');
      }
    } catch (error) {
      console.error('Verification error:', error);
      Toast.show({
        type: 'error',
        text1: 'Signup failed',
      });
    }
  };
     
  return (

    <GSafeAreaView>
      <View style={styles.container}>
        <View style={localStyle.digit_bg}>
          <GText color={colors[theme].textColor} type={'m18'}>
            {strings.digitcode}
          </GText>
          <View style={localStyle.digit_code}>
            <Digit_code width={100} height={100} />
          </View>
          <View style={localStyle.button_container}>
            <GInput inputContainerStyle={localStyle.code_input} />
            <GInput inputContainerStyle={localStyle.code_input} />
            <GInput inputContainerStyle={localStyle.code_input} />
            <GInput inputContainerStyle={localStyle.code_input} />
          </View>
          <View style={[styles.flexRow, styles.center,styles.mt50]}>
            <GText color={colors[theme].inputcolor} type={'m14'}>
              {strings.getcode}
            </GText>
            <GText color={colors[theme].green} type={'b14'} style={styles.ml15}>
              {strings.Resend}
            </GText>
          </View>
          <View style={styles.justifyEnd}>
            <GButton
              containerStyle={localStyle.login_button}
              title={'Verify'}
              onPress={Verified}
              color={colors[theme].white}
              textType={'b16'}
            />
          </View>
        </View>
      </View>
      <Verificatonmodal modalVisible={modalVisible}  setModalVisible={setModalVisible}/>
    </GSafeAreaView>
  );
}

const getLocalStyle = theme =>
  StyleSheet.create({
    digit_bg: {
      backgroundColor: colors[theme].inputback,
      ...styles.center,
      ...styles.mv50,
      ...styles.pv50,
      borderRadius: moderateScale(40),
    },
    digit_code: {
      backgroundColor: colors[theme].imagebg,
      width: moderateScale(240),
      height: moderateScale(160),
      borderRadius: moderateScale(20),
      ...styles.center,
      ...styles.selfCenter,
      ...styles.mv20,
    },
    button_container: {
      ...styles.flexRow,
      gap: moderateScale(20),
      ...styles.mt40,
    },
    code_input: {
      width: moderateScale(65),
      height: moderateScale(65),
      borderRadius: moderateScale(25),
      backgroundColor: colors[theme].inputback,
      borderColor: colors[theme].inputborder,
      borderWidth: moderateScale(1),
    },
    login_button: {
      width: moderateScale(325),
      height: moderateScale(50),
      borderRadius: moderateScale(15),
      ...styles.mv25,
    },
  });
