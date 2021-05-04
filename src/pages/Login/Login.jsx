import React, { Component, useEffect, useRef } from 'react';
import { SafeAreaView,View,StyleSheet,Image,TouchableOpacity,Text,Dimensions,ImageBackground, Alert} from 'react-native';
import { TextInput } from 'react-native-paper';
import { useState } from 'react';
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import * as LoginActions from '../../store/actions/Login';

const Login = (props) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const ref2 = useRef();
  const [error,setError] = useState({type:null,text:null});
  const [userInput,setUserInput] = useState({
    username:"",
    password:""
  })

  const Auth = async ()=>{
    try{

      await dispatch(LoginActions.verifyLogin(userInput));

      props.navigation.navigate("Main")
    }
    catch(error){
      Alert.alert("Invalid Email/Password")
    }}

    const navToRegister=()=>{
        props.navigation.navigate("Register")
        //setCurrentPage(1)
    }
    const navToVideoLobby=()=>{
        //props.navigation.navigate("VideoLobby")
        //setCurrentPage(2)
    }

  useEffect(()=>{
    
    ref2.current.zoomIn();
      return()=>{ref2.current.fadeOut()}
    
    },[])



  const setInput= (type,text)=>{
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let updateUserInput={...userInput};
    switch(type){
      case "username":{
          
          if(text && !emailRegex.test(text.toLowerCase()))
            setError({...error,type:"username",text:"Please Enter a valid email"})
          else
            setError({type:null,text:null});

          updateUserInput={...updateUserInput,username:text}
          break;
      }
      case "password":{
        if(text && text.trim().length < 6)
            setError({...error,type:"password",text:"Please Enter a valid password"})
          else
            setError({type:null,text:null});
   

        updateUserInput={...updateUserInput,password:text}
          break;
      }
      default : return;
    }
    
    setUserInput(updateUserInput);

  }


  return ( 
    <View style={{flex:1,backgroundColor:'#eeeeee'}}>
      <View style={{flex:4,backgroundColor:'white'}}>
        
      <ImageBackground resizeMode='cover' style={styles.image,{justifyContent:'center',opacity:0.8,height:"100%",borderBottomRightRadius:100}} source={require('../../../assets/background.jpg')} >
        <Text style={{textAlign:'center',fontSize:30,opacity:1}}>Welcome</Text>
      </ImageBackground>
        
        
        
      </View>
      <Animatable.View ref={ref2} duration={2000} style={{flex:2}}>

          <TextInput 
            style={styles.Input}
            theme={{ colors: { primary: "#00d3c2" } }}
            mode='outlined'
            label="YourName"
            value={userInput.username}
            onChangeText={(e)=>setInput("username",e)}/>
            <Text  style={{paddingHorizontal:20,color:'red'}}>{error.type==='username'?error.text:null}</Text>

          <TextInput 
            style={styles.Input}
            theme={{ colors: { primary: "#00d3c2" } }}
            mode='outlined'
            label="YourPassword"
            value={userInput.password}
            onChangeText={(e)=>setInput("password",e)}/>
            <Text style={{paddingHorizontal:20,color:'red'}}>{error.type==='password'?error.text:null}</Text>

            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center', marginTop:20}}>
                <TouchableOpacity onPress={navToRegister} style={{marginRight:50,alignItems:'center'}}>
                  <Icon name="registered" size={40} color="grey"/>
                  <Text style={{color:'grey'}}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={Auth} style={{alignItems:'center'}}>
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
  image:{
    position:'absolute',
    width: Dimensions.get('window').width,
    borderRadius:500,
    //borderBottomStartRadius:100

  }
});
 
export default Login;