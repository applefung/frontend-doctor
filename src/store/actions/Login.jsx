import DoctorUser from '../../models/doctorUser';
import jwt_decode from 'jwt-decode';
import { AsyncStorage } from "react-native";
import  moment from 'moment';
export const VERIFY_LOGIN = 'VERIFY_LOGIN';
export const VERFICATION_SEND = 'VERFICATION_SEND';
export const AUTHENTICATE='AUTHENTICATE';
export const REGISTER='REGISTER';
export const FETCH_ONE_DOCTOR='FETCH_ONE_DOCTOR';
export const FETCH_BOOKING='FETCH_BOOKING';
export const SIGN_OUT="SIGN_OUT";
const verifyLogin = (userObject)=> {
    return async dispatch =>{
        const response = await fetch('http://ec2-3-135-17-82.us-east-2.compute.amazonaws.com:8080/doctorapp/authentication', //
        {
            method:"POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userEmail: userObject.username,
                userPassword: userObject.password

            })
        })
        .then(response => response.json())
        .then(resData => {
            
            let jwt = resData.jwt;
            let jwtDecode = jwt_decode(jwt);

            const expiryDate = new Date(jwtDecode.exp*1000);
            const iatDate = new Date(jwtDecode.iat*1000);
            console.log(jwtDecode)
            dispatch({
                type: VERIFY_LOGIN,
                jwt: jwt,
                doctorUserEmail: jwtDecode.userEmail,
                doctorUserId: jwtDecode.userId,
                doctorInfoId: jwtDecode.userInfoId,
                expiryDate: jwtDecode.exp
            });
            saveDataToStorage(jwt,jwtDecode.userEmail,jwtDecode.userId)
        })
        .catch(
            (error) => {
                console.log(error.message)
                let message = 'something went wrong'
                throw new Error(message)}
        )
    };
}

const registerVerficationSend = (userObject)=> {
    console.log(userObject);
    return async dispatch =>{
        const response = await fetch('http://ec2-3-135-17-82.us-east-2.compute.amazonaws.com:8080/doctorApp/registerVerficationCode', //
        {
            method:"POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userObject.username,

            })
        })
        .then(response => response.json())
        .then(resData => {
            console.log(resData)
            if(resData.errCode=="E0018"){
                dispatch({type:VERFICATION_SEND})
                console.log("success")
            }
                
            else
                throw new Error(resData.msg_en)
            
        })
        .catch(
            (error) => {throw new Error(error)}
        )
    };
}



const registerApply = (userObject)=>{


    return async dispatch =>{
        const response = await fetch('http://ec2-3-135-17-82.us-east-2.compute.amazonaws.com:8080/doctorApp/confirmRegister',
        {
            method:"POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userObject.username,
                password: userObject.password,
                name_en: userObject.preferedEnglishName,
                name_cn: userObject.preferedChineseName,
                address: userObject.address,
                specialty: userObject.specialty,
                verficationCode: userObject.verficationCode,
                district: userObject.district

            })
        })
        .then(response => response.json())
        .then(resData=>{
            //console.log(resData)
            let message ;
            if(resData.errCode=="E0018"){
                dispatch({type:REGISTER})
                console.log("success")
            }
                
            else
                throw new Error(resData.msg_en)
        })
        .catch(
            (error) => {throw new Error(error)}
        )

        
    }
}

const signOut = ()=>{
    return dispatch =>{
        dispatch({type:SIGN_OUT})
    }
}



const authenticate = (jwt,userEmail,doctorUserId)=>{
    return dispatch =>{
        dispatch({type:AUTHENTICATE, jwt:jwt, userEmail:userEmail,doctorUserId:doctorUserId})
    }
}


const fetchOneDoctor = (Id)=>{
    console.log(Id)
    return async dispatch =>{
        const response = await fetch('http://ec2-3-135-17-82.us-east-2.compute.amazonaws.com:8080/portalWebsite/doctorUser?doctorUserId='+Id,{
            method:'GET',

        })
        .then(response=>response.json())
        .then(resData=>{
            let timeSlot;
            let checkBook=[]
            let today =moment().format('YYYY/MM/DD');
            const json = JSON.parse(resData.msg_remark.booking_timeslots)
            // for(const key in json)
            // {
            //     let temp = key.split('-')
            //     if(temp[1]===today){
            //         timeSlot=json[key]
            //         break;
            //     }
                
            // }
            // let availableTime = timeSlot.split(',')
            // availableTime.forEach(m=>{
            //     let temp2=m.split('$')
            //     if(temp2[1]==="true"){
            //         checkBook.push({time:temp2[0]})
            //     }
            // })
            //console.log(checkBook)
            // const temp = Object.keys(resData.msg_remark.booking_timeslots)
            //Object.keys(temp).forEach(m=>console.log(resData.msg_remark.booking_timeslots[m]))
            //console.log(resData.msg_remark.booking_timeslots[temp])

            dispatch({
                type:FETCH_ONE_DOCTOR,
                doctorInfo:resData.msg_remark.doctorInfos[0],
                booking:checkBook
            })
        })

    }
}


const fetchBooking =(Id)=>{
    return async dispatch =>{
        const response = await fetch('http://ec2-3-135-17-82.us-east-2.compute.amazonaws.com:8080/doctorApp/booking?doctor_user_id='+Id,{
            method:'GET',
            

        })
        .then(response=>response.json())
        .then(resData=>{
            let booking =[];
            let today =moment().format('YYYY/MM/DD');
            resData.forEach(m=>{
                if(m.booking_date===today)
                {
                    booking.push(m)
                }
            })
            
            


           // console.log("booking",resData[0].booking_date)

            dispatch({
                type:FETCH_BOOKING,
                booking:booking
            })
        })
        
    }
}


const saveDataToStorage =(jwt, userEmail,doctorUserId)=>{
    AsyncStorage.setItem('userData', JSON.stringify({
        jwt:jwt,
        userEmail:userEmail,
        doctorUserId:doctorUserId
    }))
}


export {verifyLogin,authenticate,registerVerficationSend,registerApply,fetchOneDoctor,fetchBooking,signOut};
