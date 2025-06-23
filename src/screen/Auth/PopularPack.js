import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import GSafeAreaView from '@components/common/GSafeAreaView';
import {useSelector} from 'react-redux';
import Gproductcard from '@components/common/Gproductcard';
import { styles } from '@style/index';
import GHeader from '@components/common/GHeader';
import strings from '@i18n/strings';
import { StackNav } from '@navigation/NavigationKeys';

export default function PopularPack({navigation}) {
  const theme = useSelector(state => state.theme.theme);
  const localStyle = getLocalStyle(theme);

   const packList = useSelector(state => state.packs.packList);

    const onpressBundleProductdetils= () =>{
       navigation.navigate(StackNav.BundleProductdetils);
   
     }
 

  return (
    <GSafeAreaView>
      <GHeader title={strings.PopularPack}/>
     <View style={styles.container}>
       <FlatList
        data={packList}
        keyExtractor={item => item.id}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <Gproductcard item={item} onPressitem={onpressBundleProductdetils}/>}
      />
     </View>
    </GSafeAreaView>
  );
}

const getLocalStyle = theme => StyleSheet.create({});
