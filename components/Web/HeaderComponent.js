import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import NormalButton from '../NormalButton';
import RoundImage from '../RoundImage';

export default function HeaderComponent() {
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/images/logo.png')}
            />
            <View style={styles.navigationContainer}>
                <View style={styles.roundContainer}>
                    <Pressable>
                        <Text style={styles.textButton}>Trang chủ</Text>
                    </Pressable>
                    <Pressable>
                        <Text style={styles.textButton}>Lớp học</Text>
                    </Pressable>
                    <Pressable>
                        <Text style={styles.textButton}>Khóa học</Text>
                    </Pressable>
                    <Pressable>
                        <Text style={styles.textButton}>Giới thiệu</Text>
                    </Pressable>
                </View>
            </View>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
                <NormalButton
                    style={{ backgroundColor: '#2667df' }}
                    title={'Bắt đầu khóa học'}
                />
                <RoundImage
                    style={{ width: 45, height: 45, marginHorizontal: 20, backgroundColor: '#fff' }}
                    source={require('../../assets/images/logo.png')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        padding: 10
    },
    navigationContainer: {
        width: '30%'
    },
    roundContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        height: 40,
        paddingHorizontal: 10,
        alignSelf: 'center',
    },
    logo: {
        height: 80,
        width: '20%',
        resizeMode: 'contain'
    },
    textButton: {
        fontWeight: 'bold',
        marginHorizontal: 10,
        color: '#595757'
    }
});