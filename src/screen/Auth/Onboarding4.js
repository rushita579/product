//Library import
import {Image, StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

//Local import
import { moderateScale } from '@common/constants';
import GText from '@components/common/GText';
import {colors} from '@style';
import {styles} from '@style';
import GSafeAreaView from '@components/common/GSafeAreaView';
import GButton from '@components/common/GButton';
import { StackNav } from '@navigation/NavigationKeys';
import {Right_icon} from '@assets/svg';





export default function Onboarding4({navigation}) {
const theme = useSelector(state => state.theme.theme);

  
const Login = async () => {
  
  navigation.replace(StackNav.Login);
};

  useEffect(() =>{

  },[])
  return (
    <>
      <GSafeAreaView>
        <View style={styles.container}>
        <Image source={require('@assets/image/Onboarding4.png')} style={[localStyle.Onboarding2_image,styles.mt70]}/>
       <GText color={colors[theme].black} type={'b24'} align={'center'} style={styles.pv15}>{strings.Delivery}</GText>
       <GText color={colors[theme].textColor} type={'m16'} align={'center'} style={styles.pv15}>{strings.pariatur}</GText>
      <GButton   
        textType={'b18'}
        containerStyle={localStyle.button}
        onPress={Login}
        title={<Right_icon/>
        }
      />
        </View>
      </GSafeAreaView>
    </>
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
