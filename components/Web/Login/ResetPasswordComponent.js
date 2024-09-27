import { Button, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import RoundContainer from '../../RoundContainer';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import NormalButton from '../../NormalButton';
import axios from 'axios';
import { API } from '../../../constants/API';

const ResetPasswordComponent = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const resetPasswordInfo = route.params?.resetPasswordInfo;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleResetPassword = async () => {
        try {
            if (password !== confirmPassword) {
                console.log('Mật khẩu không khớp');
                return;
            }
            console.log({
                email: resetPasswordInfo.email,
                password: password
            });
            const response = await axios.post(API.RESET_PASSWORD, {
                email: resetPasswordInfo.email,
                password: password
            });
            if (response.status === 200) {
                console.log("Đặt lại mật khẩu thành công");
                navigation.navigate('LoginEmail');
            } else {
                console.log('Đặt lại mật khẩu thất bại');
            }
        }
        catch (error) {
            console.log("Lỗi khi đặt lại mật khẩu: " + error);
        }
    };
    return (
        <RoundContainer style={{ ...styles.container, width: '70%' }}>
            <Pressable
                style={{ position: 'absolute', top: 20, left: 20 }}
                onPress={() => {
                    navigation.goBack();
                }}>
                <Ionicons name="arrow-back" size={28} color="black" />
            </Pressable>
            <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Đặt lại mật khẩu tài khoản AIC</Text>
            <View style={styles.form}>
                <Text style={styles.label}>Mật khẩu<Text style={{ color: 'red' }}>*</Text></Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        placeholder='Nhập mật khẩu'
                        style={styles.passwordInput}
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={24}
                            color='black'
                            style={{ marginLeft: -35 }}
                        />
                    </Pressable>
                </View>
                <Text style={styles.label}>Nhập lại mật khẩu<Text style={{ color: 'red' }}>*</Text></Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        placeholder='Nhập lại mật khẩu'
                        style={styles.passwordInput}
                        secureTextEntry={!showConfirmPassword}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                        <Ionicons
                            name={showConfirmPassword ? 'eye-off' : 'eye'}
                            size={24}
                            color='black'
                            style={{ marginLeft: -35 }}
                        />
                    </Pressable>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <NormalButton
                        title='Đặt lại mật khẩu'
                        onPress={handleResetPassword}
                        style={{ width: '30%', marginTop: 10 }}
                    />
                </View>
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
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10
    },
    passwordInput: {
        flex: 1, // chiếm hết chiều rộng của container
        padding: 10
    }
});
export default ResetPasswordComponent;