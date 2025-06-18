import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addProduct, updateProduct } from '../redux/slice/productSlice';
import { Dropdown } from 'react-native-element-dropdown';
import GSafeAreaView from './common/GSafeAreaView';
// import Addicon from '../s';

const BASE_URL = 'http://192.168.1.40:3001/products';
const CATEGORY_URL = 'http://192.168.1.40:3001/catagory'; 

export default function ProductForm({ route, navigation }) {
  const dispatch = useDispatch();
  const product = route.params?.product;
  const isEdit = !!product;

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState();
  const [inStock, setInStock] = useState(true);
  const [categoryOptions, setCategoryOptions] = useState([]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(CATEGORY_URL);
        const formatted = response.data.map(cat => ({
          label: cat.name,
          value: cat.name,
        }));
        setCategoryOptions(formatted);
      } catch (error) {
        console.error('Error fetching categories:', error);
        alert('Failed to load categories');
      }
    };

    fetchCategories();
  }, []);

  // Fill form if editing
  useEffect(() => {
    if (isEdit) {
      setTitle(product.title);
      setPrice(String(product.price));
      setCategory(product.category);
      setInStock(product.inStock);
    }
  }, [isEdit]);

  const handleSubmit = async () => {
    const data = { title, price: Number(price), category, inStock };

    try {
      if (isEdit) {
        const res = await axios.put(`${BASE_URL}/${product.id}`, data);
        dispatch(updateProduct(res.data));
      } else {
        const res = await axios.post(BASE_URL, data);
        dispatch(addProduct(res.data));
      }
      navigation.goBack(); 
    } catch (err) {
      console.error('Error saving product:', err);
      alert('Failed to save product');
    }
  };

  return (
   <GSafeAreaView>
     <View style={styles.container}>
      <TextInput
        placeholder="Product Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />

      <Dropdown
        data={categoryOptions}
        labelField="label"
        valueField="value"
        placeholder="Select Category"
        value={category}
        onChange={item => setCategory(item.value)}
        style={styles.dropdown}
      />

      <View style={styles.switchRow}>
        <Text>In Stock?</Text>
        <Switch value={inStock} onValueChange={setInStock} />
      </View>

      <TouchableOpacity title={isEdit ? 'Update Product' : 'Add Product'} onPress={handleSubmit} style={styles.add}>
        <Text>Add</Text>
      </TouchableOpacity>
    </View>
   </GSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  dropdown: {
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  add:{
    backgroundColor:'#84c9e0',
    width:'100',
    height:'50',
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center'
  }
});
