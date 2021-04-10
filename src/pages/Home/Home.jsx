import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, Image, AsyncStorage, StyleSheet, TouchableOpacity,Dimensions} from 'react-native';
import CurvedHeader from '../../UI/CurvedHeader'
import Icon from 'react-native-vector-icons/FontAwesome';
import DoctorCard from '../../components/DoctorCard'
import FriendList from '../FriendList/FriendList'
import VideoLobby from '../VideoConference/VideoLobby'
import  moment from 'moment';
import 'moment/locale/pt-br';

const Home = (props)=> {

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



    const paging =()=>{
        console.log(currentPage)
        switch(currentPage){
            case 0 : return <DoctorCard currentPage={currentPage}/>
            case 1 : return <FriendList  currentPage={currentPage}/>
            case 2 : return <VideoLobby currentPage={currentPage}/>
            
            default : return null
        }
    }

    return (
        <View style={{flex:1,backgroundColor:'#eaeaea',justifyContent:'center',alignItems:'center',opacity:0.8}}>
            
           <CurvedHeader customStyles={styles.svgCurve} />
           
            <Text style={{fontSize:30,marginTop:50,fontWeight:'bold'}}>{moment().format('YYYY/MM/DD')}</Text>
           
           <View style={{flex:0.5,flexDirection:'row',marginTop:30}}>
                <TouchableOpacity onPress={navToHome} style={{}}><Icon name="home" size={40} color="grey"/></TouchableOpacity>
                <TouchableOpacity onPress={navToFriendList} style={{marginLeft:50,marginRight:50}}><Icon name="comments" size={35} color="grey"/></TouchableOpacity>
                <TouchableOpacity onPress={navToVideoLobby} style={{}}><Icon name="camera" size={40} color="grey"/></TouchableOpacity>    
            </View>
            
           {paging()}
           
           
            
           
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
    
 }); 

export default Home;