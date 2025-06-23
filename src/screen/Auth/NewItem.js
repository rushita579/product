import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GSafeAreaView from '@components/common/GSafeAreaView'
import { useSelector } from 'react-redux';
import GHeader from '@components/common/GHeader';
import { styles } from '@style/index';

export default function NewItem() {

   const theme = useSelector(state => state.theme.theme);
  const localStyle = getLocalStyle(theme);

  const productlist = useSelector(state => state.packs.productlist);

  return (
     <GSafeAreaView>
          <GHeader title={strings.NewItem}/>
         <View style={styles.container}>
           <FlatList
            data={productlist}
            keyExtractor={item => item.id}    
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => <Gproductcard item={item}/>}
          />
         </View>
        </GSafeAreaView>
  )
}

const getLocalStyle = theme => StyleSheet.create({});
