import { Platform, Dimensions } from 'react-native';

const dim = Dimensions.get('window');

export function guid () {
    function s4 () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return `${s4() +
        s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}_${Date.now()}`;
}

export function conversion (value) {
    const km = Number.parseFloat(value / 1000).toFixed(2)
    return (km * 0.62137).toFixed(2)
}

export const calculateCost = items => {
    let total = 0;
    items.forEach(item => {
        total = total + item.itemQuantity * item.menu_item.price;
    });
    return total.toFixed(0);
}

export function setInitialDrawerSize () {
    return Platform.OS === 'ios' && (isIPhoneXSize(dim) || isIPhoneXrSize(dim)) ? 0.23 : 0.15
}

export function isIPhoneXSize (dim) {
    return dim.height == 812 || dim.width == 812;
}

export function isIPhoneXrSize (dim) {
    return dim.height == 896 || dim.width == 896;
}