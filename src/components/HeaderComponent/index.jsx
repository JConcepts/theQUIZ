import {View, Text, TouchableOpacity} from 'react-native';
import {icons} from 'lucide-react-native';
import React from 'react';

import styles from './styles';
import Colors from '../../constants/Colors';

const HeaderComponent = ({
  headerTitle,
  leftFunction,
  leftLogo,
  rightFunction,
  rightLogo,
  style
}) => {
  const LeftIcon = icons[leftLogo];
  const RightIcon = icons[rightLogo];

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={leftFunction} style={styles.sideView}>
        {leftFunction !== undefined && leftLogo !== undefined ? (
          <LeftIcon color={Colors.primaryDark} size={25} />
        ) : null}
      </TouchableOpacity>
      <View style={styles.centerView}>
        <Text style={styles.headerText}>{headerTitle}</Text>
      </View>
      <TouchableOpacity onPress={rightFunction} style={styles.sideView}>
        {rightFunction !== undefined && rightLogo !== undefined ? (
          <RightIcon color={Colors.primaryDark} size={25} />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default HeaderComponent;
