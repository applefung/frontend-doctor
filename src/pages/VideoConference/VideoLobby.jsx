import React, { Component, useState } from 'react';
import {
    SafeAreaView,
    Button,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    StatusBar
  } from 'react-native';
import VideoConference from './VideoConference' 
import { useDispatch, useSelector } from 'react-redux';
import * as videoActions from '../../store/actions/FetchVideoList'
import { useEffect } from 'react';
import {withNavigationFocus} from 'react-navigation';

const VideoLobby = (props) => {
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
        
            fetchVideoList();
    },[])

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
        return (
          <Item
            item={item}
            onPress={() => setSelectedId(item.booking_id)}
            style={{ backgroundColor }}
          />
        );
      };

      const Item = ({ item, onPress, style }) => (
        <TouchableOpacity onPress={()=>startVideo(item.room_id)} style={[styles.item, style]}>
          <Text style={styles.title}>{item.booking.booking_time}</Text>
        </TouchableOpacity>
      );

      const startVideo=(roomId)=>{
        console.log(roomId)
        props.navigation.navigate({routeName: "VideoConferenceOneToOne", params: { id: roomId}});
    }


    return ( 
        <SafeAreaView>
           {isDoctor?
           <View><Text>No Booking</Text></View>:
           
            <FlatList
                data={videolist}
                renderItem={renderItem}
                keyExtractor={(item)=>item.booking_id.toString()}

            />
           }
            
        </SafeAreaView>

     );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });
export default VideoLobby;