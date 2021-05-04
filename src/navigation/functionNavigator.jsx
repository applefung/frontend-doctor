import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, Image, AsyncStorage, StyleSheet, TouchableOpacity, Button} from 'react-native';
import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import FriendList from "../pages/FriendList/FriendList";
import Chat from "../pages/Chat/Chat";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import VideoLobby from '../pages/VideoConference/VideoLobby';
import VideoConference from '../pages/VideoConference/VideoConference';
import VideoConferenceOneToOne from '../pages/VideoConference/VideoConferennceOneToOne'
import Startup from '../pages/startup'
import Register from '../pages/Login/Register'
import { useDispatch, useSelector } from 'react-redux';
import * as loginActions from '../store/actions/Login'
import * as loginActions1 from '../store/actions/FriendList'
import * as loginActions2 from '../store/actions/FetchVideoList'


const FunctionsNavigator = createStackNavigator({
  Home: Home,
  // FriendList:FriendList,
  // VideoLobby:VideoLobby,
  Chat:Chat,
  VideoConferenceOneToOne:VideoConferenceOneToOne

},                          
{
  mode:'modal',
  defaultNavigationOptions: {
      
       
      
      
  }
});

// const MessageNavigator = createStackNavigator({
//   FriendList: FriendList,
//   Chat: Chat,
// },                          
// {
//   mode:'modal',
//   defaultNavigationOptions: {
//       headerStyle:{
//           // backgroundColor: Colors.primaryColor
//       }
      
//   }
// });

// const LoginNavigator = createStackNavigator({
//   Login: Login,
  
//   },
//   {
//       mode:'modal',
//       defaultNavigationOptions: {
//           // headerStyle:{
//           //     backgroundColor: Colors.primaryColor
//           // }
          
//       }
//   }
// )

const VideoStackNavigator = createStackNavigator(
  {
      VideoLobby:VideoLobby,
      VideoConferenceOneToOne:VideoConferenceOneToOne
      //VideoConference:VideoConference
      
  }
  ,{
      mode:'modal',
     
      
  }
);

// const UserTabNavigator = createBottomTabNavigator(
//   {
//       Home:FunctionsNavigator,
//       Message: MessageNavigator,
//       VideoLobby:VideoStackNavigator
//   }
//   ,{
//       mode:'modal',
//   }
// );

const DrawerNavigator = createDrawerNavigator(
  {
      Main: FunctionsNavigator,
      Login :{
        screen:Login,
        navigationOptions:{
            drawerLabel: ()=>null

        },
      Logout:MainNavigator,
    }
  },
  {
    // initialRouteName: 'Home',
    contentOptions: {
      activeTintColor: '#333333',
    },
    contentComponent:   (props)  =>{
      const dispatch = useDispatch();
      const userInfo = useSelector (state=>state.Login);
      return (
        <View style={{flex:1, paddingTop:20}}>
            <View style={{flex:1}} forceInset={{top: 'always', horizonta:'never'}}>
              <View style={{flex:2,justifyContent:'flex-end'}}>
                  <View style={{marginTop:50,flex:1,justifyContent:'center',alignItems:'center'}}>
                      <View style={{
                          justifyContent:'center',
                          alignItems:'center',
                          width: '40%',
                          height: '100%',
                          borderRadius: 80,
                          backgroundColor:'#00d3c2',
                          overflow: 'hidden'}}>
                          <Image style={{width:'80%',height:'80%'}} source={{uri:'https://www.shareicon.net/data/512x512/2016/06/25/786536_people_512x512.png'}}></Image>
                      </View>
              
                        <Button
                        title="Logout"
                        onPress={()=>{
                          dispatch(loginActions.signOut());
                          
                          dispatch(loginActions2.signOut());
                          dispatch(loginActions1.signOut());
                          props.navigation.closeDrawer();
                          props.navigation.navigate('Login');}}
                        />
                      
                          
                  </View>
  
              </View>
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <View style={{ borderBottomColor: '#bdbdbd', borderBottomWidth: 1, width: '85%' }} />
              </View>
              <View style={{flex:8}}>
                  <DrawerItems {...props}/>
              </View>
          </View>
      </View>
      );
    }
  }
)

const drawerStyles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

const MainNavigator = createSwitchNavigator({
  Startup: Startup,
  Main: DrawerNavigator,
  Login: Login,
  Register: Register
})  


// export default createAppContainer(MainNavigator)
export default createAppContainer(MainNavigator);
