import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

const Header = ({ navigation, title }) => {
    const { iconsViewStyle, titleStyle } = styles;
    return (
        <View style={{ backgroundColor: '#1BA2FB' }}>
            <View style={[iconsViewStyle, { backgroundColor: '#1BA2FB' }]}>
                <TouchableOpacity
                    onPress={() => { navigation.openDrawer() }}
                >
                    <Image source={require('../../assets/images/menuIcon.png')} />
                </TouchableOpacity>
                <View style={titleStyle}>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: '500' }}>{title}</Text>
                </View>
            </View>
        </View>
    )
}

const PageHeader = ({ navigation, title }) => {
    const { iconsViewStyle, titleStyle } = styles;
    return (
        <View style={{ backgroundColor: '#1BA2FB' }}>
            <View style={[iconsViewStyle, { backgroundColor: '#1BA2FB' }]}>
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}
                >
                    <Icon name="arrow-left" size={20} color={'#fff'} />
                </TouchableOpacity>
                <View style={titleStyle}>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: '500' }}>{title}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    iconsViewStyle: {
        padding: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
        fontSize: 18,
        fontWeight: '500'
    },
    titleStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export { Header, PageHeader };
