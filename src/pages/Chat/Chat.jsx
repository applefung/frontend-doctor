import React, {useState, useEffect, useCallback, useRef} from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';

const Chat = (props) => {
    const [messages, setMessages]=useState([]);
    const [user, setUser]=useState(null);

    const socket = useRef(null);
    // const socket = SocketIOClient('http://192.168.8.5:3000');

    const doctorInfoId = 1;
    const patientUserSocketId = props.navigation.state.params.patientUserSocketId;
    const patientUserId = props.navigation.state.params.patientUserId;
// http://ec2-3-135-17-82.us-east-2.compute.amazonaws.com
// 192.168.0.130
    useEffect(() => {
        socket.current = new SocketIOClient('http://192.168.8.5:3000');

        socket.current.on('connect', () => {
            const createUser = {"_id": socket.current.id};
            setUser(createUser)
            socket.current.emit('userJoined',  {"message": messages[0], "doctorInfoId": 1, "patientUserId":patientUserId, "patientUserSocketId": patientUserSocketId, "userType": "doctor"});
            socket.current.on('userJoined', (userId) => {
              console.log(userId)
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
        socket.current.emit('message',  {"message": messages[0], "doctorInfoId": doctorInfoId, "patientUserId": patientUserId, "patientUserSocketId": patientUserSocketId, "userType": "doctor"});
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={user}
        />
    );
      
    


}
export default Chat;