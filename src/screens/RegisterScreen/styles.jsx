import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  inputView: {
    flex: 1,
    width: '100%',
    alignItems: 'center'
  },

  backButtonView: {
    position: 'absolute',
    top: '2%',
    left: '5%',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backButtonText: {
    fontWeight: '700',
    fontSize: 20,
  },
});
