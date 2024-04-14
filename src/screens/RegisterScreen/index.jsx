import {View, KeyboardAvoidingView} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import {showMessage} from 'react-native-flash-message';

import {useDispatch, useSelector} from 'react-redux';

import {
  registerUser,
  clearError,
  clearSuccessMessage,
} from '../../store/actions/user';

import TextInputField from '../../components/TextInputField';
import CustomButton from '../../components/CustomButton';
import HeaderComponent from '../../components/HeaderComponent';

import {verifyEmail} from '../../utils';

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const error = useSelector(state => state.user.error);
  const successMessage = useSelector(state => state.user.successMessage);

  const dispatch = useDispatch();

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
    if (successMessage) {
      navigation.goBack();
      dispatch(clearSuccessMessage());
      showMessage({
        message: successMessage,
        type: 'success',
      });
    }
  }, [successMessage, dispatch]);

  function handleRegister() {
    if (!verifyEmail(email) || email == '') {
      showMessage({
        message: `Use a valid email`,
        type: 'danger',
      });
      return;
    }

    if (password !== confirmPassword || password == '') {
      showMessage({
        message: `Passwords don't match`,
        type: 'danger',
      });
      return;
    }

    dispatch(registerUser(email, password));
  }

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <HeaderComponent
        leftLogo="ChevronLeft"
        leftFunction={handleGoBack}
        headerTitle={'Registration'}
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'android' ? -1000 : 0}>
        <View style={styles.inputView}>
          <TextInputField
            placeholder="example@company.com"
            onChangeText={text => setEmail(text)}
            inputTitle={'Email'}
            type="email"
            value={email}
            styleView={{marginTop: '15%'}}
          />
          <TextInputField
            placeholder="Enter your password"
            onChangeText={text => setPassword(text)}
            inputTitle={'Password'}
            type="auth"
            value={password}
          />
          <TextInputField
            placeholder="Enter your password"
            onChangeText={text => setConfirmPassword(text)}
            type="auth"
            inputTitle={'Confirm your Password'}
            value={confirmPassword}
          />
          <CustomButton text={'Register'} onPress={handleRegister} style={{width: '70%', marginTop: '20%'}} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;
