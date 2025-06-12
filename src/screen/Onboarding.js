import {StyleSheet, View} from 'react-native';
import React, { useEffect } from 'react';
import GText from '../componets/common/GText';
import {colors} from '../style';
import {styles} from '../style';
import Cardwhite from '../assets/svg/cartwhite.svg';
import { useSelector } from 'react-redux';



export default function Onboarding({navigation}) {

const theme = useSelector(state => state.theme.theme);
const localStyle = getLocalStyle(theme);



  useEffect (()=>{
  setTimeout(() => {
      navigation.navigate('Onboarding2')
  }, 2000);
},[])


  return (
   <>
       
      <View style={localStyle.Onboarding}>
        <View style={styles.m15}><Cardwhite width={75} height={65}/></View>
        <View>
          <GText color={colors[theme].white} type={'b40'} >
          eGrocery
        </GText>
        <GText color={colors[theme].white} type={'m20'}>your daily needs</GText>
        </View>
      </View>
      
   </>
  );
};

const getLocalStyle = (theme) => StyleSheet.create({
  Onboarding: {
    backgroundColor: colors[theme].green,
    ...styles.flex,
    ...styles.center,
    ...styles.flexRow,

  },
  button:{
    width: '45%',
    ...styles.m25,
    ...styles.p20,
    ...styles.center,
  }
});
