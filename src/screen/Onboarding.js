import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GText from '../componets/common/GText'
import { colors } from '../style'
import { styles } from '../style'
import { typography } from '../style/typography'

export default function Onboarding() {
  console.log('hello',colors.dark.orange)
  // console.log(typography.f16,'font')
  return (
    <View>
      <GText color={colors.dark.orange}
      style={[styles.m25]}>hello</GText>
    </View>
  )
}

const localstyles = StyleSheet.create({})