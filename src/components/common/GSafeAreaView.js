//Library import
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

//Local import

import {colors, styles} from '@style';
import {STATUSBAR_HEIGHT} from '@common/constants';

export default GSafeAreaView = ({children, statusBar, ...props}) => {
  const theme = useSelector(state => state.theme.theme);
  const localStyle = getLocalStyle(theme);

  
  return (
    <SafeAreaView style={[localStyle.root]} {...props}>
      <View
        style={[
          styles.statusBarFix,
          {height: STATUSBAR_HEIGHT},
          statusBar && {backgroundColor: statusBar.backgroundColor},
        ]}
      />
      <StatusBar
        backgroundColor={
          statusBar ? statusBar.backgroundColor : styles.statusBar
        }
        barStyle={'light-content'}
      />
      {children}
    </SafeAreaView>
  );
};

const getLocalStyle = theme =>
  StyleSheet.create({
    root: {
      ...styles.flex,
      backgroundColor: colors[theme].white,
    },
    statusBar: colors[theme].blue,
    statusBarFix: {
      backgroundColor: colors[theme].blue,
      width: '100%',
    },
  });
