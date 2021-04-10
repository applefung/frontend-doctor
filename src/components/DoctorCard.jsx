import React, {useState, useEffect, useCallback,useRef} from 'react';
import { View, Text, Image, AsyncStorage, StyleSheet, TouchableOpacity,Dimensions} from 'react-native';
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/FontAwesome';


const DoctorCard = (props) => {
    const ref = useRef();

    useEffect(()=>{
        ref.current.slideInLeft();
        return()=>{ref.current.fadeOut()}
    },[props.currentPage])

    return (
        
        <Animatable.View ref={ref} style={{flex:10,padding:33,opacity:1,alignItems:'center',justifyContent:'flex-start'}}>
            <View style={styles.cardStyle}>
                <Text style={{fontWeight:'bold',fontSize:15}}>Doctor Chan`s Detail Card</Text>
                <Icon name="user-md" size={350} color="grey" />
                <View style={{flexDirection:'row',flex:1}}>
                    <View style={styles.expertStyle}><Text style={{fontSize:20,fontWeight:'bold'}}>Doctor chan</Text></View>
                    <View style={styles.expertStyle}><Text style={{fontSize:20,fontWeight:'bold'}}>Spec</Text></View>
                    <View style={styles.expertStyle}><Text style={{fontSize:20,fontWeight:'bold'}}>District</Text></View>
                </View>
            </View>        
        </Animatable.View>
        

     );


     
}

const styles = StyleSheet.create({
    cardStyle:{
        alignItems:'center',
        flexDirection:'column',
        height:"80%",
        width:'100%',
        shadowColor: "black",
        shadowOffset: {
            width: 20,
            height: 20,
        },
        shadowOpacity: 0.7,
        shadowRadius: 3.84,
        borderRadius:30,
        backgroundColor:'white',
        elevation: 5,

    },
    expertStyle:{
        alignItems:'center',
        textAlign:'center',
        justifyContent:'center',
        flexDirection:'column',
        height:"60%",
        width:'30%',
        margin:8,
        shadowColor: "grey",
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 0.55,
        shadowRadius: 3.84,
        borderRadius:30,
        backgroundColor:'#F8F8F8',
        elevation: 5,

    }
});
 
export default DoctorCard;