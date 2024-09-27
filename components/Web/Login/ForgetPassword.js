import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import RoundContainer from '../../RoundContainer';
import { Ionicons } from '@expo/vector-icons';
import { useState, useRef } from 'react';
import NormalButton from '../../NormalButton';
import axios from 'axios';
import { API } from '../../../constants/API';

const ForgetPassword = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const email = route.params?.email;
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);

    const handleOtpChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value !== '') {
            // Chuyển sang ô tiếp theo nếu có giá trị
            if (index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
            // Quay lại ô trước đó khi xóa
            inputRefs.current[index - 1].focus();
        }
    };

    const handleVerifyOTP = async () => {
        const otpString = otp.join('');
        console.log({
            email,
            otp: otpString
        });
        try {
            const response = await axios.post(API.VERIFY_OTP, {
                email,
                otp: otpString
            });
            if (response.status === 200) {
                console.log("Xác nhận mã thành công");
                // Thêm xử lý sau khi xác nhận thành công (ví dụ: chuyển hướng)
            }
        } catch (error) {
            console.log("Lỗi khi xác nhận mã: " + error);
        }
    }

    const handleGoBack = () => {
        navigation.goBack();
    }

    return (
        <RoundContainer style={{ ...styles.container, width: '70%' }}>
            <Pressable
                style={{ position: 'absolute', top: 20, left: 20 }}
                onPress={handleGoBack}>
                <Ionicons name="arrow-back" size={28} color="black" />
            </Pressable>
            <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Vui lòng nhập mã xác nhận</Text>
            <View style={styles.form}>
                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => inputRefs.current[index] = ref}
                            style={styles.otpInput}
                            maxLength={1}
                            keyboardType="numeric"
                            value={digit}
                            onChangeText={(value) => handleOtpChange(value, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                        />
                    ))}
                </View>
                <Text style={styles.label}>Mã xác nhận đã được gửi về email của bạn!</Text>
                <Pressable style={styles.resendCode}
                    onPress={() => { navigation.navigate('ForgetPassword') }}>
                    <Text>Chưa nhận được mã?</Text>
                </Pressable>
                <View style={{ alignItems: 'center' }}>
                    <NormalButton
                        title='Xác nhận'
                        onPress={handleVerifyOTP}
                        style={{ width: '30%', marginTop: 10 }}
                    />
                </View>
                <Text>Email: {email}</Text>
            </View>
        </RoundContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 130,
        height: 80,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    form: {
        width: '100%',
        padding: 20
    },
    label: {
        fontSize: 16,
        marginBottom: 5
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    otpInput: {
        width: '13%',
        aspectRatio: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    codeInput: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10
    },
    resendCode: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6793e3',
        textAlign: 'right'
    }
});
export default ForgetPassword;