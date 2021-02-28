class DoctorUser {
    constructor(
        doctor_user_id,
        email,
        password,
        username,
        doctor_info_id,
        booking_timeslots
    ) {
        this.doctor_user_id = doctor_user_id,
        this.email = email,
        this.password = password,
        this.username = username,
        this.doctor_info_id = doctor_info_id
        this.booking_timeslots = booking_timeslots
    }
  }
  
  export default DoctorUser;
  