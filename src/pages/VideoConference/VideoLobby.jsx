import React, { Component, useState, useRef } from 'react';
import {
    SafeAreaView,
    Button,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    StatusBar,
    Image,
  } from 'react-native';
import VideoConference from './VideoConference' 
import { useDispatch, useSelector } from 'react-redux';
import * as videoActions from '../../store/actions/FetchVideoList'
import { useEffect } from 'react';
import {withNavigationFocus} from 'react-navigation';
import * as Animatable from 'react-native-animatable'

const VideoLobby = (props) => {
    const ref = useRef();
    const dispatch= useDispatch();
    const [isLoading, setIsLoading]=useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [isDoctor, setisDoctor] = useState(false);
    const Doctor_User = useSelector(state=>state.Login.DoctorUserId)
    const videolist = useSelector(state=>state.FetchVideoList.videoList)

    const fetchVideoList = async ()=>{
        try{
            setIsLoading(true)
            await dispatch(videoActions.fetchVideoList(Doctor_User))
        }
        catch(error){
            console.log(error)
        }
        setIsLoading(false)
        
    }

    useEffect(()=>{
        ref.current.slideInRight();
        if(props.currentPage==2){
          fetchVideoList();
          console.log("geerere")
        }
        
        return()=>ref.current.slideOutRight();
        

        
    },[dispatch,props.currentPage])

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
        return (
          <Item
            item={item}
            onPress={() => setSelectedId(item.booking_id)}
            style={{ backgroundColor}}
            
          />
        );
      };

      const Item = ({ item, onPress, style }) => (
        <TouchableOpacity onPress={()=>startVideo(item.room_id)} disabled={item.check} style={item.check?(styles.item):(styles.itemFalse)}>
          <View style={styles.cardStyle}>
                <Image style={styles.icon} resizeMode='contain' source={{ uri: 'data:image/png;base64,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' }} />
                <View style={{
                borderLeftColor: 'grey',
                borderLeftWidth: 1,
                width:"10%",
                height:"100%"
                }}/>    
                <Text style={styles.title}>{item.booking.booking_time}</Text>
            </View>
          
        </TouchableOpacity>
      );

      const startVideo=(roomId)=>{
        console.log(roomId)
        props.navigation.navigate({routeName: "VideoConferenceOneToOne", params: { id: roomId}});
    }


    return ( 
        <Animatable.View ref={ref} style={{flex:10,paddingVertical:33}}>
           <Text style={{fontSize:15,marginHorizontal:20}}>Today following Booking</Text>
           {isDoctor?
           <View><Text>No Booking</Text></View>:
           
            <FlatList
                data={videolist}
                renderItem={renderItem}
                keyExtractor={(item)=>item.booking_id.toString()}

            />
           }
            
        </Animatable.View>

     );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      width:'100%',
      height:90,
      marginVertical:10,
      opacity:0.2
    },
    itemFalse:{
      width:'100%',
      height:90,
      marginVertical:10,
      opacity:1
    },
    title: {
      fontSize: 32,
      width:'100%',
      textAlign:'left'
    },
    cardStyle:{
      padding:10,
      margin:10,
      alignItems:'center',
      flexDirection:'row',
      height:"90%",
      width:'90%',
      shadowColor: "black",
      shadowOffset: {
          width: 10,
          height: 20,
      },
      shadowOpacity: 0.7,
      shadowRadius: 3.84,
      borderRadius:30,
      backgroundColor:'white',
      elevation: 5,
  },
  icon: {
    width:"20%",
    height:"80%",
    margin:10,
    borderRadius:50,
    
},

  });
export default VideoLobby;