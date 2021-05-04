import {FETCH_VIDEO_LIST,SIGN_OUT} from '../actions/FetchVideoList'

const initalState={
    videoList:[]
}

export default (state = initalState,action)=>{
    switch(action.type){
        case FETCH_VIDEO_LIST:
            //console.log(action.videoList)
            return{
                ...state,
                videoList:action.videoList
            }
        case SIGN_OUT:
            return{
                ...state,
                videoList:[]
            }
        default:
            return state;
    }
    return state;
}