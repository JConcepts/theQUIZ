import {storeUser, getUsers, userLogin, getToken, logoutUser} from '../../data';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const REGISTER_START = 'REGISTER_START';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export const GET_USER_START = 'GET_USER_START';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';

export const CLEAR_ERROR = 'CLEAR_ERROR';
export const CLEAR_SUCCESS_MESSAGE = 'CLEAR_SUCCESS_MESSAGE';

export function login(email, password) {
  return async dispatch => {
    dispatch({type: LOGIN_START});

    try {
      let user = null;
      const users = await getUsers();

      if (users == null) {
        dispatch({
          type: LOGIN_ERROR,
          error: `You have entered an invalid username or password`,
        });
        return;
      }

      user = await searchByEmail(users, email);

      if (user !== null) {
        if (user.password == password) {
          userLogin(user.id);
          dispatch({
            type: LOGIN_SUCCESS,
            user: user,
          });
        } else {
          dispatch({
            type: LOGIN_ERROR,
            error: `You have entered an invalid email or password`,
          });
        }
      } else {
        dispatch({
          type: LOGIN_ERROR,
          error: `You have entered an invalid username or password`,
        });
      }
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        error: 'Something went wrong',
      });
    }
  };
}

export function logout() {
  return async dispatch => {
    await logoutUser();
    setTimeout(() => {
      dispatch({type: LOGOUT_SUCCESS});
    }, 1000);
  };
}

export function registerUser(email, password) {
  return async dispatch => {
    dispatch({type: REGISTER_START});
    try {
      let user = null;
      let users = await getUsers();

      if (users !== null) {
        user = searchByEmail(users, email);
      }

      if (user !== null) {
        dispatch({
          type: REGISTER_ERROR,
          error: 'Email already in use',
        });
      } else {
        await storeUser(email, password);

        dispatch({
          type: REGISTER_SUCCESS,
          successMessage: 'Register Successfull',
        });
      }
    } catch {
      dispatch({
        type: REGISTER_ERROR,
        error: 'Something went wrong',
      });
    }
  };
}

export function getUser() {
  return async dispatch => {
    dispatch({type: GET_USER_START});
    try {
      const users = await getUsers();
      const token = await getToken();

      dispatch({
        type: GET_USER_SUCCESS,
        user: users[token],
      });
    } catch {
      dispatch({
        type: GET_USER_ERROR,
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

//Aux Functions

function searchByEmail(data, email) {
  for (let user in data) {
    if (data[user].email == email) {
      return data[user];
    }
  }
  return null;
}
