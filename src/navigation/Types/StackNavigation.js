//Library import
import { StyleSheet} from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Local import
import { StackRoute } from '../NavigationRoutes'
import { StackNav } from '../NavigationKeys'

const Stack = createNativeStackNavigator();


export default function Stacknavigation() {
  return (
      <Stack.Navigator screenOptions={{headerShown:false}}  initialRouteName="Onboarding">
        
        <Stack.Screen name={StackNav.Onboarding} component={StackRoute.Onboarding}/>
        <Stack.Screen name={StackNav.Onboarding2} component={StackRoute.Onboarding2}/>
        <Stack.Screen name={StackNav.Onboarding3} component={StackRoute.Onboarding3}/>
        <Stack.Screen name={StackNav.Onboarding4} component={StackRoute.Onboarding4}/>
        <Stack.Screen name={StackNav.Login} component={StackRoute.Login}/>
        <Stack.Screen name={StackNav.Signup} component={StackRoute.Signup}/>
        <Stack.Screen name={StackNav.Numberverification} component={StackRoute.Numberverification}/>
        <Stack.Screen name={StackNav.Dashboard} component={StackRoute.Dashboard}/>
        <Stack.Screen name={StackNav.ProfileDetail} component={StackRoute.ProfileDetail}/>
        <Stack.Screen name={StackNav.PopularPack} component={StackRoute.PopularPack}/>
        <Stack.Screen name={StackNav.NewItem} component={StackRoute.NewItem}/>
        <Stack.Screen name={StackNav.BundleProductdetils} component={StackRoute.BundleProductdetils}/>
        
      </Stack.Navigator>
  )
}

const localStyle = StyleSheet.create({})