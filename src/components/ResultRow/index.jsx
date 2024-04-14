import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

import styles from './styles';
import Colors from '../../constants/Colors';

const ResultRow = ({questionNumber, questionText, userAnswer, rigthAnswer}) => {
  const [isRight, setIsRight] = useState(false);

  useEffect(() => {
    setIsRight(userAnswer == rigthAnswer);
  }, []);

  return (
    <View
      style={[
        styles.itemView,
        {
          backgroundColor: isRight ? Colors.lightGreen : Colors.lightRed,
          borderColor: isRight ? Colors.green : Colors.red,
        },
      ]}>
      <Text style={styles.questionIndex}>{questionNumber}</Text>
      <View style={styles.questionView}>
        <Text style={styles.questionText}>{`${questionText}`}</Text>
      </View>
      <Text style={styles.answerIndicatorText}>Your answer</Text>
      {!isRight ? (
        <View style={styles.rowDirection}>
          <Text style={styles.answerText}>{userAnswer}</Text>
        </View>
      ) : null}
      {!isRight ? (
        <Text style={styles.answerIndicatorText}>Correct Answer</Text>
      ) : null}
      <View style={styles.rowDirection}>
        <Text style={styles.answerText}>{rigthAnswer}</Text>
      </View>
    </View>
  );
};

export default ResultRow;
