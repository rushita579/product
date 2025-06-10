import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import ProductList from './src/componets/Productlist';
import ProductForm from './src/componets/ProductFrom';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <Provider store={store}>
    //   <NavigationContainer>
    //     <Stack.Navigator initialRouteName="ProductList">
    //       <Stack.Screen name="ProductList" component={ProductList} />
    //       <Stack.Screen name="ProductForm" component={ProductForm} />
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </Provider>
    <></>
  );
}
