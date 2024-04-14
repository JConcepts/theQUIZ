import {
  LOGIN_START,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  GET_USER_START,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  CLEAR_ERROR,
  CLEAR_SUCCESS_MESSAGE,
  LOGOUT_SUCCESS,
} from '../actions/user';

const initialState = {
  user: null,
  error: null,
  loading: false,
  successMessage: null,
  logginOut: false,
  logoutComplete: false
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_START:
      return {
        state,
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        successMessage: action.successMessage,
        loading: false,
      };
    case REGISTER_ERROR:
      return {
        error: action.error,
        loading: false,
      };
    case LOGIN_START:
      return {
        loading: true,
        logoutComplete: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.user,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case GET_USER_START:
      return {
        loading: true,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.user,
      };
    case GET_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case LOGOUT_SUCCESS:
      return {
        user: null,
        logoutComplete: true
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

export default userReducer;
