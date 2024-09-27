import * as React from 'react';
import RoundContainer from "../../RoundContainer";
import { Image, Text, Button, StyleSheet, Pressable } from "react-native";
import ShadowButton from "../../ShadowButton";
import { useNavigation } from '@react-navigation/native';
// import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// WebBrowser.maybeCompleteAuthSession();

// const LoginComponent = () => {
//     const [userInfo, setUserInfo] = React.useState(null);
//     const [request, response, promptAsync] = Google.useAuthRequest({
//         androidClientId: '193831814873-4tvmlr7rkgca855u7i4fqlt7bheo7t2r.apps.googleusercontent.com',
//         iosClientId: '193831814873-v4kcau6fdo26u1fff3i98n24gdcrkkqv.apps.googleusercontent.com',
//         webClientId: '193831814873-8b6qjbnulj2e73molv4tu6qiucv0eo1r.apps.googleusercontent.com',
//     });

//     React.useEffect(() => {
//         handleSignInWithGoogle();
//     }, [response]);

//     async function handleSignInWithGoogle() {
//         const user = await AsyncStorage.getItem('@user');
//         if (!user) {
//             if (response?.type === 'success') {
//                 await getUserInfo(response.authentication.accessToken);
//             }
//         }
//         else {
//             setUserInfo(JSON.parse(user));
//         }
//     }

//     const getUserInfo = async (token) => {
//         if (!token) {
//             return;
//         }
//         try {
//             const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             const user = await response.json();
//             await AsyncStorage.setItem('@user', JSON.stringify(user));
//             setUserInfo(user);
//         }
//         catch (error) {
//             console.error(error);
//         }
//     }
//     return (
//         <RoundContainer style={{ ...styles.container, width: '70%' }}>
//             <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
//             <Text style={styles.title}>Tham gia ngay khoá học Code cùng với AI thông minh</Text>
//             <ShadowButton
//                 title="Đăng nhập với email"
//                 style={{ backgroundColor: '#6793e3', margin: 5, paddingHorizontal: 30 }}
//                 textStyle={{ lineHeight: 30 }}
//                 onPress={() => {
//                     navigation.navigate('LoginEmail');
//                 }}
//             />
//             <ShadowButton
//                 title="Đăng nhập với Gmail"
//                 onPress={() => {
//                     promptAsync();
//                 }}
//                 style={{ backgroundColor: '#fff', margin: 5 }}
//                 textStyle={{ color: '#000', lineHeight: 30 }}
//                 icon="../../assets/images/icon-google.png"
//             />
//             <Text style={{ fontSize: 16, width: '100%', textAlign: 'right', marginTop: 5, marginRight: 20 }}>
//                 Chưa có tài khoản?
//                 <Pressable
//                     style={{ color: '#6793e3' }}
//                     onPress={() => {
//                         navigation.navigate('Register');
//                     }}
//                 >
//                     Đăng ký
//                 </Pressable>
//             </Text>
//             {/* <Button
//                 title="Delete local storage"
//                 onPress={() => {
//                     AsyncStorage.removeItem('@user');
//                 }}
//             /> */}
//         </RoundContainer>
//     );
// }
const LoginComponent = () => {
    const navigation = useNavigation();
    return (
        <RoundContainer style={{ ...styles.container, width: '40%' }}>
            <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Tham gia ngay khoá học Code cùng với AI thông minh</Text>
            <ShadowButton
                title="Đăng nhập với email"
                style={{ backgroundColor: '#6793e3', margin: 5, paddingHorizontal: 30 }}
                textStyle={{ lineHeight: 30 }}
                onPress={() => {
                    navigation.navigate('LoginEmail');
                }}
            />
            <ShadowButton
                title="Đăng nhập với Gmail"
                onPress={() => {
                }}
                style={{ backgroundColor: '#fff', margin: 5 }}
                textStyle={{ color: '#000', lineHeight: 30 }}
                icon={require("../../../assets/images/icon-google.png")}
            />
            <Text
                style={{
                    fontSize: 16,
                    width: '100%',
                    textAlign: 'right',
                    marginTop: 5,
                    marginRight: 20
                }}
            >
                Chưa có tài khoản?
                <Pressable
                    onPress={() => {
                        navigation.navigate('Register');
                    }}
                >
                    <Text style={{ fontSize: 16, color: '#6793e3' }}>Đăng ký</Text>
                </Pressable>
            </Text>
            {/* <Button
                title="Delete local storage"
                onPress={() => {
                    AsyncStorage.removeItem('@user');
                }}
            /> */}
        </RoundContainer>
    );
}
const styles = StyleSheet.create({
    container: {
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
        marginBottom: 20,
        textAlign: 'center'
    }
});
export default LoginComponent;