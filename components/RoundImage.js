import { Image, StyleSheet, Pressable } from "react-native"

export default function RoundImage({ source, style, onPress }) {
    return (
        <Pressable
            onPress={onPress}
        >
            <Image
                source={source}
                style={{ ...styles.image, ...style }}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    image: {
        borderRadius: 1000,
        resizeMode: 'stretch'
    }
});