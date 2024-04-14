import React, {useState} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import {X} from 'lucide-react-native';

import TextInputField from '../../components/TextInputField';
import CustomButton from '../../components/CustomButton';
import HeaderComponent from '../../components/HeaderComponent';

import {saveNewQuiz} from '../../store/actions/quizz';

import styles from './styles';

const CreateQuizScreen = ({navigation}) => {
  const [questionsList, setQuestionsList] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState({text: '', users: []});
  const [options, setOptions] = useState([]);

  const dispatch = useDispatch();

  function cleanForm() {
    setCurrentQuestion('');
    setCorrectAnswer({text: '', users: []});
    setOptions([]);
  }

  function addNewOption() {
    setOptions(options => [...options, {text: '', users: []}]);
  }

  function removeAnswer(index) {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  }

  function updateAnswer(text, index) {
    const newList = [...options];
    newList[index].text = text;
    setOptions(newList);
  }

  function updateCorrectAnswer(text) {
    setCorrectAnswer({...correctAnswer, text: text});
  }

  function validQuestion() {
    if (!currentQuestion.trim().length) return false;
    
    let a = true;
    for (const i in questionsList) {
      if (questionsList[i].text == currentQuestion) {
        a = false
        return
      }
    }

    return a;
  }

  function validOptions() {
    let auxList = [];

    if (!correctAnswer.text.trim().length) return false;

    if (options.length == 0) return true;

    if (!options[0].text.trim().length) return false;

    for (const option in options) {
      if (
        options[option].text == correctAnswer.text ||
        auxList.includes(options[option].text) ||
        options[option].text == currentQuestion ||
        !options[option].text.trim('').length
      ) {
        return false;
      } else {
        if (!options[option].text.trim().length)
          auxList.push(options[option].text);
      }
    }
    return true;
  }

  async function submitQuestion(submitQuiz) {
    let auxList = [...questionsList];
    if (!validQuestion()) {
      showMessage({
        message: 'Question field empty or already exists',
        type: 'danger',
      });
    } else if (!validOptions()) {
      showMessage({
        message: 'Answer options empty or repeated',
        type: 'danger',
      });
    } else {
      auxList.push({
        text: currentQuestion,
        answer: correctAnswer,
        options,
        openWrongAnswers: [],
      });
      if (submitQuiz) {
        dispatch(saveNewQuiz(auxList));
        navigation.goBack();
      } else {
        setQuestionsList(auxList);
        cleanForm();
      }
    }
  }

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <HeaderComponent
        leftLogo="ChevronLeft"
        leftFunction={handleGoBack}
        headerTitle={'Create Quiz'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{width: '100%'}}
        contentContainerStyle={{alignItems: 'center', paddingBottom: 80}}>
        <TextInputField
          placeholder="Enter question"
          value={currentQuestion}
          inputTitle={`Question ${questionsList.length + 1}`}
          onChangeText={text => setCurrentQuestion(text)}
        />
        <TextInputField
          placeholder="Enter answer"
          value={correctAnswer.text}
          inputTitle={`Correct answer`}
          onChangeText={updateCorrectAnswer}
          styleView={{marginTop: 50}}
        />
        {options.map((answer, index) => (
          <View
            key={index}
            style={styles.addOptionView}>
            <View style={{flex: 7}}>
              <TextInputField
                placeholder="Enter answer"
                value={answer.text}
                inputTitle={`Option ${index + 1}`}
                onChangeText={text => updateAnswer(text, index)}
                styleView={{width: '100%'}}
              />
            </View>
            {options.length > 0 ? (
              <View
                style={[styles.centerItems, {flex: 1}]}>
                <TouchableOpacity
                  style={styles.removeOptionView}
                  onPress={() => removeAnswer(index)}>
                  <X color="red" size={30} />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        ))}
        {options[options.length - 1]?.text !== '' && options.length < 3 ? (
          <CustomButton
            onPress={addNewOption}
            text={'Add answer option'}
            style={{width: '70%'}}
          />
        ) : null}
        <CustomButton
          onPress={() => submitQuestion(false)}
          text={'Add New Question'}
          style={{width: '70%'}}
        />
        <CustomButton
          onPress={() => submitQuestion(true)}
          text={'Add Question and Submit Quiz'}
          style={{width: '70%'}}
        />
      </ScrollView>
    </View>
  );
};

export default CreateQuizScreen;
