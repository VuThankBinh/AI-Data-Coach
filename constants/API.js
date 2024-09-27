const API_URL = 'http://192.168.137.168:3000';

export const API = {
    LOGIN: `${API_URL}/auth/login`,
    REGISTER: `${API_URL}/auth/register`,
    SEND_OTP: `${API_URL}/auth/send-otp`,
    VERIFY_OTP: `${API_URL}/auth/verify-otp`,
    RESET_PASSWORD: `${API_URL}/auth/reset-password`,
    CHANGE_PASSWORD: `${API_URL}/auth/change-password`,
}