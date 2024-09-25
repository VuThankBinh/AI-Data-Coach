import React from 'react';
import { View, StyleSheet } from 'react-native';

const RoundContainer = ({ children, style }) => {
    return (
        <View style={[styles.container, style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 16,
    },
});

export default RoundContainer;
