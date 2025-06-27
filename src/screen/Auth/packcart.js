import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GSafeAreaView from '@components/common/GSafeAreaView'
import GHeader from '@components/common/GHeader'
import Gcartitem from '@components/common/Gcartitem'
import { useSelector } from 'react-redux'
export default function packcart() {

  const cartItems = useSelector(state => state.packs?.cartItems);

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
  )
}

const styles = StyleSheet.create({})