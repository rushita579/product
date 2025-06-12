import { StyleSheet} from 'react-native'
import React from 'react'
import { StackNav } from '../NavigationKeys'
import { StackRoute } from '../NavigationRoutes'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import typography from '../../style/typography';


const Stack = createNativeStackNavigator();


export default function Stacknavigation() {
  return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name={StackNav.Onboarding} component={StackRoute.Onboarding}/>
        <Stack.Screen name={StackNav.Onboarding2} component={StackRoute.Onboarding2}/>
        <Stack.Screen name={StackNav.Onboarding3} component={StackRoute.Onboarding3}/>
        <Stack.Screen name={StackNav.Onboarding4} component={StackRoute.Onboarding4}/>
        <Stack.Screen name={StackNav.Login} component={StackRoute.Login}/>
      </Stack.Navigator>
  )
}

const localStyle = StyleSheet.create({})