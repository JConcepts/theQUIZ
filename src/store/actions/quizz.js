import uuid from 'react-native-uuid';
import {getQuizList, storeQuiz, getUsers} from '../../data';

export const GET_QUIZ_LIST_START = 'GET_QUIZ_LIST_START';
export const GET_QUIZ_LIST_SUCCESS = 'GET_QUIZ_LIST_SUCCESS';
export const GET_QUIZ_LIST_ERROR = 'GET_QUIZ_LIST_ERROR';

export const STORE_QUIZ_START = 'STORE_QUIZ_START';
export const STORE_QUIZ_SUCCESS = 'STORE_QUIZ_SUCCESS';
export const STORE_QUIZ_ERROR = 'STORE_QUIZ_ERROR';

export const GET_ANSWERS_START = 'GET_ANSWERS_START';
export const GET_ANSWERS_SUCCESS = 'GET_ANSWERS_SUCCESS';
export const GET_ANSWERS_ERROR = 'GET_ANSWERS_ERROR';

export const UPDATE_QUIZ_START = 'UPDATE_QUIZ_START';
export const UPDATE_QUIZ_SUCCESS = 'UPDATE_QUIZ_SUCCESS';
export const UPDATE_QUIZ_ERROR = 'UPDATE_QUIZ_ERROR';

export const DELETE_QUIZ_START = 'DELETE_QUIZ_START';
export const DELETE_QUIZ_SUCCESS = 'DELETE_QUIZ_SUCCESS';
export const DELETE_QUIZ_ERROR = 'DELETE_QUIZ_ERROR';

export const SET_QUIZ_SUCCESS = 'SET_QUIZ_SUCCESS';

export const CLEAR_ERROR = 'CLEAR_ERROR';
export const CLEAR_SUCCESS_MESSAGE = 'CLEAR_SUCCESS_MESSAGE';

export function getQuizzes() {
  return async dispatch => {
    dispatch({type: GET_QUIZ_LIST_START});
    try {
      const quizList = await getQuizList();
      dispatch({
        type: GET_QUIZ_LIST_SUCCESS,
        quizList,
      });
    } catch (error) {
      dispatch({
        type: GET_QUIZ_LIST_ERROR,
        error: 'Something went wrong',
      });
    }
  };
}

export function saveNewQuiz(quiz) {
  return async dispatch => {
    dispatch({type: STORE_QUIZ_START});
    try {
      const quizList = await getQuizList();
      const uid = uuid.v4();
      const newQuiz = {
        id: uid,
        users: [],
        name: 'Quiz_' + uid.substring(0, 3),
        questions: quiz,
      };
      if (quizList !== null && quizList !== undefined) {
        await quizList.push(newQuiz);
      } else {
        quizList = [];
        quizList.push(newQuiz);
      }

      storeQuiz(quizList);
      dispatch({
        type: STORE_QUIZ_SUCCESS,
        quizList,
      });
    } catch {
      dispatch({
        type: STORE_QUIZ_ERROR,
        error: 'Something went wrong',
      });
    }
  };
}

export function setQuiz(quiz) {
  return dispatch => {
    dispatch({
      type: SET_QUIZ_SUCCESS,
      quiz,
    });
  };
}

export function deleteQuiz(quizID) {
  return async dispatch => {
    dispatch({type: DELETE_QUIZ_START});
    try {
      let quizList = await getQuizList();

      quizList = await quizList.filter(item => item.id !== quizID);
      storeQuiz(quizList);

      dispatch({
        type: DELETE_QUIZ_SUCCESS,
        quizList,
      });
    } catch {
      dispatch({
        type: DELETE_QUIZ_ERROR,
        error: 'Something went wrong',
      });
    }
  };
}

export function updateQuiz(quizID, savedAnswers, userID) {
  return async dispatch => {
    dispatch({type: UPDATE_QUIZ_START});
    try {
      const quizList = await getQuizList();

      let quiz = quizList.find(item => item.id == quizID);
      const index = quizList.findIndex(item => item.id == quizID);

      quiz.users.push(userID);

      for (let i = 0; i < quiz.questions.length; i++) {
        let tempAnswer = savedAnswers.find(
          item => item.question == quiz.questions[i].text,
        ).answer;

        if (quiz.questions[i].answer.text == tempAnswer.text) {
          quiz.questions[i].answer.users.push(userID);
        } else if (quiz.questions[i].options.length == 0) {
          quiz.questions[i].openWrongAnswers.push({
            text: tempAnswer.text,
            users: [userID],
          });
        } else {
          for (let j = 0; j < quiz.questions[i].options.length; j++) {
            if (quiz.questions[i].options[j].text == tempAnswer.text) {
              quiz.questions[i].options[j].users.push(userID);
            }
            break;
          }
        }
      }

      quizList[index] = quiz;

      storeQuiz(quizList);

      dispatch({
        type: UPDATE_QUIZ_SUCCESS,
        quizList,
      });
    } catch {
      dispatch({
        type: UPDATE_QUIZ_ERROR,
        error: 'Something went wrong',
      });
    }
  };
}

export function getQuizAnswersFromUsers(quizID) {
  return async dispatch => {
    dispatch({type: GET_ANSWERS_START});
    try {
      const quizList = await getQuizList();
      const users = await getUsers();

      let quiz = quizList.find(item => item.id == quizID);

      let quizAnswers = {};

      quiz.users.forEach(userID => {
        const user = users[userID].email;
        quizAnswers[user] = [];
        quiz.questions.forEach(question => {
          if (question.answer.users.includes(userID)) {
            quizAnswers[user].push({
              question: question.text,
              answer: question.answer,
              rightAnswer: question.answer.text,
            });
            return;
          }
          let openAnswer = question.openWrongAnswers.find(item =>
            item.users.includes(userID),
          );
          if (openAnswer !== undefined) {
            quizAnswers[user].push({
              question: question.text,
              answer: openAnswer,
              rightAnswer: question.answer.text,
            });
            return;
          }
          let multipleAnswer = question.options.find(item =>
            item.users.includes(userID),
          );
          if (multipleAnswer !== undefined) {
            quizAnswers[user].push({
              question: question.text,
              answer: multipleAnswer,
              rightAnswer: question.answer.text,
            });
            return;
          }
        });
      });

      dispatch({
        type: GET_ANSWERS_SUCCESS,
        quizAnswers: quizAnswers,
      });
    } catch {
      dispatch({
        type: GET_ANSWERS_ERROR,
        error: 'Something went wrong',
      });
    }
  };
}

export function clearError() {
  return {type: CLEAR_ERROR};
}

export function clearSuccessMessage() {
  return {type: CLEAR_SUCCESS_MESSAGE};
}
