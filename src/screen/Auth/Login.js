//Library import
import {StyleSheet, View, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import React, {useState} from 'react';
import Toast from 'react-native-toast-message';

//local import
import {colors, styles} from '@style';
import {moderateScale} from '@common/constants';
import {Cartgreen, Apple_icon, Google_icon} from '@assets/svg';
import GSafeAreaView from '@components/common/GSafeAreaView';
import {StackNav} from '@navigation/NavigationKeys';
import {setAsyncStorageData} from '@utils/helpers';
import strings from '@i18n/strings';
import GText from '@components/common/GText';
import GInput from '@components/common/GInput';
import GButton from '@components/common/GButton';
import {loginuser} from '@redux/slice/userSlice';

export default function Login({navigation}) {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.theme);
  const localStyle = getLocalStyle(theme);

  const [PhoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const BASE_URL = `http://192.168.1.40:3001/users?mobile_number=${PhoneNumber}&password=${password}`;

  const Signup = () => {
    navigation.navigate(StackNav.Signup);
  };

  const handleLogin = async () => {
    if (!PhoneNumber || !password) {
      Toast.show({
        type: 'error',
        text1: 'please enter valide phonenumber and password',
      });
    }

    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();

      const user = data.find(
        user =>
          user.mobile_number === PhoneNumber && user.password === password,
      );

      if (user) {
        await setAsyncStorageData('userCredentials', user);
        dispatch(loginuser(user));
        navigation.replace(StackNav.Dashboard);
        Toast.show({
          type: 'success',
          text1: 'login success',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Incorrect phone number or password',
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong, please try again later',
      });
    }
  };

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
          placeholder={'PhoneNumber'}
          editable={true}
          value={PhoneNumber}
          onChangeText={setPhoneNumber}
        />
        <GInput
          _isSecure={true}
          placeholder={'Password'}
          label={strings.Password}
          value={password}
          onChangeText={setPassword}
        />
        <View style={styles.justifyEnd}>
          <GButton
            containerStyle={localStyle.login_button}
            onPress={handleLogin}
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
              frontIcon={<Google_icon />}
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
              frontIcon={<Apple_icon />}
            />
          </View>
        </View>
        <View style={[styles.flexRow, styles.center, styles.mt30]}>
          <GText color={colors[theme].inputcolor} type={'m14'}>
            {strings.Account}
          </GText>
          {/* <GText color={colors[theme].green} type={'b14'} style={styles.ml15}>
            {strings.Signup}
          </GText> */}
          <GButton
            title={strings.Signup}
            bgColor={'white'}
            color={colors[theme].green}
            textType={'b16'}
            onPress={Signup}
          />
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
      ...styles.mt25,
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
