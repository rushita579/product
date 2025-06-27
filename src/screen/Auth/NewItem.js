//Librery import
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

// Local imports
import GSafeAreaView from '@components/common/GSafeAreaView';
import GHeader from '@components/common/GHeader';
import Gproductcard from '@components/common/Gproductcart';
import strings from '@i18n/strings';
import {styles} from '@style/index';
import {fetchProducts} from '@redux/slice/productSlice';
import {StackNav} from '@navigation/NavigationKeys';

export default function NewItem({navigation}) {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.theme);
  const localStyle = getLocalStyle(theme);

  const productlist = useSelector(state => state.products.productlist);
  const { loading} = useSelector(
    state => state.products,
  );
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts({page: 1, per_page: 10}));
  }, [dispatch]);

  const ProductDetails = productId => {
    navigation.navigate(StackNav.ProductDetails, {productId});
  };

  const onEndReached = () => {
    if (!loading && next) {
      dispatch(fetchProducts({page: next, per_page: 10}));
    }
  };
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchProducts({page: 1, per_page: 10}));
    setRefreshing(false);
  };
  return (
    <GSafeAreaView>
      <GHeader title={strings.NewItem} />
      <View style={styles.container}>
        <FlatList
          data={productlist}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20}}
          renderItem={({item}) => (
            <Gproductcard
              item={item}
              onPressitem={() => ProductDetails(item.id)}
            />
          )}
          onEndReached={onEndReached}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      </View>
    </GSafeAreaView>
  );
}

const getLocalStyle = theme => StyleSheet.create({});
