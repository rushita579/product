//Library import

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';

//Local import
import GText from './GText';
import {colors, styles} from '@style';
import { moderateScale } from '@common/constants';



export default function GButton({
  title,
  textType,
  color,
  onPress,
  containerStyle,
  style,
  icon = null,
  frontIcon = null,
  children,
  bgColor = null,
  bordercolor= null,
  ...props
}) {
  const theme = useSelector(state => state.theme.theme);
  return (
    <TouchableOpacity
      style={[
        localStyle.btnContainer,
        styles.rowCenter,
        containerStyle,
        bgColor
          ? {backgroundColor: bgColor}
          : {backgroundColor: colors[theme].green},
         bordercolor
        ? {borderColor: bordercolor}
        : null , 
      ]}
      onPress={onPress}
      {...props}>
      {/* If Icon Added In Button Front Side */}
      {frontIcon}
      {/* Text In Button */}
      <GText type={textType} style={[style ,  frontIcon && styles.ml10]} color={color} >
        {title}
      </GText>
      {/* If Icon Added In Button Back Side */}
      {icon}
      {children}
    </TouchableOpacity>
  );
}

const localStyle = StyleSheet.create({
   btnContainer: {
    height: moderateScale(50),
    borderRadius: moderateScale(25),
  },
})