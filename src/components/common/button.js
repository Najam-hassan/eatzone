
import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';


export const ButtonComponent = (props) => {
    const { title = 'Enter', style = {}, textStyle = {}, onPress } = props;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, style]}
            activeOpacity={1}
        >
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: '100%',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 7,
        backgroundColor: '#1BA2FC',
        shadowColor: '#1BA2FC',
        // shadowOpacity: 0.4,
        // shadowOffset: { height: 10, width: 0 },
        // shadowRadius: 20,
    },

    text: {
        fontSize: 16,
        // textTransform: 'uppercase',
        color: '#FFFFFF',
    },
});

export default ButtonComponent;