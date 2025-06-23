//Library import
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

//Local import
import {colors, styles} from '@style';
import {moderateScale} from '@common/constants';
import GText from './GText';
import { Left_icon } from '@assets/svg';

export default function GHeader(props) {
  const {title, onPressBack, rightIcon, isHideBack, isLeftIcon} = props;
  const navigation = useNavigation();
  const theme = useSelector(state => state.theme.theme);

  const onpressgoBack = () => {
    
    navigation.goBack() 
  };
 
  
  return (
    <View style={[localStyles.container, !!isHideBack && styles.pr10]}>
      <View style={[styles.flexRow, styles.flex,styles.itemsCenter]}>
        
        {!!isLeftIcon && isLeftIcon}

        <GText
          numberOfLines={1}
          style={[styles.pr10, styles.mr10, localStyles.titleText]}
          color={colors[theme].textColor}
          type={'B18'}
          align={'center'}
          >
          {title}
        </GText>
        {!isHideBack && (
          <TouchableOpacity
            style={localStyles.backbutton}
            onPress={ onpressgoBack}>
              
              <Left_icon />
            </TouchableOpacity>
        )}
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
    ...styles.flex
  },
  backbutton:{
    position:'absolute',
    left:0,
    ...styles.center,
    ...styles.p10,
  }
});
