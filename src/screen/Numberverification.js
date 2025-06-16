import {StyleSheet, View} from 'react-native';
import React from 'react';
import GSafeAreaView from '../componets/common/GSafeAreaView';
import GText from '../componets/common/GText';
import Digit_code from '../assets/svg/digit_code.svg';
import {useSelector} from 'react-redux';
import {colors, styles} from '../style';
import {moderateScale} from '../common/constants';
import strings from '../i18n/strings';
import GInput from '../componets/common/GInput';
import GButton from '../componets/common/GButton';

export default function Numberverification({navigation}) {
  const theme = useSelector(state => state.theme.theme);
  const localStyle = getLocalStyle(theme);

  const Verified = () =>{
      navigation.navigate('Verified')

  }

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
