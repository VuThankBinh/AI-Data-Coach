import * as React from 'react';
import { Image, Text, StyleSheet, Pressable, View } from "react-native";
import { useNavigation } from 'expo-router';
import NormalButton from "../../NormalButton";
const LoginComponent = () => {
    const navigation = useNavigation();

    return (
        <View style={{ ...styles.container, backgroundColor: '#fff' }}>
            <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Tham gia ngay các khoá học cùng AIC - Gia sư AI thông minh</Text>
            <NormalButton
                title="Tiếp tục với email"
                style={{
                    backgroundColor: '#6793e3',
                    margin: 5,
                    width: "70%"
                }}
                textStyle={{ lineHeight: 30 }}
                onPress={() => {
                    navigation.navigate('LoginEmail');
                }}
            />
            <NormalButton
                title="Tiếp tục với Gmail"
                onPress={() => {
                }}
                style={{
                    backgroundColor: '#fff',
                    margin: 5,
                    width: "70%",
                    borderWidth: 1,
                    borderColor: '#b8b9bb'
                }}
                textStyle={{ color: '#000', lineHeight: 30 }}
                icon={require("../../../assets/images/icon-google.png")}
            />
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10
            }}>
                <Text style={{ fontSize: 16, marginRight: 5 }}>
                    Chưa có tài khoản?
                </Text>
                <Pressable
                    onPress={() => {
                        navigation.navigate('Register');
                    }}
                >
                    <Text style={{ fontSize: 16, color: '#6793e3', fontWeight: 'bold' }}>
                        Đăng ký
                    </Text>
                </Pressable>
            </View>
            <Text style={styles.bottomText}>
                Bằng việc đăng ký, bạn đồng ý với
                <Text style={{ color: '#6793e3', fontWeight: 'bold' }}> Điều khoản dịch vụ </Text>
                và
                <Text style={{ color: '#6793e3', fontWeight: 'bold' }}> Chính sách bảo mật </Text>
                của chúng tôi.
            </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: 180,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    bottomText: {
        position: 'absolute',
        bottom: 20,
        fontSize: 16,
        margin: 5,
        textAlign: 'center'
    }
});
export default LoginComponent;