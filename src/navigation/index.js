import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Stacknavigation from './Types/StackNavigation';

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stacknavigation />
    </NavigationContainer>
  );
}
