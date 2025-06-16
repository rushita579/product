import { StyleSheet} from 'react-native'
import React from 'react'
import { StackNav } from '../NavigationKeys'
import { StackRoute } from '../NavigationRoutes'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import typography from '../../style/typography';


const Stack = createNativeStackNavigator();


export default function Stacknavigation() {
  return (
      <Stack.Navigator screenOptions={{headerShown:false}}  initialRouteName="Onboarding">
        {/* <Stack.Screen name={StackNav.ProductForm} component={StackRoute.ProductForm}/>
        <Stack.Screen name={StackNav.ProductList} component={StackRoute.ProductList}/> */}
        <Stack.Screen name={StackNav.Onboarding} component={StackRoute.Onboarding}/>
        <Stack.Screen name={StackNav.Onboarding2} component={StackRoute.Onboarding2}/>
        <Stack.Screen name={StackNav.Onboarding3} component={StackRoute.Onboarding3}/>
        <Stack.Screen name={StackNav.Onboarding4} component={StackRoute.Onboarding4}/>
        <Stack.Screen name={StackNav.Login} component={StackRoute.Login}/>
        <Stack.Screen name={StackNav.Signup} component={StackRoute.Signup}/>
        <Stack.Screen name={StackNav.Numberverification} component={StackRoute.Numberverification}/>
        <Stack.Screen name={StackNav.Verified} component={StackRoute.Verified}/>
        
      </Stack.Navigator>
  )
}

const localStyle = StyleSheet.create({})