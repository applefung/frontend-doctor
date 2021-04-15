import {VERIFY_LOGIN,AUTHENTICATE} from '../actions/Login';


const initalState ={
    Jwt: "",
    DoctorUserEmail: "",
    DoctorUserId: -1,
    DoctorInfoId: -1,
    ExpiryDate: "",
}

export default (state = initalState ,action) =>{
    switch(action.type)
    {
        case AUTHENTICATE:
            return{
                jwt: action.jwt,
                userId: action.userId,
                patientUserId:action.patientUserId
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
        default: return state;
    }
    
    return state;
}