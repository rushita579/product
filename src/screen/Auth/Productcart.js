import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import GSafeAreaView from '@components/common/GSafeAreaView';
import Gcartitem from '@components/common/Gcartitem';
import GHeader from '@components/common/GHeader';
import strings from '@i18n/strings';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchProducts,
} from '@redux/slice/productSlice';

export default function Productcart() {
  const cartItems = useSelector(state => state.products.cartItems);

  return (
    <GSafeAreaView>
      <View>
        <GHeader title={strings.BundleDetailsPage} />
        <View style={styles.container}>
          <FlatList
            data={cartItems}
            keyExtractor={(item, index) =>
              item?.id ? item.id.toString() : index.toString()
            }
            renderItem={({item}) => (
              <Gcartitem 
                item={item}
              />
            )}
          />
        </View>
      </View>
    </GSafeAreaView>
  );   
}

const styles = StyleSheet.create({});
