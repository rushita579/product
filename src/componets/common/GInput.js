import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import typography from '../../style/typography';
import GText from './GText';
import {colors, styles} from '../../style';
import { getHeight, moderateScale } from '../../common/constants';


export default GInput = props  => {
     let {
    _value,
    label,
    inputContainerStyle,
    inputBoxStyle,
    toGetTextFieldValue,
    placeHolder,
    placeholderTextColor,
    keyBoardType,
    _onFocus,
    _onBlur,
    _errorText,
    _autoFocus,
    _isSecure,
    _maxLength,
    _editable = true,
    autoCapitalize,
    required = false,
    labelStyle,
    multiline,
    errorStyle,
    fieldRef,
    insideLeftIcon,
    showError = true,
    rightAccessory,
    bordercolor=null,
  } = props;

  const theme = useSelector(state => state.theme.theme);
  
  // Change Text Input Value
  const onChangeText = val => {
    toGetTextFieldValue(val);
  };
  return (
     <View style={styles.mv10}>
      {label && (
        <View style={[localStyle.labelContainer, labelStyle]}>
          <View style={styles.flexRow}>
            <GText style={localStyle.labelText} type={'m14'} color={colors[theme].inputcolor}>
              {label}
            </GText>
            {required && <GText style={{color: colors[theme].lightRed}}>{'  '}</GText>}
          </View>
        </View>
      )}
      <View
        style={[
          localStyle.inputContainer,
          {
            borderColor: _errorText ? colors[theme].lightRed : colors[theme].bColor,
            height: multiline ? getHeight(75) : getHeight(50),
            backgroundColor:colors[theme].inputbg,
             

          },
          bordercolor
              ? {borderColor: bordercolor}
              : null ,
          inputContainerStyle,
        ]}>
        {insideLeftIcon ? (
          <View style={styles.pl10}>{insideLeftIcon()}</View>
        ) : null}
        <TextInput
          ref={fieldRef}
          secureTextEntry={_isSecure}
          value={_value}
          maxLength={_maxLength}
          defaultValue={_value}
          autoFocus={_autoFocus}
          autoCorrect={false}
          autoCapitalize={autoCapitalize}
          placeholderTextColor={placeholderTextColor || colors[theme].placeHolderColor}
          onChangeText={onChangeText}
          keyboardType={keyBoardType}
          multiline={multiline}
          editable={_editable}
          onFocus={_onFocus}
          onBlur={_onBlur}
          placeholder={placeHolder}
          
          style={[
            localStyle.inputBox,
            {color: colors[theme].textColor},
            {height: multiline ? getHeight(70) : getHeight(50)},
            inputBoxStyle,
            _editable == false && {color: colors[theme].placeHolderColor},
          ]}
          
          {...props}
        />
        {/* Right Icon And Content Inside TextInput */}
        <View style={[styles.mr15]}>
          {rightAccessory ? rightAccessory() : null}
        </View>
      </View>
      {/* Error Text Message Of Input */}
      {!!_errorText?.length ? (
        <GText
          type={'r12'}
          style={{
            ...localStyle.errorText,
            ...errorStyle,
            color: colors[theme].lightRed,
          }}>
          {_errorText}
        </GText>
      ) : null}

      {_maxLength && showError && _value?.length > _maxLength ? (
        <GText style={{...localStyle.errorText, ...errorStyle}}>
          It should be maximum {_maxLength} character
        </GText>
      ) : null}
    </View>
  )
}

const localStyle = StyleSheet.create({
   labelText: {
    textAlign: 'left',
    opacity: 0.9,
  },
  inputBox: {
    ...typography.fontSizes.f16,
    ...typography.fontWeights.Regular,
    ...styles.ph10,
    ...styles.flex,
    ...styles.ml20,
  },
  inputContainer: {
    borderRadius: moderateScale(7),
    ...styles.rowSpaceBetween,
    ...styles.mt5,
    width: '100%',
  },
  labelContainer: {
    ...styles.mt10,
    ...styles.rowSpaceBetween,
    ...styles.mb5,
  },
  errorText: {
    textAlign: 'left',
    ...styles.mt5,
    ...styles.ml10,
  },
})