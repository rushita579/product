// import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import GSafeAreaView from '@components/common/GSafeAreaView';
import GInput from '@components/common/GInput';
import strings from '@i18n/strings';
import {colors} from '@style/Color';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from '@style/index';
import GButton from '@components/common/GButton';
import {moderateScale} from '@common/constants';
import {updateuser} from '@redux/slice/userSlice';
import GHeader from '@components/common/GHeader';
import Toast from 'react-native-toast-message';

export default function ProfileDetail() {
  const dispatch = useDispatch();

  const theme = useSelector(state => state.theme.theme);
  const user = useSelector(state => state.user.user);
  const localStyle = getLocalStyle(theme);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');

  const onpressSave = async () => {
    console.log(user, 'user');
    console.log(user.id, 'user id');

    if (!user?.id) {
      console.error('User ID is missing. Cannot update.');
      return;
    }

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !phoneNumber.trim() ||
      !gender.trim() ||
      !birthday.trim() ||
      !password.trim()
    ) {
      Toast.show({
        type: 'error',
        text1: 'Please fill all required fields',
      });
    }

    const updatedUser = {
      id: user.id,
      name: firstName,
      lastName,
      mobile_number: phoneNumber,
      gender,
      birthday,
      password,
    };

    try {
      await axios.put(`http://192.168.1.40:3001/users/${user.id}`, updatedUser);
      await setAsyncStorageData('userCredentials', updatedUser);
      dispatch(updateuser(updatedUser));
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  useEffect(() => {
    if (!user?.id) {
      console.error('User ID is missing. Cannot update.');
      return;
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`http://192.168.1.40:3001/users/${user.id}`);
      const data = res.data;
      setFirstName(data.name || '');
      setLastName(data.lastName || '');
      setPhoneNumber(data.mobile_number || '');
      setGender(data.gender || '');
      setBirthday(data.birthday || '');
      setPassword(data.password || '');
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  };

  return (
    <GSafeAreaView>
      <GHeader title={'Profile'} />
      <View style={styles.container}>
        <GInput
          label={strings.FristName}
          placeholder={'FristName'}
          editable={true}
          inputContainerStyle={localStyle.profile_input}
          value={firstName}
          onChangeText={setFirstName}
        />
        <GInput
          placeholder={'LastName'}
          label={strings.LastName}
          inputContainerStyle={localStyle.profile_input}
          value={lastName}
          onChangeText={setLastName}
        />
        <GInput
          placeholder={'PhoneNumber'}
          label={strings.PhoneNumber}
          inputContainerStyle={localStyle.profile_input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <GInput
          placeholder={'Gender'}
          label={strings.Gender}
          inputContainerStyle={localStyle.profile_input}
          value={gender}
          onChangeText={setGender}
        />
        <GInput
          placeholder={'Birthday'}
          label={strings.Birthday}
          inputContainerStyle={localStyle.profile_input}
          value={birthday}
          onChangeText={setBirthday}
        />
        <GInput
          _isSecure={true}
          placeholder={'Password'}
          label={strings.Password}
          inputContainerStyle={localStyle.profile_input}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View>
        <GButton
          containerStyle={localStyle.save_button}
          title={'Save'}
          color={colors[theme].white}
          textType={'b16'}
          onPress={onpressSave}
        />
      </View>
    </GSafeAreaView>
  );
}

const getLocalStyle = theme =>
  StyleSheet.create({
    profile_input: {
      backgroundColor: colors[theme].white,
      borderColor: colors[theme].borderColor,
      borderWidth: 1,
    },
    save_button: {
      ...styles.mv25,
      ...styles.selfCenter,
      width: moderateScale(365),
      height: moderateScale(55),
      borderRadius: moderateScale(15),
    },
  });
