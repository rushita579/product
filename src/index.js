import React from 'react';
import {StatusBar, View} from 'react-native';
import {useSelector} from 'react-redux';
import AppNavigator from './navigation';
import Toast from 'react-native-toast-message'
import { styles } from './style';


const App = () => {
  // const colors = useSelector(state => state.theme.theme);

  return (
    <>
       <StatusBar/>
      <AppNavigator />
      <Toast/>
    </>
     
  );
};

export default App;