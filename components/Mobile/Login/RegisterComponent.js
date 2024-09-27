import { Button, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import NormalButton from '../../NormalButton';
import { useNavigation } from 'expo-router';

const RegisterComponent = () => {
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    return (
        <View style={{ ...styles.container, backgroundColor: '#fff', paddingHorizontal: 30 }}>
            <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
            <Pressable
                style={{ position: 'absolute', top: 30, left: 30 }}
                onPress={() => {
                    navigation.goBack();
                }}>
                <Ionicons name="arrow-back" size={38} color="black" />
            </Pressable>
            <Text style={styles.title}>Đăng ký tài khoản AIC</Text>
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
                <Text style={styles.label}>Nhập lại mật khẩu<Text style={{ color: 'red' }}>*</Text></Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        placeholder='Nhập lại mật khẩu'
                        style={styles.passwordInput}
                        secureTextEntry={!showConfirmPassword}
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
                        title='Đăng ký'
                        onPress={() => { }}
                        style={{ width: '100%', marginTop: 10 }}
                    />
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        height: 120,
        resizeMode: 'contain',
        marginTop: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20
    },
    form: {
        width: '100%',
        padding: 20,
        marginTop: 40
    },
    label: {
        fontSize: 18,
        marginBottom: 10
    },
    input: {
        width: '100%',
        padding: 14,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
        fontSize: 16
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
        padding: 14,
        fontSize: 16
    }
});
export default RegisterComponent;