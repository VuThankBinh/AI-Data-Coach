import { StyleSheet, View, Button, Text, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import HeaderComponent from '../components/Web/HeaderComponent';
import HomeItem from '../components/Web/Home/HomeItem';

function Home() {
    const navigation = useNavigation();
    return (
        <>
            <HeaderComponent />
            <View style={styles.container}>
                <Text style={styles.text}>Bắt đầu học code cùng{'\n'}gia sư AI thông minh!!!</Text>
                <Image
                    source={require('../assets/images/robot.png')}
                    style={styles.image}
                />
            </View>
            <View style={{...styles.container, alignItems: 'flex-start', justifyContent: 'space-evenly'}}>
                <HomeItem
                    title="Lớp học"
                    description="Tham gia vào lớp học của bạn, giáo viên"
                    image={require('../assets/images/icon-home-item-1.png')}
                />
                <HomeItem
                    title="Lý thuyết"
                    description="Bắt đầu học những kiến thức nền tảng của những môn học lập trình"
                    image={require('../assets/images/icon-home-item-2.png')}
                />
                <HomeItem
                    title="Thực hành"
                    description="Bắt đầu thực hành ngay với những kiến thức mà bạn đã được học"
                    image={require('../assets/images/icon-home-item-3.png')}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2667df'
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain'
    }
});

export default Home;