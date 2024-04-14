import {View, TouchableOpacity, Text} from 'react-native';
import React, {useState} from 'react';
import {ChevronDown} from 'lucide-react-native';
import Colors from '../../constants/Colors';

import styles from './styles';

const UserItem = ({id, children}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={{width: '100%'}}>
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        style={[
          styles.clickableUser,
          {
            borderBottomWidth: isOpen ? 0.3 : 0.6,
          },
        ]}>
        <View style={[styles.centerItems, {flex: 8}]}>
          <Text>{id}</Text>
        </View>
        <View style={[styles.centerItems, {flex: 1}]}>
          <ChevronDown color={Colors.primaryDark} />
        </View>
      </TouchableOpacity>
      {isOpen ? (
        <View
          style={styles.dropdownBackground}>
          {children}
        </View>
      ) : null}
    </View>
  );
};

export default UserItem;
