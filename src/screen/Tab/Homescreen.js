//Librery improt
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';


// Local imports
import strings from '@i18n/strings';
import {Down_arrow, Location, Search, Three_dots} from '@assets/svg';
import {colors, styles} from '@style/index';
import GText from '@components/common/GText';
import Gproductcard from '@components/common/Gproductcart';
import GSafeAreaView from '@components/common/GSafeAreaView';
import {moderateScale} from '@common/constants';
import {fetchProducts} from '@redux/slice/productSlice';
import {StackNav} from '@navigation/NavigationKeys';
import { fetchPacks } from '@redux/slice/packSlice';

export default function Homescreen({navigation}) {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.theme);
  const localStyle = getLocalStyle(theme);

  const productList = useSelector(state => state.products.productlist);
  const packList = useSelector(state => state.packs.packList);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
  setRefreshing(true);
   dispatch(fetchProducts());
   dispatch(fetchPacks());
  setRefreshing(false);
};

  useFocusEffect(
  useCallback(() => {
    dispatch(fetchProducts({ page: 1, per_page: 5 }));
    dispatch(fetchPacks({ page: 1, per_page: 5 }));
  }, [dispatch])
);



  const onPresspacks = () => {
    navigation.navigate(StackNav.PopularPack);
  };
  
  const onpressNewItem = () => {
    navigation.navigate(StackNav.NewItem);
  };
  
  const onpressBundleProductdetils= (packId) =>{
    navigation.navigate(StackNav.BundleProductdetils,{packId});

  }      
  const ProductDetails = (productId) =>{
    navigation.navigate(StackNav.ProductDetails,{productId});

  }      


  return (
    <GSafeAreaView style={localStyle.home_bg}>
      <ScrollView refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }>
        <View style={styles.container}>
        {/* Header */}
        <View style={localStyle.Top_header}>
          <Three_dots height={moderateScale(40)} width={moderateScale(40)} />
          <View style={styles.flexRow}>
            <Location height={moderateScale(25)} width={moderateScale(25)} />
            <View style={styles.ml10}>
              <GText type={'b14'}>{strings.CurrentLocation}</GText>
              <GText color={colors[theme].textgray} type={'m16'}>
                {strings.ChhatakSyhlet}
              </GText>
            </View>
            <View style={styles.mt5}>
              <Down_arrow
                height={moderateScale(10)}
                width={moderateScale(15)}
              />
            </View>
          </View>
          <Search height={moderateScale(40)} width={moderateScale(40)} />
        </View>

        {/* Banner */}
        <Image source={require('@assets/image/Homebg.png')} style={localStyle.home_benner}/>

        {/* Popular Pack */}
        <View>
          <View style={[styles.flexRow, styles.justifyBetween, styles.mt30]}>
            <GText type="m18">{strings.PopularPack}</GText>
            <TouchableOpacity onPress={onPresspacks}>
              <GText color={colors[theme].green} type="b14">
                {strings.ViewAll}
              </GText>
            </TouchableOpacity>
          </View>

          <FlatList
            data={packList}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => <Gproductcard item={item} onPressitem={()=>onpressBundleProductdetils(item.id)}/>}
          />
        </View>

        {/* New Items */}
        <View>
          <View
            style={[styles.flexRow, styles.justifyBetween, styles.mt30]}>
            <GText type="m18">{strings.OurNewItem}</GText>
            <TouchableOpacity onPress={onpressNewItem}>
              <GText color={colors[theme].green} type="b14">
                {strings.ViewAll}
              </GText>
            </TouchableOpacity>
          </View>
          <FlatList
            data={productList}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => <Gproductcard item={item}  onPressitem={()=>ProductDetails(item.id)}/>}
          />
        </View>
      </View>
      </ScrollView>
    </GSafeAreaView>
  );
}

const getLocalStyle = theme =>
  StyleSheet.create({
    Top_header: {
      ...styles.flexRow,
      ...styles.justifyBetween,
      ...styles.itemCenter,
      ...styles.mb33,
    },
    home_bg: {
      backgroundColor: colors[theme].backgroundColor,
    },
    home_benner:{
      ...styles.selfCenter,
      height:moderateScale(180),
      width:moderateScale(375)
    }
  });
