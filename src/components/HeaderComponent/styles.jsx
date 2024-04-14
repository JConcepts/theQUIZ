import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    borderBottomWidth: 0.2,
  },
  sideView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerView: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center'
  },
});

export default styles;
