import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {colors, styles} from '../../style';
import { moderateScale } from '../../common/constants';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import GText from './GText';

export default function GHeader(props) {
  const {title, onPressBack, rightIcon, isHideBack, isLeftIcon} = props;
  const navigation = useNavigation();
  const theme = useSelector(state => state.theme.theme);

  const goBack = () => navigation.goBack();
   return (
    <View style={[localStyles.container, !!isHideBack && styles.pr10]}>
      <View style={[styles.rowStart, styles.flex]}>
        {!isHideBack && (
          <TouchableOpacity style={styles.pr10} onPress={onPressBack || goBack}>
          </TouchableOpacity>
        )}
        {!!isLeftIcon && isLeftIcon}

        <GText
          numberOfLines={1}
          style={[styles.pr10, styles.mr10, localStyles.titleText]}
          color={colors[theme].green}
          type={'B24'}>
          {title}
        </GText>
      </View>
      {!!rightIcon && rightIcon}
    </View>
  );
}

const localStyles = StyleSheet.create({
    container: {
    ...styles.rowSpaceBetween,
    ...styles.ph20,
    ...styles.pv15,
    ...styles.center,
  },
  titleText: {
    width: moderateScale(200),
  },
})