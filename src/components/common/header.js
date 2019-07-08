import React from 'react';
import Icon from 'react-native-vector-icons/EvilIcons';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

const Header = ({ navigation, title, profile }) => {
    const { iconsViewStyle, navTitle, navRight } = styles;
    return (
        <View style={{ backgroundColor: '#00a0ff', }}>
            <View style={[iconsViewStyle, { backgroundColor: '#00a0ff' }]}>
                {!profile ?
                    <TouchableOpacity
                        style={{ paddingHorizontal: 5, paddingVertical: 10, flex: 0.1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}
                        hitSlop={{ top: 5, bottom: 5, right: 5, left: 5 }}
                        onPress={() => { navigation.openDrawer() }}
                    >
                        <Image source={require('../../assets/images/menuIcon.png')} />
                    </TouchableOpacity> : null}
                <View style={navTitle}>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: '500', lineHeight: 24, }}>{title}</Text>
                </View>
                <View style={navRight}>
                    {/* <Icon name="chevron-right" size={34} color={'#fff'} /> */}
                </View>
            </View>
        </View>
    )
}

const PageHeader = ({ navigation, title }) => {
    const { iconsViewStyle, navTitle, navRight } = styles;
    return (
        <View style={{ backgroundColor: '#00a0ff', }}>
            <View style={[iconsViewStyle, { backgroundColor: '#00a0ff' }]}>
                <TouchableOpacity
                    style={{ paddingHorizontal: 5, paddingVertical: 10, flex: 0.1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}
                    onPress={() => { navigation.goBack() }}
                >
                    <Icon name="chevron-left" size={34} color={'#fff'} />
                </TouchableOpacity>
                <View style={navTitle}>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: '500', lineHeight: 24, }}>{title}</Text>
                </View>
                <View style={navRight}>
                    {/* <Icon name="chevron-right" size={34} color={'#fff'} /> */}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    iconsViewStyle: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        fontSize: 18,
        fontWeight: '500',
    },
    navTitle: {
        flex: 0.8,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    navRight: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 5,
        paddingVertical: 10,
    }
})

export { Header, PageHeader };