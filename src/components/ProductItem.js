// Src/components/ProductItem.js
import React from 'react';
import {View, Text, Switch, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {toggleStock, deleteProduct} from '@redux/slice/productSlice';
import axios from 'axios';

const BASE_URL = 'http://192.168.1.40:3001/products';

export default function ProductItem({product,navigation}) {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/${product.id}`);
      dispatch(deleteProduct(product.id));
    } catch (err) {
      alert('Failed to delete');
    }
  };

  const handleToggle = async () => {
    const updatedProduct = {...product, inStock: !product.inStock};
    try {
      await axios.put(`${BASE_URL}/${product.id}`, updatedProduct);
      dispatch(toggleStock(product.id));
    } catch (err) {
      alert('Failed to update stock status');
    }
  };

  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.title}>{product.title}</Text>
        <Text>Price: ${product.price}</Text>
        <Text>Category: {product.category}</Text>
      </View>
      <View>
        <Switch value={product.inStock} onValueChange={handleToggle} />
        <TouchableOpacity onPress={handleDelete}>
          <Text style={{color: 'red'}}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProductForm', {product})}>
          <Text style={{color: 'blue'}}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {fontWeight: 'bold', fontSize: 16},
});
