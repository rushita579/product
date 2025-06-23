import {Button, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import GText from './GText';
import {colors, styles} from '@style/index';
import GButton from './GButton';
import { moderateScale, screenWidth } from '@common/constants';
import { Add_icon } from '@assets/svg';

export default function Gproductcart({
 item,
 onPressitem,
}) 
{
  const theme = useSelector(state => state.theme.theme);
  const localStyle = getLocalStyle(theme);
  return (
    <TouchableOpacity style={localStyle.items} onPress={onPressitem}>
      <Image source={{uri: item.image}} style={localStyle.items_image}  resizeMode='cover'/>
      <GText type={'m16'} style={styles.mt10}>
        {item.pack_name}
        {item.product_name}
      </GText>
      <GText type={'m14'} style={styles.mt10} color={colors[theme].inputcolor}>
        {item.short_description}
        {item.weight}
        {item.pack_Weight}
      </GText>
      <View style={[styles.flexRow,styles.justifyBetween]}>
        <View style={styles.flexRow}>
          <GText type={'b16'} style={styles.mt10}>
            {item.selling_price}
          </GText>
          <GText type={'r12'} style={styles.m10} color={colors[theme].inputcolor}>
            {item.original_price}
          </GText>
        </View>
        <TouchableOpacity>
          <GButton containerStyle={localStyle.Add_products_button}
          title={<Add_icon/>}/>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const getLocalStyle = theme => StyleSheet.create({
  Add_products_button:{
    width:moderateScale(30),
    height:moderateScale(30),
  },
  items:{
    borderColor:colors[theme].borderColor,
    borderWidth:moderateScale(2),
    borderRadius:moderateScale(20),
    width:(screenWidth-moderateScale(46))/2,
    height:moderateScale(220),
    ...styles.mr15,
    ...styles.p12,
    ...styles.mt15,
  },
  items_image:{
    width:moderateScale(85),
    height:moderateScale(90),
    ...styles.selfCenter,
    borderRadius:moderateScale(10)
  }
});

export {Gproductcart};
