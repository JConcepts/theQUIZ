import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {isAuthenticated} from '../../data';

import {useDispatch} from 'react-redux';
import { getUser } from '../../store/actions/user';

import styles from './styles';

const StartScreen = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkIfUserIsLoggedIn() {
      if (await isAuthenticated()) {
        dispatch(getUser());
        setTimeout(() => {
          navigation.navigate('QuizListScreen');
        }, 1500);
      } else {
        setTimeout(() => {
          navigation.navigate('LoginScreen');
        }, 1500);
      }
    }

    checkIfUserIsLoggedIn();
  },[]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.titleText, {fontSize: 30}]}>the</Text>
        <Text style={[styles.titleText, {fontSize: 40, fontWeight: 800}]}>
          QUIZ
        </Text>
      </View>
    </View>
  );
};

export default StartScreen;
