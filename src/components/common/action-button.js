import React from 'react';
import ActionButton from 'react-native-action-button';

const FloatingButton = ({ onPress }) => (
    <ActionButton
        buttonColor={'#1BA2FC'}
        onPress={() => onPress()}
        offsetX={10}
        offsetY={10}
    />
);

export default FloatingButton;