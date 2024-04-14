import {Text, FlatList} from 'react-native';
import React from 'react';
import ResultRow from '../ResultRow';

const ResultList = ({savedAnswers}) => {
  function renderItem({item, index}) {
    return (
      <ResultRow
        key={'' + index + item.question}
        questionNumber={index + 1}
        rigthAnswer={item.rightAnswer}
        questionText={item.question}
        userAnswer={item.answer.text}
      />
    );
  }

  return (
    <FlatList
      data={savedAnswers}
      style={{width: '100%', flex: 1, paddingBottom: 10}}
      contentContainerStyle={{
        width: '100%',
      }}
      renderItem={renderItem}
      keyExtractor={item => item.answer.text}
      ListEmptyComponent={<Text>ListEmptyComponent</Text>}
    />
  );
};

export default ResultList;
