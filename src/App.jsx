import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Router from './router';
import {Provider} from 'react-redux';
import {store} from './pages';
import {useSelector} from 'react-redux';
import {Background, Loading} from './components';
import FlashMessage from 'react-native-flash-message';

const MainApp = () => {
  const stateGlobal = useSelector(state => state);
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {stateGlobal.loading && <Loading />}
      {stateGlobal.infoModal && <Background />}
    </>
  );
};
const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
