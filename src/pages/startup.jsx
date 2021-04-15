import React, { Component, useEffect } from 'react';
import { View, ActivityIndicator,StyleSheet,AsyncStorage } from 'react-native';
import * as authActions from '../store/actions/Login'
import { useDispatch } from 'react-redux';

const StartUpPage = (props) => {
    const dispatch = useDispatch();

    useEffect(()=>{
        const tryLogin = async ()=>{
            const userData = await AsyncStorage.getItem('userData');
            console.log(userData)
            if(userData===null){
                props.navigation.navigate('Login')
                console.log("adasdas")
                return;
            }
            const transformData = JSON.parse(userData);
            const {jwt,userId,patientUserId} = transformData;
        
        props.navigation.navigate('Main')
        dispatch(authActions.authenticate(jwt,userId,patientUserId));
        
        }
        
        tryLogin();
        
    },[dispatch])

    return ( 
        <View style ={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large" />
        </View>

     );
}
 
export default StartUpPage;