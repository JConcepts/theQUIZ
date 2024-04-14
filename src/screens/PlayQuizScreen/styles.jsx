import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },

  questionView: {
    width: '90%',
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },

  questionText: {
    fontSize: 20,
    paddingVertical: 30,
    fontWeight: '500'
  },

  questionIndicatorText:{
    marginTop: 15
  }
});

export default styles;
