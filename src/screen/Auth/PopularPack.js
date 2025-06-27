import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import GSafeAreaView from '@components/common/GSafeAreaView';
import GHeader from '@components/common/GHeader';
import Gproductcard from '@components/common/Gproductcart';
import strings from '@i18n/strings';
import { styles } from '@style/index';
import { fetchPacks } from '@redux/slice/packSlice';
import { StackNav } from '@navigation/NavigationKeys';

export default function PopularPack({ navigation }) {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.theme);
  const localStyle = getLocalStyle(theme);

  const packList = useSelector(state => state.packs.packList);
  const { first, last, next, pages, items, loading } = useSelector(state => state.packs);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchPacks({ page: 1, per_page: 10 }));
  }, [dispatch]);

  const onEndReached = () => {
    if (!loading && next) {
      dispatch(fetchPacks({ page: next, per_page: 10 }));
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchPacks({ page: 1, per_page: 10 }));
    setRefreshing(false);
  };

  const onPressItem = (packId) => {
    navigation.navigate(StackNav.BundleProductdetils, { packId });
  };

  return (
    <GSafeAreaView>
      <GHeader title={strings.PopularPack} />
      <View style={styles.container}>
        <FlatList
          data={packList}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <Gproductcard item={item} onPressitem={() => onPressItem(item.id)} />
          )}
          onEndReached={onEndReached}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      </View>
    </GSafeAreaView>
  );
}

const getLocalStyle = (theme) => StyleSheet.create({});
