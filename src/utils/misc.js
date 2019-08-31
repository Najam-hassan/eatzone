import { Platform, Dimensions } from 'react-native';

const dim = Dimensions.get('window');

export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return `${s4() +
    s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}_${Date.now()}`;
}

export function conversion(value) {
  const km = Number.parseFloat(value / 1000).toFixed(2)
  return (km * 0.62137).toFixed(2)
}

export const collectionServiceC = (service) => {
  if (service) {
    return parseFloat((service.collectionServiceCharges / 100).toFixed(2))
  }
}

export const deliveryServiceC = (service) => {
  if (service) {
    return parseFloat((service.deliveryServiceCharges / 100).toFixed(2))
  }
}

export const calculateCost = (items, charges, dineCharges) => {
  let total = 0;
  let delivery = 0;
  let dinein = 0;

  items.forEach(item => {
    total = total + item.itemQuantity * item.itemPrice;
  });
  if (charges) {
    delivery = total * parseFloat((charges.deliveryServiceCharges / 100).toFixed(2))
  }
  if (dinein) {
    dinein = total * parseFloat((dineCharges.collectionServiceCharges / 100).toFixed(2))
  }
  amount = total + parseFloat((delivery).toFixed(2)) + parseFloat((dinein).toFixed(2))
  return amount.toFixed(2);
}

export function setInitialDrawerSize() {
  return Platform.OS === 'ios' && (isIPhoneXSize(dim) || isIPhoneXrSize(dim)) ? 0.23 : 0.15
}

export function isIPhoneXSize(dim) {
  return dim.height == 812 || dim.width == 812;
}

export function isIPhoneXrSize(dim) {
  return dim.height == 896 || dim.width == 896;
}

export function getUnique(arr, comp) {
  const unique = arr
    .map(e => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(e => arr[e]).map(e => arr[e]);
  return unique;
}