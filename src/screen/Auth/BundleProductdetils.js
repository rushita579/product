import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import GSafeAreaView from '@components/common/GSafeAreaView';
import {useDispatch, useSelector} from 'react-redux';
import {colors, styles} from '@style/index';
import GText from '@components/common/GText';
import GHeader from '@components/common/GHeader';
import {moderateScale} from '@common/constants';
import strings from '@i18n/strings';
import GButton from '@components/common/GButton';
import {Addicon_green, Cart_by, Fillstar, Remove_icon} from '@assets/svg';
import {getSinglePack} from '@redux/slice/productSlice';
import {useRoute} from '@react-navigation/native';

export default function BundleProductdetils() {
  const theme = useSelector(state => state.theme.theme);
  const localStyle = getLocalStyle(theme);

  const dispatch = useDispatch();
  const {params} = useRoute();
  const packId = params?.packId;

  const singlePack = useSelector(state => state.packs.singlePack);

  useEffect(() => {
    if (packId) {
      dispatch(getSinglePack(packId));
    }
  }, [dispatch, packId]);

  return (
    <GSafeAreaView>
      <GHeader title={strings.BundelDetails} />
      <ScrollView>
        <View style={localStyle.bundelproduct_bg}>
          <View style={styles.container}>
            <Image
              source={{uri: singlePack?.image}}
              style={localStyle.pack_bg}
            />
            <GText type={'b24'} style={styles.mt30}>
              {singlePack?.pack_name}
            </GText>
            <View
              style={[
                styles.flexRow,
                styles.justifyBetween,
                styles.mt15,
                styles.itemsCenter,
              ]}>
              <View style={styles.flexRow}>
                <GText type={'b18'} style={styles.selfCenter}>
                  {singlePack?.selling_price}
                </GText>
                <GText
                  type={'b28'}
                  color={colors[theme].green}
                  style={styles.ml12}>
                  {singlePack?.original_price}
                </GText>
              </View>
              <View style={styles.flexRow}>
                <GButton
                  containerStyle={localStyle.Add_item}
                  bgColor={'white'}
                  title={<Remove_icon />}
                  textType={'b16'}
                  bordercolor={colors[theme].addborder}
                />
                <GText type={'m20'} style={styles.mh20}>
                  2
                </GText>
                <GButton
                  containerStyle={localStyle.Add_item}
                  bgColor={'white'}
                  title={<Addicon_green />}
                  textType={'b16'}
                  bordercolor={colors[theme].addborder}
                />
              </View>
            </View>
            <View style={[styles.flexRow, styles.justifyBetween, styles.mt25]}>
              <View>
                <GText type={'b16'} align={'center'}>
                  {singlePack?.Weight}
                </GText>
                <GText
                  type={'r14'}
                  color={colors[theme].inputcolor}
                  align={'center'}>
                  {strings.Weight}
                </GText>
              </View>
              <View>
                <GText type={'b16'} align={'center'}>
                  {singlePack?.size}
                </GText>
                <GText
                  type={'r14'}
                  color={colors[theme].inputcolor}
                  align={'center'}>
                  {strings.size}
                </GText>
              </View>
              <View>
                <GText type={'b16'} align={'center'}>
                  1
                </GText>
                <GText
                  type={'r14'}
                  color={colors[theme].inputcolor}
                  align={'center'}>
                  {strings.items}
                </GText>
              </View>
            </View>
            <View>
              <GText type={'b16'} style={styles.mt20}>
                {strings.PackDetails}
              </GText>
              {singlePack?.product_ids?.map((item, index) => (
                <View key={index} style={localStyle.pack_details}>
                  <View style={[styles.flexRow]}>
                    <Image
                      source={{uri: item.image}}
                      style={localStyle.packdetaail_image}
                    />
                    <GText type="b16" style={[styles.ml15, styles.selfCenter]}>
                      {item.name}
                    </GText>
                  </View>
                  <View>
                    <GText
                      type="r14"
                      color={colors[theme].inputcolor}
                      style={styles.mr50}>
                      {item.weight}
                    </GText>
                  </View>
                </View>
              ))}
            </View>
            <View style={localStyle.review_box}>
              <GText type={'b16'}>{strings.Review}</GText>
            </View>
            <View style={[styles.flexRow, styles.center]}>
              <GButton
                containerStyle={localStyle.Cart_by}
                bgColor={'white'}
                title={
                  <Cart_by
                    width={moderateScale(22)}
                    height={moderateScale(22)}
                  />
                }
                textType={'b16'}
                bordercolor={colors[theme].addborder}
              />
              <GButton
                containerStyle={localStyle.byenow_button}
                title={'Buy Now'}
                color={colors[theme].white}
                textType={'b16'}
              />
              
            </View>
          </View>
        </View>
      </ScrollView>
    </GSafeAreaView>
  );
}

const getLocalStyle = theme =>
  StyleSheet.create({
    pack_bg: {
      ...styles.selfCenter,
      height: moderateScale(320),
      width: moderateScale(380),
      borderRadius: moderateScale(20),
    },
    Add_item: {
      width: moderateScale(35),
      height: moderateScale(35),
      borderWidth: moderateScale(1),
      borderRadius: moderateScale(8),
    },
    bundelproduct_bg: {
      backgroundColor: colors[theme].backgroundColor,
    },
    pack_details: {
      ...styles.flexRow,
      ...styles.itemsCenter,
      ...styles.mt15,
      ...styles.justifyBetween,
    },
    packdetaail_image: {
      width: moderateScale(50),
      height: moderateScale(50),
      borderRadius: moderateScale(8),
    },
    Cart_by: {
      width: moderateScale(60),
      height: moderateScale(60),
      borderWidth: moderateScale(1),
      borderRadius: moderateScale(15),
    },
    byenow_button: {
      width: moderateScale(295),
      height: moderateScale(60),
      borderRadius: moderateScale(15),
      ...styles.m20,
    },
    review_box: {
      borderBottomColor: colors[theme].borderColor,
      borderBottomWidth: moderateScale(1),
      ...styles.pb10,
      ...styles.mt20,
    },
  });
