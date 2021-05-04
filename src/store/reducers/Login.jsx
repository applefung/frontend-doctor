import {VERIFY_LOGIN,AUTHENTICATE,FETCH_ONE_DOCTOR,FETCH_BOOKING,SIGN_OUT} from '../actions/Login';


const initalState ={
    Jwt: "",
    DoctorUserEmail: "",
    DoctorUserId: -1,
    DoctorInfoId: -1,
    ExpiryDate: "",
    doctorInfo:null,
    booking:null
}

export default (state = initalState ,action) =>{
    switch(action.type)
    {
        case AUTHENTICATE:
            console.log("doctorUserId reducer",action.doctorUserId)
            return{
                ...state,
                jwt: action.jwt,
                DoctorUserEmail: action.userEmail,
                DoctorUserId:action.doctorUserId,
            };
        case VERIFY_LOGIN:
            console.log("login",action.doctorUserId)
            return{
                ...state,
                Jwt: action.jwt,
                DoctorUserEmail: action.doctorUserEmail,
                DoctorUserId: action.doctorUserId,
                ExpiryDate: action.expiryDate,
                DoctorInfoId: action.doctorInfoId
            };
        case FETCH_ONE_DOCTOR:
            console.log('recduer',action.doctorInfo.name_en)
            return{
                ...state,
                doctorInfo:action.doctorInfo,
           
            };
        case FETCH_BOOKING:
            
            return{
                ...state,
              
                booking:action.booking
            }
        case SIGN_OUT:
            
            return{
                ...state,
                Jwt: "",
                DoctorUserEmail: "",
                DoctorUserId: -1,
                DoctorInfoId: -1,
                ExpiryDate: "",
                doctorInfo:null,
                booking:null
                        }
        default: return state;
    }
    
    return state;
}