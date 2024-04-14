import {View, Text, TextInput} from 'react-native';
import React from 'react';
import styles from './styles';

const TextInputField = ({
  type,
  style,
  placeholder,
  onChangeText,
  inputTitle,
  inputRef,
  value,
  styleView,
  disabled
}) => {
  let keyboardType;
  let autoCorrect = false;
  let secureTextEntry = false;

  if (type == 'auth') {
    // keyboardType = 'password';
    secureTextEntry = true;
  } else if (type == 'email') {
    keyboardType = 'email-address';
  } else {
    autoCorrect = true;
    keyboardType = 'default';
  }

  return (
    <View style={[styles.inputView, styleView]}>
      {inputTitle ? <Text>{inputTitle}</Text> : null}
      <TextInput
        editable={!disabled}
        ref={inputRef}
        style={[styles.basicInput, style]}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCorrect={autoCorrect}
        autoCapitalize="none"
      />
    </View>
  );
};

export default TextInputField;
