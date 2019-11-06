import _ from 'lodash';
var responseObj = {
    "deliveries": [
        {
            "id": 229,
            "orderStatus": "COMPLETED",
            "orderItinerary": {
                "collectingServiceCharge": 10,
                "deliveryServiceCharges": 10,
                "items": [
                    {
                        "itemName": "Pizza",
                        "itemQuantity": 1,
                        "itemPrice": 500
                    },
                    {
                        "itemName": "Stuffed Chicken",
                        "itemQuantity": 1,
                        "itemPrice": 50
                    }
                ]
            },
            "currentOrderStep": "3",
            "createdAt": "2019-10-09T13:42:21.714Z",
            "collectingRestaurant": {
                "id": 5,
                "name": "Allied bank",
                "phone": "3077633011",
                "address": "canal view",
                "addressDetails": "lahore",
                "collectionServiceCharges": 10,
                "deliveryServiceCharges": 10
            },
            "deliveringRestaurant": {
                "id": 4,
                "name": "sair o sahyat",
                "phone": "12121212",
                "address": "canal view",
                "addressDetails": "lahore pakistan",
                "collectionServiceCharges": 10,
                "deliveryServiceCharges": 10
            },
            "user": {
                "name": "user",
                "phone": "",
                "avatarUrl": ""
            }
        },
        {
            "id": 228,
            "orderStatus": "COMPLETED",
            "orderItinerary": {
                "collectingServiceCharge": 10,
                "deliveryServiceCharges": 10,
                "items": [
                    {
                        "itemName": "Pizza",
                        "itemQuantity": 1,
                        "itemPrice": 500
                    },
                    {
                        "itemName": "Stuffed Chicken",
                        "itemQuantity": 1,
                        "itemPrice": 50
                    }
                ]
            },
            "currentOrderStep": "3",
            "createdAt": "2019-10-09T12:56:34.830Z",
            "collectingRestaurant": {
                "id": 5,
                "name": "Allied bank",
                "phone": "3077633011",
                "address": "canal view",
                "addressDetails": "lahore",
                "collectionServiceCharges": 10,
                "deliveryServiceCharges": 10
            },
            "deliveringRestaurant": {
                "id": 4,
                "name": "sair o sahyat",
                "phone": "12121212",
                "address": "canal view",
                "addressDetails": "lahore pakistan",
                "collectionServiceCharges": 10,
                "deliveryServiceCharges": 10
            },
            "user": {
                "name": "user",
                "phone": "",
                "avatarUrl": ""
            }
        },
        {
            "id": 227,
            "orderStatus": "COMPLETED",
            "orderItinerary": {
                "collectingServiceCharge": 10,
                "deliveryServiceCharges": 10,
                "items": [
                    {
                        "itemName": "Pizza",
                        "itemQuantity": 1,
                        "itemPrice": 500
                    },
                    {
                        "itemName": "Stuffed Chicken",
                        "itemQuantity": 1,
                        "itemPrice": 50
                    }
                ]
            },
            "currentOrderStep": "1",
            "createdAt": "2019-10-09T12:56:29.307Z",
            "collectingRestaurant": {
                "id": 5,
                "name": "Allied bank",
                "phone": "3077633011",
                "address": "canal view",
                "addressDetails": "lahore",
                "collectionServiceCharges": 10,
                "deliveryServiceCharges": 10
            },
            "deliveringRestaurant": {
                "id": 4,
                "name": "sair o sahyat",
                "phone": "12121212",
                "address": "canal view",
                "addressDetails": "lahore pakistan",
                "collectionServiceCharges": 10,
                "deliveryServiceCharges": 10
            },
            "user": {
                "name": "user",
                "phone": "",
                "avatarUrl": ""
            }
        },
        {
            "id": 226,
            "orderStatus": "PENDING",
            "orderItinerary": {
                "collectingServiceCharge": 10,
                "deliveryServiceCharges": 10,
                "items": [
                    {
                        "itemName": "Pizza",
                        "itemQuantity": 1,
                        "itemPrice": 500
                    },
                    {
                        "itemName": "Stuffed Chicken",
                        "itemQuantity": 1,
                        "itemPrice": 50
                    }
                ]
            },
            "currentOrderStep": "0",
            "createdAt": "2019-10-08T12:03:30.005Z",
            "collectingRestaurant": {
                "id": 5,
                "name": "Allied bank",
                "phone": "3077633011",
                "address": "canal view",
                "addressDetails": "lahore",
                "collectionServiceCharges": 10,
                "deliveryServiceCharges": 10
            },
            "deliveringRestaurant": {
                "id": 4,
                "name": "sair o sahyat",
                "phone": "12121212",
                "address": "canal view",
                "addressDetails": "lahore pakistan",
                "collectionServiceCharges": 10,
                "deliveryServiceCharges": 10
            },
            "user": {
                "name": "user",
                "phone": "",
                "avatarUrl": ""
            }
        },
        {
            "id": 226,
            "orderStatus": "PENDING",
            "orderItinerary": {
                "collectingServiceCharge": 10,
                "deliveryServiceCharges": 10,
                "items": [
                    {
                        "itemName": "Pizza",
                        "itemQuantity": 1,
                        "itemPrice": 500
                    },
                    {
                        "itemName": "Stuffed Chicken",
                        "itemQuantity": 1,
                        "itemPrice": 50
                    }
                ]
            },
            "currentOrderStep": "0",
            "createdAt": "2019-10-07T12:03:30.005Z",
            "collectingRestaurant": {
                "id": 5,
                "name": "Allied bank",
                "phone": "3077633011",
                "address": "canal view",
                "addressDetails": "lahore",
                "collectionServiceCharges": 10,
                "deliveryServiceCharges": 10
            },
            "deliveringRestaurant": {
                "id": 4,
                "name": "sair o sahyat",
                "phone": "12121212",
                "address": "canal view",
                "addressDetails": "lahore pakistan",
                "collectionServiceCharges": 10,
                "deliveryServiceCharges": 10
            },
            "user": {
                "name": "user",
                "phone": "",
                "avatarUrl": ""
            }
        },
        {
            "id": 226,
            "orderStatus": "PENDING",
            "orderItinerary": {
                "collectingServiceCharge": 10,
                "deliveryServiceCharges": 10,
                "items": [
                    {
                        "itemName": "Pizza",
                        "itemQuantity": 1,
                        "itemPrice": 500
                    },
                    {
                        "itemName": "Stuffed Chicken",
                        "itemQuantity": 1,
                        "itemPrice": 50
                    }
                ]
            },
            "currentOrderStep": "0",
            "createdAt": "2019-10-05T12:03:30.005Z",
            "collectingRestaurant": {
                "id": 5,
                "name": "Allied bank",
                "phone": "3077633011",
                "address": "canal view",
                "addressDetails": "lahore",
                "collectionServiceCharges": 10,
                "deliveryServiceCharges": 10
            },
            "deliveringRestaurant": {
                "id": 4,
                "name": "sair o sahyat",
                "phone": "12121212",
                "address": "canal view",
                "addressDetails": "lahore pakistan",
                "collectionServiceCharges": 10,
                "deliveryServiceCharges": 10
            },
            "user": {
                "name": "user",
                "phone": "",
                "avatarUrl": ""
            }
        },
        {
            "id": 226,
            "orderStatus": "PENDING",
            "orderItinerary": {
                "collectingServiceCharge": 10,
                "deliveryServiceCharges": 10,
                "items": [
                    {
                        "itemName": "Pizza",
                        "itemQuantity": 1,
                        "itemPrice": 500
                    },
                    {
                        "itemName": "Stuffed Chicken",
                        "itemQuantity": 1,
                        "itemPrice": 50
                    }
                ]
            },
            "currentOrderStep": "0",
            "createdAt": "2019-10-05T12:03:30.005Z",
            "collectingRestaurant": {
                "id": 5,
                "name": "Allied bank",
                "phone": "3077633011",
                "address": "canal view",
                "addressDetails": "lahore",
                "collectionServiceCharges": 10,
                "deliveryServiceCharges": 10
            },
            "deliveringRestaurant": {
                "id": 4,
                "name": "sair o sahyat",
                "phone": "12121212",
                "address": "canal view",
                "addressDetails": "lahore pakistan",
                "collectionServiceCharges": 10,
                "deliveryServiceCharges": 10
            },
            "user": {
                "name": "user",
                "phone": "",
                "avatarUrl": ""
            }
        },
        {
            "id": 226,
            "orderStatus": "PENDING",
            "orderItinerary": {
                "collectingServiceCharge": 10,
                "deliveryServiceCharges": 10,
                "items": [
                    {
                        "itemName": "Pizza",
                        "itemQuantity": 1,
                        "itemPrice": 500
                    },
                    {
                        "itemName": "Stuffed Chicken",
                        "itemQuantity": 1,
                        "itemPrice": 50
                    }
                ]
            },
            "currentOrderStep": "0",
            "createdAt": "2019-10-05T12:03:30.005Z",
            "collectingRestaurant": {
                "id": 5,
                "name": "Allied bank",
                "phone": "3077633011",
                "address": "canal view",
                "addressDetails": "lahore",
                "collectionServiceCharges": 10,
                "deliveryServiceCharges": 10
            },
            "deliveringRestaurant": {
                "id": 4,
                "name": "sair o sahyat",
                "phone": "12121212",
                "address": "canal view",
                "addressDetails": "lahore pakistan",
                "collectionServiceCharges": 10,
                "deliveryServiceCharges": 10
            },
            "user": {
                "name": "user",
                "phone": "",
                "avatarUrl": ""
            }
        },
        {
            "id": 226,
            "orderStatus": "PENDING",
            "orderItinerary": {
                "collectingServiceCharge": 10,
                "deliveryServiceCharges": 10,
                "items": [
                    {
                        "itemName": "Pizza",
                        "itemQuantity": 1,
                        "itemPrice": 500
                    },
                    {
                        "itemName": "Stuffed Chicken",
                        "itemQuantity": 1,
                        "itemPrice": 50
                    }
                ]
            },
            "currentOrderStep": "0",
            "createdAt": "2019-10-04T12:03:30.005Z",
            "collectingRestaurant": {
                "id": 5,
                "name": "Allied bank",
                "phone": "3077633011",
                "address": "canal view",
                "addressDetails": "lahore",
                "collectionServiceCharges": 10,
                "deliveryServiceCharges": 10
            },
            "deliveringRestaurant": {
                "id": 4,
                "name": "sair o sahyat",
                "phone": "12121212",
                "address": "canal view",
                "addressDetails": "lahore pakistan",
                "collectionServiceCharges": 10,
                "deliveryServiceCharges": 10
            },
            "user": {
                "name": "user",
                "phone": "",
                "avatarUrl": ""
            }
        }
    ],
    "collections": []
};


var tempDate = new Date(responseObj.deliveries[0].createdAt).getDate();
// console.log(tempDate);
console.log(`showheader ${tempDate}`);
console.log("displaying data")
for (let index = 1; index < responseObj.deliveries.length; index++) {
    let tempDate = new Date(responseObj.deliveries[index-1].createdAt).getDate();
    console.log(tempDate);
    let currentDate = new Date(responseObj.deliveries[index].createdAt).getDate();
    // console.log(responseObj.deliveries[index].createdAt).getDate());
    // console.log(currentDate)
    if(tempDate !== currentDate){
        console.log(`showheader ${currentDate}`);
    }
    console.log("displaying data")
    
}

const arr1 = [5,4,3,1]
const arr2 = [5,2,0]

console.log(_.union(arr1, arr2))