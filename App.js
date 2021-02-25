import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Chat from "./src/pages/Chat/Chat";
import FriendList from "./src/pages/FriendList/FriendList";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import GetFriendListReducer from './src/store/reducers/FriendList'
import FunctionsNavigator from './src/navigation/functionNavigator';

const rootReducer = combineReducers({
  FriendList: GetFriendListReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
        
        <FunctionsNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});
