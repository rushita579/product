//Librery import
import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

//Local import
import GText from './GText';
import {colors, styles} from '@style/index';
import {moderateScale} from '@common/constants';

export default function Gcartitem({item}) {
  const theme = useSelector(state => state.theme.theme);
  const localStyle = getLocalStyle(theme);
  console.log(item?.pack_name,'item')
  return (
   <View>
     <View style={localStyle.cart_item}>
      <View style={[styles.flexRow,styles.itemsCenter]}>
        <Image
          source={{uri: item?.image}}
          style={localStyle.items_image}
          resizeMode="cover"
        />
        <GText type={'m16'} style={styles.ml20} width={moderateScale(120)}>
          {item?.pack_name}
        </GText>
      </View>
      <View>
        <GText type={'m16'} >
          {item?.Weight}
        </GText>
      </View>
      <View>
        <GText type={'m16'} >
          {item?.original_price}
        </GText>
      </View>
    </View>
    {/* <View style={localStyle.cart_item}>
      <View style={[styles.flexRow,styles.itemsCenter]}>
        <Image
          source={{uri: item?.image}}
          style={localStyle.items_image}
          resizeMode="cover"
        />
        <GText type={'m16'} style={styles.ml20} width={moderateScale(120)}>
          {item?.pack_name}
        </GText>
      </View>
      <View>
        <GText type={'m16'} >
          {item?.Weight}
        </GText>
      </View>
      <View>
        <GText type={'m16'} >
          {item?.original_price}
        </GText>
      </View>
    </View> */}
   </View>
    
  );
}


const getLocalStyle = theme =>
  StyleSheet.create({
    items_image: {
      width: moderateScale(80),
      height: moderateScale(70),
      borderRadius: moderateScale(10),
    },
    cart_item:{
        ...styles.flexRow,
        ...styles.justifyBetween,
        ...styles.itemsCenter,
        ...styles.pv20,  
        borderBottomColor:colors[theme].borderColor,
        borderBottomWidth:moderateScale(1),  
        ...styles.container
    }
  });
export {Gcartitem};
