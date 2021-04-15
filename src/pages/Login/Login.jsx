import React, { Component, useEffect, useRef } from 'react';
import { SafeAreaView,View,StyleSheet,Image,TouchableOpacity,Text} from 'react-native';
import { TextInput } from 'react-native-paper';
import { useState } from 'react';
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/FontAwesome';
const Login = () => {
  const ref = useRef();
  const ref2 = useRef();
  const [userInput,setUserInput] = useState({
    username:"",
    password:""
  })

  const navToHome=()=>{
    props.navigation.navigate("Home")
    //setCurrentPage(0)
    }
    const navToFriendList=()=>{
        props.navigation.navigate("FriendList")
        //setCurrentPage(1)
    }
    const navToVideoLobby=()=>{
        //props.navigation.navigate("VideoLobby")
        //setCurrentPage(2)
    }

  useEffect(()=>{
    ref.current.zoomIn();
    ref2.current.zoomIn();
      return()=>{ref.current.fadeOut()}
    },[])

  return ( 
    <View style={{flex:1,backgroundColor:'#eeeeee'}}>
      <View style={{flex:4,backgroundColor:'#00d3c2',borderBottomEndRadius:100,borderBottomStartRadius:100}}>
        <Animatable.View ref={ref} duration={2000} sytle={{flexDirection:'column'}}>
            <Image resizeMode='contain' style={{width:'100%',height:'100%'}} source={require('../../../assets/logo.png')} />
        </Animatable.View>
        
      </View>
      <Animatable.View ref={ref2} duration={2000} style={{flex:2}}>
          <TextInput 
            style={styles.Input}
            theme={{ colors: { primary: "#00d3c2" } }}
            mode='outlined'
            label="YourName"
            value={userInput.username}
            onChangeText={text => setUserInput({...userInput,username:text})}/>
          <TextInput 
            style={styles.Input}
            theme={{ colors: { primary: "#00d3c2" } }}
            mode='outlined'
            label="YourPassword"
            value={userInput.password}
            onChangeText={text => setUserInput({...userInput,password:text})}/>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center', marginTop:20}}>
                <TouchableOpacity onPress={navToHome} style={{alignItems:'center'}}>
                  <Icon name="question" size={40} color="grey"/>
                  <Text style={{color:'grey'}}>Forget</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navToFriendList} style={{marginLeft:50,marginRight:50,alignItems:'center'}}>
                  <Icon name="registered" size={40} color="grey"/>
                  <Text style={{color:'grey'}}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navToVideoLobby} style={{alignItems:'center'}}>
                  <Icon name="sign-in" size={40} color="grey"/>
                  <Text style={{color:'grey'}}>Login</Text>
                </TouchableOpacity>    
            </View>
      </Animatable.View>
    </View>

   );
}

const styles = StyleSheet.create({
  Input:{
    marginTop:20,
    paddingHorizontal:20,

  },
});
 
export default Login;