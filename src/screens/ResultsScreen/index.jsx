import {View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {getQuizAnswersFromUsers} from '../../store/actions/quizz';

import HeaderComponent from '../../components/HeaderComponent';
import ResultList from '../../components/ResultList';

import styles from './styles';
import UserList from '../../components/UserList';

const ResultsScreen = ({navigation, route}) => {
  const dispatch = useDispatch();

  const answers = route.params?.answers;
  const quizID = route.params?.quizID;
  const [savedAnswers, setSavedAnswers] = useState([]);

  const quizAnswers = useSelector(state => state.quiz.quizAnswers);

  useEffect(() => {
    if (answers !== null && answers !== undefined) {
      setSavedAnswers(answers);
    } else getAllQuizAnswers();
  }, []);

  function getAllQuizAnswers() {
    dispatch(getQuizAnswersFromUsers(quizID));
  }

  return (
    <View style={styles.container}>
      <HeaderComponent
        leftLogo={'ChevronLeft'}
        leftFunction={() =>
          navigation.reset({
            index: 0,
            routes: [{name: 'QuizListScreen'}],
          })
        }
        headerTitle={'Results'}
      />
      {quizAnswers !== undefined ? (
        <UserList quizAnswers={quizAnswers} />
      ) : (
        <ResultList savedAnswers={savedAnswers} />
      )}
    </View>
  );
};

export default ResultsScreen;
