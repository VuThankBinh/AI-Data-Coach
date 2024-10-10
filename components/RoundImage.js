import { Image, StyleSheet } from "react-native"

export default function RoundImage({ source, style }) {
    return (
        <Image
            source={source}
            style={{...styles.image, ...style}}
        />
    );
}

const styles = StyleSheet.create({
    image: {
        borderRadius: 1000,
        resizeMode: 'stretch'
    }
});