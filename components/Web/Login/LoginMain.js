import { Image, StyleSheet, Platform, View, Button, Text } from 'react-native';
import { Stack } from 'expo-router';

export default function LoginMain({ children }) {
    return (
        <View style={{ ...styles.container, flex: 1, flexDirection: 'row', backgroundColor: '#e5efff', padding: 40 }}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={{ ...styles.container, width: '60%', paddingHorizontal: 60 }}>
                <Image source={require('../../../assets/images/login-logo.png')} style={styles.loginLogo} />
                <Text style={styles.title}>Học code cùng với gia sư AI miễn phí</Text>
                <Text style={styles.text}>• Việc học những kiến thức về code sẽ trở nên dễ dàng hơn bao giờ hết</Text>
                <Text style={styles.text}>• Đồng hành bên bạn là một gia sư Ai thông minh</Text>
                <Text style={styles.text}>• Chỉ với 1 tài khoản duy nhất, bạn có thể bắt đầu học</Text>
            </View>
            {children}
        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginLogo: {
        width: 300,
        height: 200,
        resizeMode: 'contain',
    },
    text: {
        fontSize: 18,
        textAlign: 'left',
        width: '75%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2667df',
        textAlign: 'center'
    }
});
