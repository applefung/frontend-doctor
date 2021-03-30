import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Chat from "./src/pages/Chat/Chat";
import FriendList from "./src/pages/FriendList/FriendList";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import GetFriendListReducer from './src/store/reducers/FriendList';
import LoginReducer from './src/store/reducers/Login';
import FetchVideoListReducer from './src/store/reducers/FetchVideoList'
import FunctionsNavigator from './src/navigation/functionNavigator';
import * as Font from 'expo-font';

const rootReducer = combineReducers({
  FriendList: GetFriendListReducer,
  Login: LoginReducer,
  FetchVideoList: FetchVideoListReducer

});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {

  useEffect(() => {
    const fetchFonts = async ()=>{
      return ( 
      await Font.loadAsync(
      'antoutline',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antoutline.ttf')
    ),
    
      await Font.loadAsync(
      'antfill',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antfill.ttf')
      ))
     }
     fetchFonts()
    },[])

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
