import React, { Component, useEffect, useRef } from 'react';
import { SafeAreaView,View,StyleSheet,Image,TouchableOpacity,Text,Alert} from 'react-native';
import { TextInput, Button,Paragraph, Dialog, Portal,RadioButton,ActivityIndicator } from 'react-native-paper';
import { useState } from 'react';
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import * as LoginActions from '../../store/actions/Login';
import { ScrollView } from 'react-native-gesture-handler';

const Register = (props) => {

  const dispatch = useDispatch();
  const ref = useRef();
  const ref2 = useRef();
  const [timer,setTimer] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [id,setId]=useState();
  const [isAble,setIsAble]=useState(false);
  const [loading,setLoading]=useState(false);
  const [error,setError] = useState({type:null,text:null});
  const [visible, setVisible] = React.useState(false);
  const [userInput,setUserInput] = useState({
    username:"",
    password:"",
    preferedEnglishName:"",
    preferedChineseName:"",
    address:"",
    specialty:"",
    confirmPassword:"",
    verficationCode:"",
    district:"Mong Kok"
  })


    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const Auth = async ()=>{
        try{
        setLoading(true)
        await dispatch(LoginActions.registerApply(userInput));
        setLoading(false)
        props.navigation.navigate("Login")
        }
        catch(error){
          Alert.alert('an error occurred',error.message,[{text : 'Okay!'}])
          setLoading(false)
      
    }}

    const change=()=>{
        setIsActive(true)
        setTimer((prevState)=> prevState-1)
    }



    const navToLogin=()=>{
        props.navigation.navigate("Login")
        
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

    useEffect(()=>{
        if(timer ===0){
            //console.log(timer)
            setIsActive(false)
            clearInterval(id)
            setTimer(5)
        }
        if(error.type!=null || (userInput.username.trim().length == 0) || (userInput.password.trim().length == 0) || (userInput.verficationCode.trim().length == 0) || (userInput.confirmPassword.trim().length == 0))
            {setIsAble(false);console.log("false")}
        else 
        {setIsAble(true);console.log("true")}
    },[timer,error,isAble])

  const verficationSend = async  ()=>{
        setId( setInterval(() => {
          change("myInterval")
        }, 1000)
      )
      try{
          
        await dispatch(LoginActions.registerVerficationSend(userInput));

        
        Alert.alert('The email has been sent') 
        
      }
      catch(error){
        Alert.alert('an error occurred',error.message,[{text : 'Okay!'}])   
      }
      
  }



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
      case "confirmPassword":{
          console.log(text.trim(),userInput.password.trim())
        if(text && (text.trim()!==userInput.password.trim()))
            setError({...error,type:"confirmPassword",text:"Two passwords are not match"})
        else
            setError({type:null,text:null});

        updateUserInput={...updateUserInput,confirmPassword:text}
        
        break;

      }
      case "verficationCode":{
        console.log(text.trim())
        updateUserInput={...updateUserInput,verficationCode:text}
        if(text && text.trim().length !== 6 )
          setError({...error,type:"verficationCode",text:"Please enter valid Verfication code"})
        else
          setError({type:null,text:null})
        break;
      }
      default : return;
    }
    
    setUserInput(updateUserInput);

  }


  return (
    <View style={{flex:1,backgroundColor:'#eeeeee'}}>
        <View style={{flex:3,backgroundColor:'#00d3c2',borderBottomEndRadius:100,borderBottomStartRadius:100}}>
            <Animatable.View ref={ref} duration={2000} sytle={{flexDirection:'column'}}>
                <Image resizeMode='contain' style={{width:'100%',height:'100%'}} source={require('../../../assets/logo.png')} />
            </Animatable.View>
        </View>

        <View style={{flex:10}}>
            <ScrollView bounces={false} contentContainerStyle={{backgroundColor:'#eeeeee',flexGrow:1}}>
        
                <Animatable.View ref={ref2} duration={2000} style={{flex:2}}>

                    <TextInput 
                        style={styles.Input}
                        theme={{ colors: { primary: "#00d3c2" } }}
                        mode='outlined'
                        label="YourEmail"
                        value={userInput.username}
                        onChangeText={(e)=>setInput("username",e)}/>
                        {error.type=='username'?<Text style={{paddingHorizontal:20,color:'red'}}>{error.text}</Text>:null}

                    <View style={{flexDirection:'row',paddingHorizontal:20,marginTop:20}}>
                        <TextInput 
                            style={styles.Input,{flex:1,paddingRight:20}}
                            theme={{ colors: { primary: "#00d3c2" } }}
                            mode='outlined'
                            label="Prefer English Name"
                            value={userInput.preferedEnglishName}
                            onChangeText={(e)=>setUserInput({...userInput,preferedEnglishName:e})}/>
                            

                        <TextInput 
                            style={styles.Input,{flex:1}}
                            theme={{ colors: { primary: "#00d3c2" } }}
                            mode='outlined'
                            label="Prefer Chinese Name"
                            value={userInput.preferedChineseName}
                            onChangeText={(e)=>setUserInput({...userInput,preferedChineseName:e})}/>
                    </View>

                    <TextInput 
                        style={styles.Input}
                        theme={{ colors: { primary: "#00d3c2" } }}
                        mode='outlined'
                        label="password"
                        value={userInput.password}
                        onChangeText={(e)=>setInput("password",e)}/>
                        {error.type=='password'?<Text style={{paddingHorizontal:20,color:'red'}}>{error.text}</Text>:null}

                    <TextInput 
                        style={styles.Input}
                        theme={{ colors: { primary: "#00d3c2" } }}
                        mode='outlined'
                        label="confirmPassword"
                        value={userInput.confirmPassword}
                        onChangeText={(e)=>setInput("confirmPassword",e)}/>    
                        {error.type=='confirmPassword'?<Text style={{paddingHorizontal:20,color:'red'}}>{error.text}</Text>:null}
                    <View style={{paddingTop:20,alignItems:'center'}}>
                      <Button style={{width:'90%'}} labelStyle={{fontWeight:'bold',fontSize:15}} color='#00d2c3' mode="contained" onPress={showDialog}>{userInput.district}</Button>
                    </View>
                        
                    <Portal>
                      <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Please Select Your District</Dialog.Title>
                        <Dialog.Content style={{color:'red'}}>
                        <RadioButton.Group onValueChange={value => setUserInput({...userInput,district:value})} value={userInput.district}>
                          <RadioButton.Item label="Mong Kok" value="Mong Kok" />
                          <RadioButton.Item label="Yeun Long" value="Yeun Long" />
                          <RadioButton.Item label="Lantau Island" value="Lantau Island" />
                        </RadioButton.Group>
                        </Dialog.Content>
                        <Dialog.Actions>
                          <Button onPress={hideDialog}>Done</Button>
                        </Dialog.Actions>
                      </Dialog>
                    </Portal>


                    <TextInput 
                        style={styles.Input}
                        theme={{ colors: { primary: "#00d3c2" } }}
                        mode='outlined'
                        label="address"
                        value={userInput.address}
                        onChangeText={(e)=>setUserInput({...userInput,address:e})}/>
                        
                        
                    <TextInput 
                        style={styles.Input}
                        theme={{ colors: { primary: "#00d3c2" } }}
                        mode='outlined'
                        label="specialty"
                        value={userInput.specialty}
                        onChangeText={(e)=>setUserInput({...userInput,specialty:e})}/>
                    
                    

                    <View style={{flexDirection:'row',paddingHorizontal:20,marginTop:20}}>
                        <TextInput 
                        style={{width:'85%'}}
                        theme={{ colors: { primary: "#00d3c2" } }}
                        mode='outlined'
                        label="Verfication Code"
                        value={userInput.verficationCode}
                        onChangeText={(e)=>setInput("verficationCode",e)}/>
                        <Button onPress={verficationSend} style={{flexDirection:'column',justifyContent:'flex-end'}}>{isActive?timer:"Send"}</Button>
                    </View>
                    {error.type=='verficationCode'?<Text style={{paddingHorizontal:20,color:'red'}}>{error.text}</Text>:null}
                    
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center', marginBottom:20,marginTop:20}}>

                            <TouchableOpacity onPress={navToLogin} style={{marginRight:50,alignItems:'center'}}>
                                <Icon name="sign-in" size={40} color="grey"/>
                                <Text style={{color:'grey'}}>Login</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={Auth} disabled={!isAble} style={{alignItems:'center'}}>
                              {loading?<ActivityIndicator/>:<View>
                                <Icon name="registered" size={40} color="grey" style={isAble?{opacity:1}:{opacity:0.2},{paddingHorizontal:5}}/>
                                <Text style={{color:'grey'}}>Register</Text></View>}
                            </TouchableOpacity>    
                        </View>
                </Animatable.View>
            </ScrollView>
        </View>
    </View>
   

   );
}

const styles = StyleSheet.create({
  Input:{
    marginTop:20,
    paddingHorizontal:20,

  },
});
 
export default Register;