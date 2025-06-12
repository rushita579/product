import {Platform, SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {colors, styles} from '../../style';
import {useSelector} from 'react-redux';
import { STATUSBAR_HEIGHT } from '../../common/constants';

export default GSafeAreaView = ({children, statusBar, ...props}) => {
  const theme = useSelector(state => state.theme.theme);
const localStyle = getLocalStyle(theme);

  console.log(STATUSBAR_HEIGHT,'height')
  return (
    <SafeAreaView {...props} edges={['top', 'right', 'left']} style={[localStyle.root]}>
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

const getLocalStyle = (theme) => StyleSheet.create({
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
