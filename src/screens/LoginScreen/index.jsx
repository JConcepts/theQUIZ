import React, {useState, useEffect, useRef} from 'react';
import {View, Text, KeyboardAvoidingView} from 'react-native';
import {showMessage} from 'react-native-flash-message';

import TextInputField from '../../components/TextInputField';
import CustomButton from '../../components/CustomButton';

import {useDispatch, useSelector} from 'react-redux';

import {login, clearError} from '../../store/actions/user';

import styles from './styles';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let emailRef;
  let passwordRef;

  const dispatch = useDispatch();

  const user = useSelector(state => state.user.user);
  const error = useSelector(state => state.user.error);

  useEffect(() => {
    if (error) {
      dispatch(clearError());
      showMessage({
        message: error,
        type: 'danger',
      });
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (user) {
      navigation.navigate('QuizListScreen');
    }
  }, [user]);

  function handleLogin() {
    if (email !== '' && password !== '') dispatch(login(email, password));
  }

  function clearInput() {
    setTimeout(() => {
      emailRef.clear();
      passwordRef.clear();
      setEmail('');
      setPassword('');
    }, 1000);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'android' ? -1000 : 0}>
      <View style={styles.titleView}>
        <View>
          <Text style={[styles.titleText, {fontSize: 30}]}>the</Text>
          <Text style={[styles.titleText, {fontSize: 40, fontWeight: 800}]}>
            QUIZ
          </Text>
        </View>
      </View>
      <View style={styles.inputView}>
        <TextInputField
          inputRef={input => (emailRef = input)}
          placeholder="Enter your email"
          onChangeText={text => setEmail(text)}
          inputTitle={'Email'}
          type="email"
          value={email}
        />
        <TextInputField
          inputRef={input => (passwordRef = input)}
          placeholder="Enter your password"
          onChangeText={text => setPassword(text)}
          inputTitle={'Password'}
          type="auth"
          value={password}
        />

        <CustomButton
          text="Login"
          onPress={handleLogin}
          style={{width: '70%'}}
        />

        <CustomButton
          text="New Account ? Register"
          onPress={() => {
            navigation.navigate('RegisterScreen');
            clearInput();
          }}
          style={{width: '70%'}}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
