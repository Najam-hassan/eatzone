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

export const calculateCost = (items, charges) => {
    let total = 0;
    items.forEach(item => {
        total = total + item.itemQuantity * item.menu_item.price;
    });
    if (charges) {
        return (total + (total * 0.16) + (total * `0.${charges.deliveryServiceCharges}`)).toFixed(2);
    }
    return total.toFixed(2);
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

export function getUnique (arr, comp) {
    const unique = arr
        .map(e => e[comp])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter(e => arr[e]).map(e => arr[e]);
    return unique;
}