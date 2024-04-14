import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

import styles from './styles';

const CustomButton = ({text, onPress, style, textStyleExtra}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.buttonView, style]}>
      <Text style={[styles.textStyle, textStyleExtra]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
