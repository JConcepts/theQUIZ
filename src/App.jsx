import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import FlashMessage from 'react-native-flash-message';

import store from './store';

import AppNavigator from './navigation/AppNavigator';

const App = () => {
  // useEffect(() => {

  // });

  return (
    <Provider store={store}>
      <StatusBar />
      <SafeAreaView />
      <AppNavigator />
      <FlashMessage position={'top'} duration={4000} />
    </Provider>
  );
};

export default App;
