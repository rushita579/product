//Librery import
import {useIsFocused} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, ActivityIndicator, Modal} from 'react-native';
import {useSelector} from 'react-redux';

//Local import
import {colors, styles} from '@style';
const GLoader = () => {
  const theme = useSelector(state => state.theme.theme);
  const isFocused = useIsFocused();

  if (!isFocused) {
    return <View />;
  }
  return (
    <Modal transparent>
      <View
        style={[
          localStyles.vwMainStyle,
          {backgroundColor: colors[theme].textgray},
        ]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    </Modal>
  );
};

const localStyles = StyleSheet.create({
  vwMainStyle: {
    ...styles.flex,
    ...styles.center,
  },
});

export default React.memo(GLoader);
