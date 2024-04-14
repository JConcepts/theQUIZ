import {
  configureStore,
  combineReducers,
  applyMiddleware,
} from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';

import userReducer from './reducers/user';
import quizReducer from './reducers/quizz';

const rootReducer = combineReducers({
  user: userReducer,
  quiz: quizReducer,
});

export default configureStore({reducer: rootReducer}, applyMiddleware(thunk));
