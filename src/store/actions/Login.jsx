import DoctorUser from '../../models/doctorUser';
import jwt_decode from 'jwt-decode';
export const VERIFY_LOGIN = 'VERIFY_LOGIN';

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
                userEmail: userObject.email,
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
        })
        .catch(
            (error) => console.error(error)
        )
    };
}

export {verifyLogin};
