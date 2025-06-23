//Library import
import {useSelector} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';

//local import
import {colors, styles} from '@style';
import {StackNav} from '@navigation/NavigationKeys';
import GText from '@components/common/GText';
import {Cartwhite} from '@assets/svg';
import {getAsyncStorageData, setAsyncStorageData} from '@utils/helpers';
import {moderateScale} from '@common/constants';

export default function Onboarding({navigation}) {
  const theme = useSelector(state => state.theme.theme);
  const localStyle = getLocalStyle(theme);
  const state = useSelector(state => state.user);

  useEffect(() => {
    const checkFirstTime = async () => {
      const isFirstTime = await getAsyncStorageData('issecondtime');
      const userCredentials = await getAsyncStorageData('userCredentials');

      setTimeout(() => {
        if (isFirstTime) {
          if (userCredentials) {
            navigation.replace(StackNav.Dashboard);
          } else {
            navigation.replace(StackNav.Login);
          }
        } else {
          setAsyncStorageData('issecondtime', true);
          navigation.replace(StackNav.Onboarding2);
        }
      }, 2000);
    };

    checkFirstTime();
  }, []);

  return (
    <>
      <View style={localStyle.Onboarding}>
        <View style={styles.m15}>
          <Cartwhite width={moderateScale(75)} height={moderateScale(65)} />
        </View>
        <View>
          <GText color={colors[theme].white} type={'b40'}>
            eGrocery
          </GText>
          <GText color={colors[theme].white} type={'m20'}>
            your daily needs
          </GText>
        </View>
      </View>
    </>
  );
}

const getLocalStyle = theme =>
  StyleSheet.create({
    Onboarding: {
      backgroundColor: colors[theme].green,
      ...styles.flex,
      ...styles.center,
      ...styles.flexRow,
    },
    button: {
      width: '45%',
      ...styles.m25,
      ...styles.p20,
      ...styles.center,
    },
  });
