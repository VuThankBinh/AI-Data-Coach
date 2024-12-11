const API_URL = 'http://localhost:5000';

export const API = {
    API_URL: API_URL,
    LOGIN: `${API_URL}/auth/login`,
    REGISTER: `${API_URL}/auth/register`,
    SEND_OTP: `${API_URL}/auth/send-otp`,
    VERIFY_OTP: `${API_URL}/auth/verify-otp`,
    RESET_PASSWORD: `${API_URL}/auth/reset-password`,
    CHANGE_PASSWORD: `${API_URL}/auth/change-password`,
    GET_COURSES: `${API_URL}/lessons/subjects`,
    GET_LESSON: `${API_URL}/lessons`,
}