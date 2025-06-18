//Library import

import {Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
//Library import
import Righticon_green from '@assets/svg';
import GText from '@components/common/GText';

import {colors, styles} from '@style';
import strings from '@i18n/strings';
import GButton from '@components/common/GButton';
import { moderateScale } from '@common/constants';
import { StackNav } from '@navigation/NavigationKeys';


export default function Verificatonmodal({modalVisible, setModalVisible}) {
  const theme = useSelector(state => state.theme.theme);
  const navigation= useNavigation();
  const localStyle = getLocalStyle(theme);
  console.log(setModalVisible);
  console.log(modalVisible);
    const onpressloginagain = () =>{
        setModalVisible(false)
        navigation.replace(StackNav.Login)
    }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={localStyle.container}>
            <View style={localStyle.verified_bg}>
          <View style={localStyle.righticon}>
            <Righticon_green width={60} height={45} />
          </View>
          <GText color={colors[theme].textColor} type={'b24'}>
            {strings.Verified}
          </GText>
          <GText
            color={colors[theme].inputcolor}
            type={'m16'}
            style={styles.m30}
            align={'center'}>
            {strings.successfullyverified}
          </GText>
          <View style={styles.justifyEnd}>
            <GButton
              containerStyle={localStyle.verified_button}
              title={'Login Again'}
              onPress={onpressloginagain}
              color={colors[theme].white}
              textType={'b16'}
            />
          </View>
        </View>
        </View>
    </Modal>
  );
}

const getLocalStyle = theme =>
  StyleSheet.create({
    container:{
        ...styles.flex,
        backgroundColor:'#00000040',
        ...styles.justifyCenter,
        ...styles.ph15,
        
    },
    righticon: {
      backgroundColor: colors[theme].imagebg,
      width: moderateScale(160),
      height: moderateScale(160),
      borderRadius: moderateScale(80),
      ...styles.center,
      ...styles.selfCenter,
      ...styles.mv20,
    },
    verified_bg: {
      backgroundColor: colors[theme].inputback,
      ...styles.center,
      ...styles.mv50,
      ...styles.pv50,
      borderRadius: moderateScale(40),
    },
    verified_button: {
      width: moderateScale(335),
      height: moderateScale(55),
      borderRadius: moderateScale(15),
      ...styles.mv25,
    },
  });
