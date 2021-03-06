

export const SIGN_OUT="SIGN_OUT";
export const FETCH_VIDEO_LIST = "FETCH_VIDEO_LIST";



 const signOut = ()=>{
    return dispatch =>{
        dispatch({type:SIGN_OUT})
    }
}


 const fetchVideoList=(dotor_id)=>{
    return async dispatch =>{
        const response = await fetch( "http://ec2-3-135-17-82.us-east-2.compute.amazonaws.com:8080/videoConferencing?doctor_user_id="+ dotor_id,{
         method:"GET",
         
     })
     .then (response=>response.json())
     .then(resData=>{
         
         let temp =[]
         const today = new Date();
         let formatedMonth=  ("0" + (today.getMonth()+1)).slice(-2);
         let formatedDate=  ("0" + (today.getDate())).slice(-2);
         let formatDate = today.getFullYear()+'/'+formatedMonth+'/'+formatedDate;
         let currentHours = today.getHours();
         let currentMinutes = today.getMinutes();
         currentHours = ("0" + currentHours).slice(-2);
         currentMinutes = ("0" + currentMinutes).slice(-2);

         console.log(resData)
         for(let i =0; i<resData.length;i++){
             if(resData[i].booking.booking_date===formatDate)
             {
                
                 if(currentHours <= parseInt(resData[i].booking.booking_time)){
                     let data = {...resData[i],check:false}
                     temp.push(data)
                 }
                 else{
                     
                    let data = {...resData[i],check:true}
                    temp.push(data)
                 }
                    
                
             }
                
         }
         
        temp = temp.sort(function (a, b) {
            return a.booking.booking_time > b.booking.booking_time ? 1 : -1;
           });


         console.log("asdjandajd",temp)



        dispatch ({
            type : FETCH_VIDEO_LIST,
            videoList: temp ,
       })
         
     })
    }
}

export {fetchVideoList,signOut};