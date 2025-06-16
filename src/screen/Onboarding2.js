import {Image, StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import GText from '../componets/common/GText';
import {colors} from '../style';
import {styles} from '../style';
import GSafeAreaView from '../componets/common/GSafeAreaView';
import GButton from '../componets/common/GButton';
import Right_icon from '../assets/svg/right_icon.svg';
import { moderateScale } from '../common/constants';
import strings from '../i18n/strings';
import { useSelector } from 'react-redux';



export default function Onboarding2({navigation}) {
const theme = useSelector(state => state.theme.theme);


  const Onboarding3 = () =>{
          navigation.navigate('Onboarding3')

  }

  
    
  return (
      <GSafeAreaView>
        <View style={styles.container}>
             <Image source={require('../assets/image/Onboarding2.png')} style={[localStyle.Onboarding2_image,styles.mt70]}/>
       <GText color={colors[theme].black} type={'b24'} align={'center'} style={styles.pv15}>{strings.Browse}</GText>
       <GText color={colors[theme].textColor} type={'m16'} align={'center'} style={styles.pv15}>{strings.pariatur}</GText>
        <GButton   
        textType={'b18'}
        color={colors[theme].white}
        onPress={Onboarding3}
        containerStyle={localStyle.button}
        title={<Right_icon/>
        }
      />
        </View>
      </GSafeAreaView>
  );
}

const localStyle = StyleSheet.create({
  Onboarding2_image:{
    width:moderateScale(320),
    height:moderateScale(320),
    ...styles.selfCenter,
  },
   button:{
     width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    ...styles.m25,
    ...styles.p20,
    ...styles.center,
    ...styles.selfCenter,
  },
  
});
