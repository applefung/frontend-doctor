import Conversation from '../../models/conversation';
export const FETCH_FRIEND_LIST = 'FETCH_FRIEND_LIST';

const fetchFriendList = ()=> {
    return async dispatch =>{
        const response = await fetch('http://ec2-3-135-17-82.us-east-2.compute.amazonaws.com:8080/friendList?doctorInfoId=1', //
        {
            method: 'GET',
        })
        .then(response => response.json())
        .then(resData => {
            const loadedFriendList =[];
            for(const key in resData)
            {
                loadedFriendList.push(
                    new Conversation(
                        resData[key].conversation_id,
                        resData[key].patient_user_id,
                        resData[key].doctor_info_id,
                        resData[key].patient_user_socket_id,
                        resData[key].doctor_user_socket_id,
                        resData[key].conversation_content,
                        resData[key].patientUser,
                    )
                )
            }

            dispatch({
                type: FETCH_FRIEND_LIST,
                friendList: loadedFriendList
            })
        })
        .catch(
            (error) => console.error(error)
        )
    };
}

export {fetchFriendList};
