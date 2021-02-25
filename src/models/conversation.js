class Conversation {
    constructor(
        conversation_id,
        patient_user_id,
        doctor_info_id,
        patient_user_socket_id,
        doctor_user_socket_id,
        conversation_content,
        patientUser
    ) {
        this.conversation_id = conversation_id,
        this.patient_user_id = patient_user_id,
        this.doctor_info_id = doctor_info_id,
        this.patient_user_socket_id = patient_user_socket_id,
        this.doctor_user_socket_id = doctor_user_socket_id,
        this.conversation_content = conversation_content
        this.patientUser = patientUser
    }
  }
  
  export default Conversation;
  