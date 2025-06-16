import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import GText from '../componets/common/GText';
import strings from '../i18n/strings';
import {colors} from '../style';
import {styles} from '../style';
import {useSelector} from 'react-redux';
import GSafeAreaView from '../componets/common/GSafeAreaView';
import GInput from '../componets/common/GInput';
import GButton from '../componets/common/GButton';
import Right_icon from '../assets/svg/right_icon.svg';
import {moderateScale} from '../common/constants';

export default function Signup({navigation}) {
  const theme = useSelector(state => state.theme.theme);
  const localStyle = getLocalStyle(theme);

  const Numberverification = () =>{
      navigation.navigate('Numberverification')

  }


  return (
    <GSafeAreaView>
      <View style={[styles.container, styles.justifyCenter]}>
        <GText color={colors[theme].textColor} type={'b28'} align={'left'} style={styles.mt30}>
          {strings.Welcome}
        </GText>
        <GText color={colors[theme].textColor} type={'b28'} align={'left'}>
          {strings.grocey}
        </GText>
        <View  style={localStyle.inputbg}>
          <GInput label={strings.name} placeholder={strings.name} /> 
          <GInput
            label={strings.PhoneNumber}
            placeholder={strings.PhoneNumber}
            editable={true}
          />
          <GInput
            _isSecure={true}
            placeholder={strings.Password}
            label={strings.Password}
          />
          <View style={[styles.flexRow, styles.justifyBetween, styles.mv20]}>
          <GText color={colors[theme].textColor} type={'b24'}>
            {strings.Signup}
          </GText>
          <GButton
            containerStyle={localStyle.Signup_button}
            onPress={Numberverification}
            title={<Right_icon />}
            color={colors[theme].white}
            textType={'b16'}
          />
        </View>
        <View style={[styles.flexRow, styles.center]}>
          <GText color={colors[theme].inputcolor} type={'m14'}>
            {strings.Alreday}
          </GText>
          <GText color={colors[theme].green} type={'b14'} style={styles.ml15}>
            {strings.Login}
          </GText>
        </View>
        </View>
        
      </View>
    </GSafeAreaView>
  );
}

const getLocalStyle = theme =>
  StyleSheet.create({
  Signup_button: {
    width: moderateScale(80),
    height: moderateScale(55),
    borderRadius: moderateScale(15),
    //   ...styles.mv25,
  },
  inputbg:{
        backgroundColor:colors[theme].inputback,
        ...styles.mt50,
        ...styles.p20,
        borderRadius:moderateScale(20)
  }
});
