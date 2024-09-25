import React from 'react';
import { Pressable, Text, StyleSheet, Image } from "react-native";

const ShadowButton = ({ style, textStyle, title, onPress, icon }) => {
    return (
        <Pressable style={[styles.shadowButton, style]} onPress={onPress}>
            { icon && <Image source={icon} style={{width: 30, height: 30, marginRight: 10}} />}
            <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    shadowButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        borderRadius: 10,
        borderColor: '#000',
        padding: 10,
        borderWidth: 1,
        borderBottomWidth: 4,
        borderRightWidth: 4
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    }
});

export default ShadowButton;
