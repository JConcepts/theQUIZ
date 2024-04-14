import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import HeaderComponent from '../../components/HeaderComponent';
import CustomButton from '../../components/CustomButton';
import {shuffleList} from '../../utils';
import Colors from '../../constants/Colors';
import styles from './styles';

import {updateQuiz} from '../../store/actions/quizz';
import TextInputField from '../../components/TextInputField';

const PlayQuizScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [openAnswer, setOpenAnswer] = useState('');
  const [savedAnswers, setSavedAnswers] = useState([]);
  const [questionType, setQuestionType] = useState(null);
  const [openAnswerSubmited, setOpenAnswerSubmited] = useState(false);

  const quiz = useSelector(state => state.quiz.quiz);
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    const current = quiz.questions[questionIndex];
    if (current.options.length == 0) {
      setQuestionType('open');
    } else {
      let auxList = [];
      auxList = [...auxList, current.answer];
      for (let i = 0; i < current.options.length; i++) {
        auxList = [...auxList, current.options[i]];
      }
      auxList = shuffleList(auxList);
      setShuffledAnswers(auxList);
      setQuestionType('multiple');
    }
    setCurrentQuestion(current);
  }, [questionIndex]);

  function handleAnswerPress(answer) {
    setSelectedAnswer(answer.text);
    setSavedAnswers([
      ...savedAnswers,
      {
        question: currentQuestion.text,
        answer: answer,
        rightAnswer: currentQuestion.answer.text,
      },
    ]);
  }

  function verifyAnswer(answer) {
    if (answer == currentQuestion.answer.text && selectedAnswer !== '') {
      return Colors.lightGreen;
    }

    if (answer == selectedAnswer) {
      return Colors.lightRed;
    }
    return 'white';
  }

  function handleOpenAnswerVerification() {
    const answer = {
      text: openAnswer,
      users: [],
    };
    handleAnswerPress(answer);
    setOpenAnswerSubmited(true);
  }

  function handleSubmitQuestion() {
    if (questionIndex !== quiz.questions.length - 1) {
      setQuestionIndex(prev => prev + 1);
      setSelectedAnswer('');
      setOpenAnswer('');
      setOpenAnswerSubmited(false);
    } else {
      dispatch(updateQuiz(quiz.id, savedAnswers, user.id));
      navigation.navigate('ResultsScreen', {answers: savedAnswers});
    }
  }

  return (
    <View style={styles.container}>
      <HeaderComponent
        leftLogo="ChevronLeft"
        leftFunction={navigation.goBack}
        headerTitle={quiz.id}
      />
      <Text style={styles.questionIndicatorText}>{`Question ${
        questionIndex + 1
      }/${quiz.questions.length}`}</Text>
      <View style={styles.questionView}>
        <Text style={styles.questionText}>{currentQuestion.text}</Text>
      </View>
      {questionType == 'open' ? (
        <TextInputField
          disabled={openAnswer !== '' && selectedAnswer !== ''}
          value={openAnswer}
          placeholder={'Answer'}
          inputTitle={'Type your answer'}
          styleView={{width: '90%'}}
          style={{
            backgroundColor: openAnswerSubmited
              ? verifyAnswer(openAnswer)
              : 'white',
          }}
          onChangeText={text => setOpenAnswer(text)}
        />
      ) : (
        shuffledAnswers.map(answer => {
          let color = verifyAnswer(answer.text);
          return (
            <CustomButton
              key={answer.text}
              text={answer.text}
              onPress={() => handleAnswerPress(answer)}
              style={{backgroundColor: color}}
            />
          );
        })
      )}
      {openAnswerSubmited && selectedAnswer !== currentQuestion.answer.text ? (
        <CustomButton
          key={currentQuestion.answer.text}
          text={currentQuestion.answer.text}
          onPress={null}
          style={{backgroundColor: Colors.lightGreen}}
        />
      ) : null}
      {selectedAnswer !== '' ? (
        <CustomButton
          text={
            questionIndex !== quiz.questions.length - 1
              ? 'Next Question'
              : 'Finalize Quiz'
          }
          onPress={handleSubmitQuestion}
          style={{position: 'absolute', bottom: '15%'}}
        />
      ) : null}
      {openAnswer !== '' && selectedAnswer == '' ? (
        <CustomButton
          text={'Submit answer'}
          onPress={handleOpenAnswerVerification}
          style={{position: 'absolute', bottom: '15%'}}
        />
      ) : null}
    </View>
  );
};

export default PlayQuizScreen;
