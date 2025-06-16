import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import GSafeAreaView from '../componets/common/GSafeAreaView';
import GText from '../componets/common/GText';
import {colors, styles} from '../style';
import {useSelector} from 'react-redux';
import strings from '../i18n/strings';
import Righticon_green from '../assets/svg/righticon_green.svg';
import {moderateScale} from '../common/constants';
import GButton from '../componets/common/GButton';

export default function Verified() {
  const theme = useSelector(state => state.theme.theme);
  const localStyle = getLocalStyle(theme);

  return (
    <GSafeAreaView>
      <View style={styles.container}>
        <View style={localStyle.verified_bg}>
        <View style={localStyle.righticon}>
          <Righticon_green width={60} height={45} />
        </View>
        <GText color={colors[theme].textColor} type={'b24'}>
          {strings.Verified}
        </GText>
        <GText color={colors[theme].inputcolor} type={'m16'} style={styles.m30} align={'center'}>
          {strings.successfullyverified}
        </GText>
        <View style={styles.justifyEnd}>
                    <GButton
                      containerStyle={localStyle.verified_button}
                      title={'Browse Home'}
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
    righticon: {
      backgroundColor: colors[theme].imagebg,
      width: moderateScale(160),
      height: moderateScale(160),
      borderRadius: moderateScale(80),
      ...styles.center,
      ...styles.selfCenter,
      ...styles.mv20,
    },
    verified_bg:{
        backgroundColor: colors[theme].inputback,
      ...styles.center,
      ...styles.mv50,
      ...styles.pv50,
      borderRadius: moderateScale(40),
    },
    verified_button:{
        width: moderateScale(335),
      height: moderateScale(55),
      borderRadius: moderateScale(15),
      ...styles.mv25,
    },
  });
