import { Image, StyleSheet, View, Text } from "react-native";
import { normalizeText } from "react-native-elements/dist/helpers";

export default function FooterComponent() {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.column}>
                    <Image
                        style={styles.logo}
                        source={require('../../assets/images/logo.png')} />
                    <Text style={{ ...styles.boldText, fontSize: 20 }}>Aglo AI Code</Text>
                    <Text style={styles.text}>Học code cùng gia sư AI thông minh</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.boldText}>Thông tin liên hệ</Text>
                    <View style={styles.rowContainer}>
                        <Text style={{ ...styles.boldText, color: '#595757' }}>Hotline: </Text>
                        <Text style={styles.text}>0965382843</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={{ ...styles.boldText, color: '#595757' }}>Email: </Text>
                        <Text style={styles.text}>bnpstudio2003@gmail.com</Text>
                    </View>
                    <Text style={styles.boldText}>Kết nối với chúng tôi</Text>
                    <View style={styles.rowContainer}>
                        <Image
                            style={styles.icon}
                            source={require('../../assets/images/icon-fb.png')} />
                        <Image
                            style={styles.icon}
                            source={require('../../assets/images/icon-gmail.png')} />
                    </View>
                </View>
                <View style={styles.column}>
                    <Text style={styles.boldText}>Tải ứng dụng trên điện thoại</Text>
                    <Image
                        style={styles.download}
                        source={require('../../assets/images/download-appstore.png')} />
                    <Image
                        style={styles.download}
                        source={require('../../assets/images/download-playstore.png')} />
                </View>
            </View>
            <Text style={styles.copyrightText}>Bản quyền thuộc về BNP Studio</Text>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    column: {
        flex: 1,
        marginHorizontal: 5,
        paddingHorizontal: 20,
    },
    logo: {
        height: 60,
        width: '40%',
        resizeMode: 'contain',
    },
    rowContainer: {
        flexDirection: 'row'
    },
    boldText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5
    },
    text: {
        color: '#595757',
        fontSize: 16,
        marginBottom: 5
    },
    icon: {
        height: 40,
        width: 40,
        resizeMode: 'contain',
        marginRight: 10
    },
    download: {
        height: 60,
        width: 160,
        resizeMode: 'contain',
        marginRight: 10
    },
    copyrightText: {
        color: '#000',
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 5,
        width: '100%',
        textAlign: 'center',
        color: '#595757'
    }
});
