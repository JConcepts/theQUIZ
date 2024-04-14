import {View} from 'react-native';
import React from 'react';
import UserItem from '../UserItem';
import ResultList from '../ResultList';
import styles from './styles';

const UserList = ({quizAnswers}) => {
  return (
    <View style={styles.container}>
      {Object.keys(quizAnswers).map((item, index) => {
        return (
          <UserItem
            key={item}
            id={item}
            children={
              <ResultList
                key={'' + item + index}
                savedAnswers={quizAnswers[item]}
              />
            }
          />
        );
      })}
    </View>
  );
};

export default UserList;
