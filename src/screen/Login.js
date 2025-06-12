import {Button, StyleSheet, View} from 'react-native';
import React from 'react';
import {colors} from '../style';
import GSafeAreaView from '../componets/common/GSafeAreaView';
import Cartgreen from '../assets/svg/cartgreen.svg';
import Google from '../assets/svg/google_icon.svg';
import Apple from '../assets/svg/Apple_icon.svg';
import {moderateScale} from '../common/constants';
import {styles} from '../style';
import strings from '../i18n/strings';
import GText from '../componets/common/GText';
import GInput from '../componets/common/GInput';
import GButton from '../componets/common/GButton';
import {useSelector} from 'react-redux';

export default function Login() {
  const theme = useSelector(state => state.theme.theme);
  const localStyle = getLocalStyle(theme);

  return (
    <GSafeAreaView style={{backgroundColor: colors[theme].white}}>
      <View style={[styles.mt50, styles.container]}>
        <View style={[localStyle.Cartgreen_bg]}>
          <Cartgreen width={65} height={55} />
        </View>
        <GText
          color={colors[theme].textColor}
          type={'b24'}
          align={'center'}
          style={styles.mt40}>
          {strings.welcome}
        </GText>
        <GText
          color={colors[theme].green}
          type={'b24'}
          align={'center'}
          style={styles.mb30}>
          {strings.EGrocery}
        </GText>
          <GInput
            label={strings.PhoneNumber}
            placeholder={'username'}
            editable={true}
          />
          <GInput
            _isSecure={true}
            placeholder={'password'}
            label={strings.Password}
          />
        <View style={styles.justifyEnd}>
          <GButton
            containerStyle={localStyle.login_button}
            ss
            title={'Login'}
            color={colors[theme].white}
            textType={'b16'}
          />
        </View>
        <View style={localStyle.button_container}>
          <View style={styles.flex}>
            <GButton
              containerStyle={localStyle.google_apple_button}
              title={'Google'}
              bgColor={'white'}
              bordercolor={colors[theme].orange}
              color={colors[theme].orange}
              textType={'b16'}
              frontIcon={<Google />}
            />
          </View>
          <View style={styles.flex}>
            <GButton
              containerStyle={localStyle.google_apple_button}
              bgColor={'white'}
              title={'Apple'}
              color={colors[theme].black}
              textType={'b16'}
              bordercolor={colors[theme].black}
              frontIcon={<Apple />}
            />
          </View>
        </View>
        <View style={[styles.flexRow,styles.center]}>
          <GText color={colors[theme].inputcolor} type={'m14'} >Don’t Have Account?</GText>
          <GText color={colors[theme].green} type={'b14'} style={styles.ml15}>Sign up</GText>
        </View>
      </View>
    </GSafeAreaView>
  );
}

const getLocalStyle = theme =>
  StyleSheet.create({
    Cartgreen_bg: {
      backgroundColor: colors[theme].imagebg,
      width: moderateScale(120),
      height: moderateScale(120),
      borderRadius: moderateScale(60),
      ...styles.center,
      ...styles.selfCenter,
      ...styles.mt70,
    },
    input: {
      backgroundColor: colors[theme].inputbg,
    },
    login_button: {
      width: moderateScale(365),
      height: moderateScale(55),
      borderRadius: moderateScale(15),
      ...styles.mv25,
    },
    google_apple_button: {
      width: moderateScale(170),
      borderWidth: moderateScale(1),
      borderRadius: moderateScale(15),
      ...styles.mv25,
    },
    button_container: {
      ...styles.flexRow,
      gap: moderateScale(22),
    },
    google_bg: {
      backgroundColor: colors[theme].orange,
      width: moderateScale(30),
      height: moderateScale(30),
      borderRadius: moderateScale(15),
    },
  });
