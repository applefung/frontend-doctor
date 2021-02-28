import React, {useState, useEffect, useCallback, useRef} from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';
import { useDispatch, useSelector } from 'react-redux';
import * as friendListActions from "../../store/actions/FriendList";
import { cos } from 'react-native-reanimated';

const Chat = (props) => {
    const dispatch = useDispatch();
    const [messages, setMessages]=useState([]);
    const [user, setUser]=useState(null);

    const socket = useRef(null);
    // const socket = SocketIOClient('http://192.168.8.5:3000');

    const doctorInfoId = props.navigation.state.params.DoctorInfoId;
    let roomId = props.navigation.state.params.roomId;
    const patientUserId = props.navigation.state.params.patientUserId;

    const availableFriendList = useSelector (state=>state.FriendList.GetFriendList)
    const conversationAccordingId = availableFriendList.find(conversation=>conversation.patient_user_id === patientUserId);

    useEffect(() => {
      dispatch(friendListActions.fetchFriendList(doctorInfoId));
    }, [dispatch]);


    useEffect(() => {
      if(conversationAccordingId !== null)
      {
        let conversationBody = reverseConversationBody(conversationAccordingId.conversation_content.message);
        setMessages(  previousMessages => 
          GiftedChat.append(previousMessages, conversationBody))
      }

        socket.current = new SocketIOClient('http://ec2-3-135-17-82.us-east-2.compute.amazonaws.com:3000');
        // http://ec2-3-135-17-82.us-east-2.compute.amazonaws.com
        // http://192.168.8.9

        socket.current.on('connect', () => {
            const createUser = {"_id": "doctor"+doctorInfoId};
            setUser(createUser)
            socket.current.emit('userJoined',  {"message": messages[0], "doctorInfoId": doctorInfoId, "patientUserId":patientUserId, "roomId": roomId, "userType": "doctor"});
            socket.current.on('userJoined', (userId) => {
              roomId = userId;

            });
            socket.current.on('message', (messages)=>{onReceivedMessage(messages)});
        })
    }, []);
    
    // Helper functions
    const storeMessages = (messagesStore) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messagesStore))
    }

     const onReceivedMessage =(messagesReceived) => {
       if(messagesReceived.from === "patient")
       {
        storeMessages(messagesReceived.message);
       }
      }
    
      function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }

    const onSend = useCallback((messages = []) => {
        messages._id = uuidv4();
        socket.current.emit('message',  {"message": messages[0], "doctorInfoId": doctorInfoId, "patientUserId": patientUserId, "roomId": roomId, "userType": "doctor"});
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    const reverseConversationBody = (messageObject)=> {
      let temp = [];
      for(let i=messageObject.length - 1; i>=0; i--)
      {
        temp.push(messageObject[i]);
      }
      return temp;
    }

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={user}
        />
    );
      
    


}
export default Chat;