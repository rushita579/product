import { StyleSheet} from 'react-native'
import React from 'react'
import { StackNav } from '../NavigationKeys'
import { StackRoute } from '../NavigationRoutes'
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();


export default function Stacknavigation() {
  return (
      <Stack.Navigator>
        <Stack.Screen name={StackNav.Onboarding} component={StackRoute.Onboarding}/>
      </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})