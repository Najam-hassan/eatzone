import React from 'react';
import { TextInput, View, Text } from 'react-native';

export default function MyTextArea (props) {
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
        returnKeyType,
        errorTextColor,
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
                    placeholderTextColor={placeholderTextColor ? placeholderTextColor : '#000'}
                    style={[styles.inputStyle, customInputStyle]}
                    selectTextOnFocus={selectTextOnFocus}
                    underlineColorAndroid={'transparent'}
                    onSubmitEditing={onSubmitEditing}
                    secureTextEntry={secureTextEntry}
                    returnKeyType={returnKeyType}
                    blurOnSubmit={blurOnSubmit}
                    keyboardType={keyboardType}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    editable={editable}
                    multiline={true}
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
        paddingVertical: 0,
        paddingHorizontal: 5,
        marginBottom: 18,
        height: 50,
        borderRadius: 0,
    },
    inputStyle: {
        fontSize: 14,
        paddingHorizontal: 15,
        // flex: 1,
        // position: 'relative',
        // top: 10,
        textAlign: "left",
        color: "#edebed"
    },
    errorContainerStyle: {
        // flex: 1,
    },
    errorTextStyle: {
        position: 'absolute',
        top: 52,
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