import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
import uuid from 'react-native-uuid';

export async function isAuthenticated() {
  const token = await AsyncStorage.getItem('TOKEN_KEY');
  return token !== undefined && token !== null;
}

export async function getToken() {
  return await AsyncStorage.getItem('TOKEN_KEY');
}

export async function storeUser(email, password) {
  try {
    //No bueno
    const userID = uuid.v4();
    const admin = email.includes('admin');
    const user = {
      id: userID,
      email,
      password,
      admin,
    };

    let users = await getUsers();

    if (users !== null && users !== undefined) {
      users[userID] = user;
    } else {
      users = {};
      users[userID] = user;
    }
    await AsyncStorage.setItem('USERS', JSON.stringify(users));
  } catch {
    showMessage({
      message: 'Error saving user',
      type: 'danger',
    });
  }
}

export async function getUsers() {
  const users = await AsyncStorage.getItem('USERS');
  if (users !== null && users !== undefined) {
    return JSON.parse(users);
  }
  return null;
}

export async function userLogin(userID) {
  await AsyncStorage.setItem('TOKEN_KEY', userID);
}

export async function logoutUser() {
  await AsyncStorage.removeItem('TOKEN_KEY');
}

export async function userLogout() {
  await AsyncStorage.removeItem('TOKEN_KEY');
}

//FIX
export async function getQuizList() {
  const quizList = await AsyncStorage.getItem('QUIZLIST');
  if (quizList !== null && quizList !== undefined) {
    return JSON.parse(quizList);
  }
  return [];
}

export async function storeQuiz(quizList) {
  await AsyncStorage.setItem('QUIZLIST', JSON.stringify(quizList));
}
