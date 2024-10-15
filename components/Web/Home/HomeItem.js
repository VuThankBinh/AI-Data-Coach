import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import RoundImage from "../../RoundImage";

export default function HomeItem({ title, description, image, onPress }) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.content}>
                <View style={styles.imageContainer}>
                    <RoundImage
                        source={image}
                        style={styles.image}
                    />
                </View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '28%'
    },
    imageContainer: {
        position: 'absolute',
        top: -35,
        alignSelf: 'center',
    },
    image: {
        width: 70,
        height: 70,
        backgroundColor: '#e5efff',
        resizeMode: 'contain'
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 60,
        paddingTop: 55, // Tăng padding phía trên để có chỗ cho hình ảnh
        paddingBottom: 40,
        borderRadius: 10,
        marginTop: 35, // Thêm margin phía trên để cân bằng với hình ảnh
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold'
    },
    description: {
        fontSize: 20,
        textAlign: 'center'
    }
});
