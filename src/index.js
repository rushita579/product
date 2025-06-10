import React from 'react';
import {StatusBar, View} from 'react-native';
import {useSelector} from 'react-redux';
import AppNavigator from './navigation';
import { styles } from './style';


const App = () => {
  // const colors = useSelector(state => state.theme.theme);

  return (
    <View style={styles.flex}>
      <StatusBar/>
      <AppNavigator />
    </View>
  );
};

export default App;