import {
  View,
  Text,
  FlatList,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import {Trash2, Play, ReceiptText, Plus, Check} from 'lucide-react-native';

import CustomButton from '../../components/CustomButton';
import HeaderComponent from '../../components/HeaderComponent';

import {logout} from '../../store/actions/user';
import {
  getQuizzes,
  deleteQuiz,
  clearSuccessMessage,
  setQuiz,
} from '../../store/actions/quizz';

import styles from './styles';
import Colors from '../../constants/Colors';

const QuizListScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);

  const quizList = useSelector(state => state.quiz.quizList);
  const user = useSelector(state => state.user.user);
  const successMessage = useSelector(state => state.quiz.successMessage);

  useEffect(() => {
    if (successMessage) {
      dispatch(clearSuccessMessage());
      showMessage({
        message: successMessage,
        type: 'success',
      });
    }
  }, [successMessage, dispatch]);

  useEffect(() => {
    dispatch(getQuizzes());
  }, []);

  function handleLogout() {
    if (modalVisible) setModalVisible(false);
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{name: 'StartScreen'}],
    });
  }

  function handleDeleteQuiz(quizID) {
    dispatch(deleteQuiz(quizID));
  }

  function renderItem({item}) {
    let alreadyAnsweredQuiz = item.users.includes(user.id);

    return (
      <View
        style={[
          styles.quizItemView,
          {
            backgroundColor: alreadyAnsweredQuiz
              ? Colors.lightGreen
              : 'rgba(0,0,0,0.1)',
          },
        ]}>
        <View style={{flex: 8}}>
          <Text
            style={{textAlign: 'center', alignSelf: 'center', width: '90%'}}>
            {item.name}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => {
              !alreadyAnsweredQuiz
                ? handlePlayQuiz(item)
                : Alert.alert('You already answered this quiz');
            }}>
            {!alreadyAnsweredQuiz ? (
              <Play color={Colors.green} />
            ) : (
              <Check color={Colors.green} />
            )}
          </TouchableOpacity>
        </View>
        {user?.admin ? (
          <View style={{flex: 2, flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                flex: 1,
                width: '100%',
              }}
              onPress={() => navigation.navigate('ResultsScreen', {quizID: item.id})}>
              <ReceiptText color={Colors.iconGrey} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{alignItems: 'center', flex: 1}}
              onPress={() => handleDeleteQuiz(item.id)}>
              <Trash2 color={Colors.red} />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }

  function handleModalClose() {
    setModalVisible(false);
  }

  function handlePlayQuiz(quiz) {
    dispatch(setQuiz(quiz));
    navigation.navigate('PlayQuizScreen');
  }

  return (
    <View style={styles.container}>
      <HeaderComponent
        rightLogo="Settings"
        rightFunction={() => setModalVisible(true)}
        headerTitle={'Quiz List'}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          onPress={handleModalClose}
          style={styles.modalContainer}>
          <View style={styles.modalView}>
            <HeaderComponent
              rightLogo="X"
              rightFunction={() => setModalVisible(false)}
              headerTitle={'Settings'}
              style={{width: 200}}
            />
            <CustomButton
              text={'Logout'}
              onPress={handleLogout}
              style={{
                borderColor: 'white',
                paddingBottom: 20,
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
      <FlatList
        data={quizList}
        style={{width: '100%'}}
        contentContainerStyle={{
          width: '100%',
        }}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={{alignSelf: 'center', paddingVertical: '10%'}}>Theres no Quiz available</Text>}
      />

      {user?.admin ? (
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '10%',
            width: 50,
            height: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.primaryDark,
          }}
          onPress={() => navigation.navigate('CreateQuizScreen')}>
          <Plus color="white" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default QuizListScreen;
