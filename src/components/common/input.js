import React from 'react';
import { TextInput, View, Text, Platform } from 'react-native';

export default function MyTextInput (props) {
    const {
        meta,
        input,
        value,
        editable,
        maxLength,
        placeholder,
        onChangeText,
        keyboardType,
        blurOnSubmit,
        errorTextColor,
        returnKeyType,
        onSubmitEditing,
        secureTextEntry,
        customInputStyle,
        selectTextOnFocus,
        placeholderTextColor,
        customContainerStyle,
        ...inputProps
    } = props;

    const renderErrors = (meta, errorTextColor) => {
        const { errorTextStyle } = styles;
        if (meta.touched && meta.error) {
            return (
                <Text style={[errorTextStyle, { color: (errorTextColor ? errorTextColor : "#fff") }]}>{meta.error}</Text>
            );
        }
    };

    return (
        <View style={{}}>
            <View style={[styles.containerStyle, customContainerStyle]}>
                <TextInput
                    style={[styles.inputStyle, customInputStyle]}
                    placeholder={placeholder}
                    underlineColorAndroid='transparent'
                    placeholderTextColor={placeholderTextColor ? placeholderTextColor : '#000'}
                    keyboardType={keyboardType}
                    blurOnSubmit={blurOnSubmit}
                    maxLength={maxLength}
                    onSubmitEditing={onSubmitEditing}
                    returnKeyType={returnKeyType}
                    secureTextEntry={secureTextEntry}
                    onChangeText={onChangeText}
                    editable={editable}
                    selectTextOnFocus={selectTextOnFocus}
                    value={value}
                    {...input}
                />
                <View style={styles.errorContainerStyle}>{
                    renderErrors(meta, errorTextColor)}
                </View>
            </View>
        </View>
    );
}

const styles = {
    containerStyle: {
        // backgroundColor: '#f5f5f5',
        paddingVertical: 0,
        paddingHorizontal: 5,
        marginBottom: 18,
        height: 50,
        borderRadius: 0,
    },
    inputStyle: {
        fontSize: 14,
        // fontFamily: (Platform.OS === 'ios') ? 'SFCompactDisplay-Regular' : 'SF-Regular',
        paddingHorizontal: 15,
        flex: 1,
        position: 'relative',
        top: 0,
        textAlign: "left",
        color: "#edebed"
    },

    errorContainerStyle: {
        // flex: 1,
    },
    errorTextStyle: {
        // fontFamily: (Platform.OS === 'ios') ? 'SFCompactDisplay-Regular' : 'SF-Regular',
        position: 'absolute',
        top: 0,
        right: 20,
        textAlign: 'right',
        color: '#fff',
        fontSize: 12,
        fontWeight: '400'
    },
    imageStyle: {
        top: 14,
        marginLeft: 5
    }
};
