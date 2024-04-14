import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

export default StyleSheet.create({
  inputView: {
    width: '70%',
    height: 70,
    marginTop: 20,
  },
  basicInput: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.lightGreyInput,
    paddingHorizontal: 5,
    marginTop: 5
  },
});
