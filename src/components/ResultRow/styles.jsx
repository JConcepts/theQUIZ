import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  itemView: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  questionIndex: {
    position: 'absolute',
    fontSize: 40,
    color: 'rgba(255,255,255,0.5)',
    right: 5,
    top: 5,
  },

  answerIndicatorText: {
    fontWeight: '300',
    padding: 10,
  },

  rowDirection: {
    flexDirection: 'row',
  },

  questionText: {
    fontWeight: '500',
    fontSize: 18,
    paddingVertical: 10,
  },
  answerText: {
    textAlign: 'center',
    width: '100%',
    fontSize: 16,
  },

  questionView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
});

export default styles;
