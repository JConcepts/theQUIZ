import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import StartScreen from '../screens/StartScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import QuizListScreen from '../screens/QuizListScreen';
import CreateQuizScreen from '../screens/CreateQuizScreen';
import PlayQuizScreen from '../screens/PlayQuizScreen';
import ResultsScreen from '../screens/ResultsScreen';

const Stack = createNativeStackNavigator();

const defaultScreenOptions = {
  headerShown: false,
  animation: 'fade',
};

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultScreenOptions}>
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="QuizListScreen" component={QuizListScreen} />
        <Stack.Screen name="CreateQuizScreen" component={CreateQuizScreen} />
        <Stack.Screen name="PlayQuizScreen" component={PlayQuizScreen} />
        <Stack.Screen name="ResultsScreen" component={ResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
