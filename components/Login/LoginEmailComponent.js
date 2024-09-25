import { Button, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import RoundContainer from '../RoundContainer';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import NormalButton from '../NormalButton';

const LoginEmailComponent = () => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <RoundContainer style={{ ...styles.container, width: '70%' }}>
            <Pressable
                style={{ position: 'absolute', top: 20, left: 20 }}
                onPress={() => {
                    navigation.back();
                }}>
                <Ionicons name="arrow-back" size={28} color="black" />
            </Pressable>
            <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Đăng nhập với email</Text>
            <View style={styles.form}>
                <Text style={styles.label}>Email<Text style={{ color: 'red' }}>*</Text></Text>
                <TextInput placeholder='Nhập email' style={styles.input} />
                <Text style={styles.label}>Mật khẩu<Text style={{ color: 'red' }}>*</Text></Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        placeholder='Nhập mật khẩu'
                        style={styles.passwordInput}
                        secureTextEntry={!showPassword}
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
                <Pressable style={styles.forgotPassword}
                    onPress={() => { navigation.navigate('ForgetPassword') }}>
                    Quên mật khẩu?
                </Pressable>
                <View style={{ alignItems: 'center' }}>
                    <NormalButton
                        title='Đăng nhập'
                        onPress={() => { }}
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
        fontFamily: 'Arial',
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
    },
    forgotPassword: {
        fontSize: 16,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        color: '#6793e3',
        textAlign: 'right'
    }
});
export default LoginEmailComponent;