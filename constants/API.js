
const API_URL = "http://10.145.13.127:5000";

export const API = {
  API_URL: API_URL,
  LOGIN: `${API_URL}/auth/login`,
  REGISTER: `${API_URL}/auth/register`,
  SEND_OTP: `${API_URL}/auth/send-otp`,
  VERIFY_OTP: `${API_URL}/auth/verify-otp`,
  RESET_PASSWORD: `${API_URL}/auth/reset-password`,
  CHANGE_PASSWORD: `${API_URL}/auth/change-password`,
  GET_SUBJECTS: `${API_URL}/lessons/subjects`,
  GET_LESSONS: `${API_URL}/lessons`, // /user/${idUser}/subject/${idSubject}
  GET_LEARNING_LESSONS: `${API_URL}/lessons/learning-lessons`, // + idUser
  GET_USER_INFO: `${API_URL}/protected/user-info`,
  SAVE_QUIZ: `${API_URL}/lessons/save-quizz-exercise`,
  SAVE_CODE: `${API_URL}/lessons/save-code-exercise`,
  SAVE_LESSON: `${API_URL}/lessons/save-lesson`,
};
