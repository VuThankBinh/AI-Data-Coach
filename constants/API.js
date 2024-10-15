const API_URL = 'http://192.168.137.172:3000';

export const API = {
    LOGIN: `${API_URL}/auth/login`,
    REGISTER: `${API_URL}/auth/register`,
    SEND_OTP: `${API_URL}/auth/send-otp`,
    VERIFY_OTP: `${API_URL}/auth/verify-otp`,
    RESET_PASSWORD: `${API_URL}/auth/reset-password`,
    CHANGE_PASSWORD: `${API_URL}/auth/change-password`,
    GET_COURSES: `${API_URL}/lessons/subjects`,
    GET_LESSON: `${API_URL}/lessons`,
}