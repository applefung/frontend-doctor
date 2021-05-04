import {FETCH_FRIEND_LIST,SIGN_OUT} from '../actions/FriendList';

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
        case SIGN_OUT:
            return{
                ...state,
                GetFriendList:[]
            }
        default: return state
    }
    
    return state;
}