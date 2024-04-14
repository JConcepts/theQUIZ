import {
  GET_QUIZ_LIST_START,
  GET_QUIZ_LIST_SUCCESS,
  GET_QUIZ_LIST_ERROR,
  GET_ANSWERS_START,
  GET_ANSWERS_SUCCESS,
  GET_ANSWERS_ERROR,
  STORE_QUIZ_START,
  STORE_QUIZ_SUCCESS,
  STORE_QUIZ_ERROR,
  SET_QUIZ_SUCCESS,
  UPDATE_QUIZ_START,
  UPDATE_QUIZ_SUCCESS,
  UPDATE_QUIZ_ERROR,
  DELETE_QUIZ_START,
  DELETE_QUIZ_SUCCESS,
  DELETE_QUIZ_ERROR,
  CLEAR_ERROR,
  CLEAR_SUCCESS_MESSAGE,
} from '../actions/quizz';

const initialState = {
  quizList: [],
  quiz: null,
  quizAnswers: {},
  loading: false,
  successMessage: null,
};

function quizReducer(state = initialState, action) {
  switch (action.type) {
    case GET_QUIZ_LIST_START:
      return {
        ...state,
        loading: true,
      };
    case GET_QUIZ_LIST_SUCCESS:
      return {
        quizList: action.quizList,
        loading: false,
      };
    case GET_QUIZ_LIST_ERROR:
      return {
        error: action.error,
        loading: false,
      };
    case GET_ANSWERS_START:
      return {
        ...state,
        loading: true,
      };
    case GET_ANSWERS_SUCCESS:
      return {
        ...state,
        quizAnswers: action.quizAnswers,
        loading: false,
      };
    case GET_ANSWERS_ERROR:
      return {
        error: action.error,
        loading: false,
      };
    case STORE_QUIZ_START:
      return {
        ...state,
        loading: true,
      };
    case STORE_QUIZ_SUCCESS:
      return {
        quizList: action.quizList,
        loading: false,
      };
    case STORE_QUIZ_ERROR:
      return {
        error: action.error,
        loading: false,
      };
    case UPDATE_QUIZ_START:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_QUIZ_SUCCESS:
      return {
        ...state,
        quizList: action.quizList,
        loading: false,
      };
    case UPDATE_QUIZ_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case SET_QUIZ_SUCCESS:
      return {
        ...state,
        quiz: action.quiz,
        loading: false,
      };
    case DELETE_QUIZ_START:
      return {
        ...state,
        loading: true,
      };
    case DELETE_QUIZ_SUCCESS:
      return {
        quizList: action.quizList,
        successMessage: 'Quiz deleted with success',
        loading: false,
      };
    case DELETE_QUIZ_ERROR:
      return {
        error: action.error,
        loading: false,
      };
    case CLEAR_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: null,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

export default quizReducer;
