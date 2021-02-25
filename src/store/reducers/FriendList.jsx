import {FETCH_FRIEND_LIST} from '../actions/FriendList';

const initalState ={
    GetFriendList:[],
}

export default (state = initalState ,action) =>{
    switch(action.type)
    {
        case FETCH_FRIEND_LIST:
            return{
                ...state,
                GetFriendList: action.friendList
            };
    }
    
    return state;
}