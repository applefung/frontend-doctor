import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, ScrollView, StyleSheet, Button, KeyboardAvoidingView} from 'react-native';
import Input from "./Input";
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

const Login = (props)=>{
    const dispatch = useDispatch();

    return (
        <KeyboardAvoidingView style={{flex:1,alignItems:'center'}} behavior="padding" keyboardVerticalOffset={5} >
           
            <View style={styles.LogInBox}>
                <ScrollView>
                    <View style={{justifyContent:'center',alignItems:'center',margin:10}}>
                        <Text style={{fontFamily:'antfill',fontWeight:'bold',padding:1,fontSize:20}}> Login</Text>
                    </View>
                    <Input 
                        style={styles.InputStyle}
                        id='email'
                        label="E-Mail"
                        keyboardType='email-address' 
                        email
                        required 
                        autoCapitalize="none" 
                        errorText="Please enter a valid email address"
                        onInputChange={props.inputChangeHandler} 
                        initalValue=""
                        returnKeyType='next'
                        />
                    <Input 
                        style={styles.InputStyle}
                        id='password'
                        label="Password"
                        keyboardType='default'
                        secureTextEntry
                        required 
                        minLength={5} 
                        autoCapitalize="none" 
                        errorText="Please enter a valid password"
                        onInputChange={props.inputChangeHandler} 
                        initalValue=""
                        />
                        
                    <View style={styles.ButtonStyle}>
                        { props.isLoading ? (<ActivityIndicator size="large" color="red" /> ) : (
                          <Button title={!props.isLogin ? "Login" : "Sign up"} disabled={!props.valid} onPress={props.authHandler}/> )
                        }
                          <Button 
                            title={`Switch to ${props.isLogin ? "Login" : "Sign Up"} `} 
                            onPress={props.Logined} />
                    </View>
                </ScrollView>
            </View>
       
    </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    LogInBox: {
        width: '80%',
        maxWidth: 400,
        padding:20,
        maxHeight:400,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
      },
    InputStyle: {
        height: 30,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginVertical: 10
    },

    ButtonStyle:{
        margin:10
    },
    Gradients:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
});

export default Login;