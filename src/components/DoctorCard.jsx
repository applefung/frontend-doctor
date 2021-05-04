import React, {useState, useEffect, useCallback,useRef} from 'react';
import { View, Image, AsyncStorage, StyleSheet, TouchableOpacity,Dimensions,FlatList} from 'react-native';
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { ActivityIndicator,Divider,Text } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import { LinearGradient } from "expo-linear-gradient";
import { color } from 'react-native-reanimated';

const DoctorCard = (props) => {
    const ref = useRef();
    const doctorInfo = useSelector(state=>state.Login.doctorInfo);
    const doctorCheck = useSelector(state=>state.Login.booking);
    useEffect(()=>{
        ref.current.slideInLeft();
        return()=>{ref.current.fadeOut()}
    },[props.currentPage])

    return (
        
        <Animatable.View ref={ref} style={{flex:10,padding:33,opacity:1,alignItems:'center',justifyContent:'flex-start'}}>
            {doctorInfo?
            <View style={styles.cardStyle}>
                <LinearGradient colors={["#8f6B29", "#FDE08D", "#DF9F28"]} style={{flexDirection:'row',height:'100%',width:'100%',borderRadius:30}}>
                    <Icon name="user-md" size={100} style={{paddingVertical:30,paddingHorizontal:10}}color="grey" />
                    <View style={{flexDirection:'column',flex:1}}>
                        <Text numberOfLines={1} style={{fontWeight:'bold',fontSize:15}}> {doctorInfo.name_en}</Text>
                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            <Text style={{fontSize:25,fontWeight:'bold',paddingVertical:40}}>0000-0000-000{doctorInfo.doctor_info_id}</Text>
                        </View>
                        <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
                            <View style={{flexDirection:'column'}}>
                                <Text numberOfLines={1} style={{fontSize:15,fontWeight:'bold',color:'grey'}}>{doctorInfo.name_cn}</Text>
                                <Text style={{fontSize:15,fontWeight:'bold',color:'grey'}} >{doctorInfo.specialty_en} </Text>
                                <Text style={{fontSize:15,fontWeight:'bold',color:'grey'}}>{doctorInfo.district_en}</Text>
                                
                            </View>
                        </View>    
                    </View>
                </LinearGradient>
            </View>
            :<ActivityIndicator/>  
            }
            <View style={{flex:1,paddingVertical:35,width:Dimensions.get('window').width}}>
                <Text style={{margin:10,fontSize:20,fontWeight:'bold'}}>Today Booking</Text>
                <FlatList
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    data={doctorCheck}
                    renderItem={item=>(
                                        <View key={item.item.booking_id}>
                                            <View style={styles.bookingCardStyle}>
                                                <View style={{flexDirection:'column',marginLeft:10,flex:1}}>
                                                    <Text style={{fontSize:20,fontWeight:'bold'}}>{item.item.booking_time}</Text>
                                                    <Text style={{fontSize:10}}>{item.item.type?"Online":"Face-To-Face"}</Text>
                        
                                                </View>
                                               
                                                <View style={{flexDirection:'column',alignItems:'flex-end'}}>
                                                    <Text style={{marginRight:10,fontWeight:'bold', fontSize:20}}>{item.item.patientUser.name_en}</Text>
                                                    <Text style={{marginRight:10, fontSize:12}}>Remark: {item.item.remark}</Text>
                                                </View>
                                            </View>
                                            <Divider inset={true} style={{backgroundColor:'black',paddingLeft:-40,width:'100%',alignItems:'flex-end'}}/>
                                        </View>
                                        )}
                    keyExtractor={(item)=>item.booking_id.toString()}
                />
                
            </View>
            
            
        </Animatable.View>
        

     );


     
}

const styles = StyleSheet.create({
    cardStyle:{
        alignItems:'center',
        flexDirection:'row',
        height:"30%",
        width:'100%',
        shadowColor: "black",
        shadowOffset: {
            width: 20,
            height: 20,
        },
        shadowOpacity: 0.7,
        shadowRadius: 3.84,
        borderRadius:30,
        
        elevation: 5,

    },
    expertStyle:{
        alignItems:'center',
        textAlign:'center',
        justifyContent:'center',
        flexDirection:'column',
        height:"40%",
        width:'25%',
        margin:8,
        shadowColor: "grey",
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 0.55,
        shadowRadius: 3.84,
        borderRadius:50,
        backgroundColor:'#eee',
        elevation: 5,

    },
    bookingCardStyle:{
        alignItems:'flex-start',
        flex:1,
        width:'100%',
        justifyContent:'flex-start',
        flexDirection:'row',
        marginVertical:20,
        
    }
});
 
export default DoctorCard;