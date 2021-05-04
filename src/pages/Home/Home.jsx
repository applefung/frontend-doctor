import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, Image, AsyncStorage, StyleSheet, TouchableOpacity,Dimensions,ImageBackground} from 'react-native';
import CurvedHeader from '../../UI/CurvedHeader'
import Icon from 'react-native-vector-icons/FontAwesome';
import DoctorCard from '../../components/DoctorCard'
import FriendList from '../FriendList/FriendList'
import VideoLobby from '../VideoConference/VideoLobby'
import  moment from 'moment';
import 'moment/locale/pt-br';
import { useDispatch, useSelector } from 'react-redux';
import * as LoginAction from '../../store/actions/Login'
import { ActivityIndicator } from 'react-native-paper';
import * as friendListActions from "../../store/actions/FriendList";
import {withNavigationFocus} from 'react-navigation';
const Home = (props)=> {
    const dispatch = useDispatch();
    const [loading,setLoading]= useState(false);
    const doctorId = useSelector(state=>state.Login.DoctorUserId);
    const availableFriendList = useSelector (state=>state.FriendList.GetFriendList)

    const navToHome=()=>{
        //props.navigation.navigate("Home")
        setCurrentPage(0)
    }
    const navToFriendList=()=>{
        //props.navigation.navigate("FriendList")
        setCurrentPage(1)
    }
    const navToVideoLobby=()=>{
        //props.navigation.navigate("VideoLobby")
        setCurrentPage(2)
    }

    const[currentPage,setCurrentPage]=useState(0)

    useEffect(()=>{
        const fectchDoctor = async()=>{
            
            try{
                setLoading(true)
                await dispatch(LoginAction.fetchOneDoctor(doctorId))
                await dispatch(LoginAction.fetchBooking(doctorId))
                
            }
            catch(error){
                console.log(error)
            }
            setLoading(false)

        }
        fectchDoctor();
        // if(currentPage == 1 && props.isFocused){
                
        //     dispatch(friendListActions.fetchFriendList(doctorId));
        // }
    },[props.isFocused])



    const paging =()=>{
        //console.log(currentPage)
        switch(currentPage){
            case 0 : return loading?<ActivityIndicator style={{flex:10,padding:33}}/>:<DoctorCard navigation={props.navigation} currentPage={currentPage}/>
            case 1 : return loading?<ActivityIndicator style={{flex:10,padding:33}}/>:<FriendList  navigation={props.navigation} currentPage={currentPage} doctorId={doctorId} availableFriendList={availableFriendList}/>
            case 2 : return loading?<ActivityIndicator style={{flex:10,padding:33}}/>:<VideoLobby  navigation={props.navigation} currentPage={currentPage}/>
            
            default : return null
        }
    }

    return (
        <View style={{flex:1,backgroundColor:'#eaeaea',justifyContent:'center',alignItems:'center',opacity:0.8}}>
            <ImageBackground resizeMode='stretch' style={styles.image} source={require('../../../assets/background.jpg')} >
           {/* <CurvedHeader customStyles={styles.svgCurve} /> */}
           
            <Text style={{fontSize:30,marginTop:50,fontWeight:'bold'}}>{moment().format('YYYY/MM/DD')}</Text>
           
           <View style={{flex:0.5,flexDirection:'row',marginTop:30}}>
                <TouchableOpacity onPress={navToHome} style={{}}><Icon name="home" size={40} color="grey"/></TouchableOpacity>
                <TouchableOpacity onPress={navToFriendList} style={{marginLeft:50,marginRight:50}}><Icon name="comments" size={35} color="grey"/></TouchableOpacity>
                <TouchableOpacity onPress={navToVideoLobby} style={{}}><Icon name="camera" size={40} color="grey"/></TouchableOpacity>    
            </View>
            </ImageBackground>
           {
           
           paging()}
           
           
            
           
        </View>
    );
}


Home.navigationOptions={
    headerShown:false
  }
  

 const styles = StyleSheet.create({
    svgCurve: {
        position: 'absolute',
        color:'red',
        width: Dimensions.get('window').width,
        height:'100%'
      },
      image:{
        flex:3,
        justifyContent:'center',
        alignItems:'center',
        width: '100%',
        height:'100%'
      }
    
 }); 

export default withNavigationFocus(Home);