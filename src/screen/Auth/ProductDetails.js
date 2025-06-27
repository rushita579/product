//Librery import
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';

//Local import
import GSafeAreaView from '@components/common/GSafeAreaView';
import {addToCart, decreaseQuantity, getSingleProduct,} from '@redux/slice/productSlice';
import {colors} from '@style/Color';
import {styles} from '@style/index';
import GText from '@components/common/GText';
import {moderateScale} from '@common/constants';
import GHeader from '@components/common/GHeader';
import strings from '@i18n/strings';
import {
  Addicon_green,
  Blankstar,
  Cart_by,
  Fillstar,
  Remove_icon,
} from '@assets/svg';
import GButton from '@components/common/GButton';
import { StackNav } from '@navigation/NavigationKeys';

export default function ProductDetails({navigation}) {
  const theme = useSelector(state => state.theme.theme);
  const localStyle = getLocalStyle(theme);
  const dispatch = useDispatch();

  const {params} = useRoute();
  const productId = params?.productId;

  const singleproduct = useSelector(state => state.products.singleproduct);
  const [refreshing, setRefreshing] = useState(false);

  const cartItems = useSelector(state => state.products.cartItems);
const productInCart = cartItems.find(item => item.id === singleproduct?.id);
const quantity = productInCart?.quantity || 0;



  const onRefresh = () => {

    setRefreshing(true);
    dispatch(getSingleProduct(productId));
    setRefreshing(false);
  };

  useEffect(() => {
    if (productId) {
      dispatch(getSingleProduct(productId));
    }
  }, [dispatch, productId]);

   const onpressProductcart = () => {
            navigation.navigate(StackNav.Productcart);
        
    }

    
  
  return (
    <GSafeAreaView>
      <GHeader title={strings.ProductDetails} />

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={localStyle.bundelproduct_bg}>
          <View style={styles.container}>
            <Image
              source={{uri: singleproduct?.image}}
              style={localStyle.pack_bg}
            />
            <View>
              <GText type={'b24'} style={styles.mt30}>
                {singleproduct?.product_name}
              </GText>
            </View>
            <View>
              <GText type={'r16'} style={styles.mt15}>
                {strings.Weight}:{singleproduct?.weight}
              </GText>
            </View>
            <View
              style={[
                styles.flexRow,
                styles.justifyBetween,
                styles.mt15,
                styles.itemsCenter,
              ]}>
              <View style={styles.flexRow}>
                <GText type={'b18'} style={styles.selfCenter}>
                  {singleproduct?.selling_price}
                </GText>
                <GText
                  type={'b28'}
                  color={colors[theme].green}
                  style={styles.ml12}>
                  {singleproduct?.original_price}
                </GText>
              </View>
              <View style={styles.flexRow}>
                <GButton
                  containerStyle={localStyle.Add_item}
                  bgColor={'white'}
                  title={<Remove_icon />}
                  textType={'b16'}
                  bordercolor={colors[theme].addborder}
                   onPress={() => dispatch(decreaseQuantity(singleproduct.id))}
                   
                />
                <GText type={'m20'} style={styles.mh20}>
                  {quantity}
                </GText>
                <GButton
                  containerStyle={localStyle.Add_item}
                  bgColor={'white'}
                  title={<Addicon_green />}
                  textType={'b16'}
                  bordercolor={colors[theme].addborder}
                  onPress={() => dispatch(addToCart(singleproduct))}
                />
              </View>
            </View>
            <View>
              <GText type={'b16'} style={styles.mt20}>
                {strings.ProductDetails}
              </GText>
            </View>
            <View>
              <GText
                type={'r16'}
                style={styles.mt8}
                color={colors[theme].inputcolor}>
                {singleproduct?.description}
              </GText>
            </View>
            <View style={localStyle.review_box}>
              <GText type={'b16'}>{strings.Review}</GText>
              <View style={styles.flexRow}>
                {[...Array(5)].map((v, i) => {
                  const rating = Math.round(singleproduct?.review_star ?? 0);
                  return i < rating ? (
                    <Fillstar
                      key={i}
                      width={moderateScale(14)}
                      height={moderateScale(14)}
                      style={styles.ml5}
                    />
                  ) : (
                    <Blankstar
                      key={i}
                      width={moderateScale(14)}
                      height={moderateScale(14)}
                      style={styles.ml5}
                    />
                  );
                })}
              </View>
            </View>
          </View>
          <View style={[styles.flexRow, styles.center, styles.mt30]}>
            <GButton
              containerStyle={localStyle.Cart_by}
              bgColor={'white'}
              title={
                <Cart_by width={moderateScale(22)} height={moderateScale(22)} />
              }
              textType={'b16'}
              bordercolor={colors[theme].addborder}
              onPress={onpressProductcart}
            />
            <GButton
              containerStyle={localStyle.byenow_button}
              title={'Buy Now'}
              color={colors[theme].white}
              textType={'b16'}
            />
          </View>
        </View>
      </ScrollView>
    </GSafeAreaView>
  );
}

const getLocalStyle = theme =>
  StyleSheet.create({
    bundelproduct_bg: {
      backgroundColor: colors[theme].backgroundColor,
    },
    pack_bg: {
      ...styles.selfCenter,
      ...styles.mt25,
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
    review_box: {
      borderBottomColor: colors[theme].borderColor,
      borderTopColor: colors[theme].borderColor,
      borderBottomWidth: moderateScale(1),
      borderTopWidth: moderateScale(1),
      ...styles.pv10,
      ...styles.mt20,
      ...styles.flexRow,
      ...styles.justifyBetween,
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
  });
