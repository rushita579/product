import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';
import axios from 'axios';
import ProductItem from './ProductItem';
import GSafeAreaView from './common/GSafeAreaView';

const BASE_URL = 'http://192.168.1.40:3001/products';
const PER_PAGE = 10;

export default function ProductList({ navigation }) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);


 const fetchProducts = async (pageNum = 1, refresh = false) => {
  if (refresh) setRefreshing(true);
  else setLoadingMore(true);

  try {
    const res = await axios.get(`${BASE_URL}?_page=${pageNum}&_per_page=${PER_PAGE}`);
    
  const newData = res.data.data; 
    const lastPage = res.data.last; 

    if (refresh) {
      setProducts(newData);
    } else {
      setProducts(prev => [...prev, ...newData]);
    }

    setHasMore(pageNum < lastPage);

  } catch (err) {
    console.error('Error fetching products:', err);
  } finally {
    setRefreshing(false);
    setLoadingMore(false);
  }
};

  useEffect(() => {
    fetchProducts(1, true); 
  }, []);

  const handleRefresh = () => {
    setHasMore(true);
    setPage(1);
    fetchProducts(1, true);
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProducts(nextPage);
      
    }
  };
  return (
   <GSafeAreaView>
     <View style={styles.container}>
      <Button title="Add Product" onPress={() => navigation.navigate('ProductForm')} />
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ProductItem product={item} navigation={navigation}
          />
         
        )}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? <ActivityIndicator size="small" color="#000" /> : null
        }
        ListEmptyComponent={
          !loadingMore && !refreshing ? (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>
              No products found.
            </Text>
          ) : null
        }
      />
    </View>
   </GSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
