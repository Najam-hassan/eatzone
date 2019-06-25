const data = [
    {
        "id": 1,
        "orderStatus": "PENDING",
        "createdAt": "2019-06-25T13:10:33.881Z",
        "collectingRestaurant": {
            "name": "Allied  School test",
            "phone": "03418995054",
            "collectionServiceCharges": 25,
            "deliveryServiceCharges": 12
        },
        "deliveringRestaurant": {
            "name": "KFC JOHAR TOWN",
            "phone": "0852369741",
            "collectionServiceCharges": 10,
            "deliveryServiceCharges": 15
        },
        "user": {
            "name": "Sajid Ali",
            "phone": null,
            "avatarUrl": "https://food-aio.s3.us-east-2.amazonaws.com/users/user_13/avatar.jpg"
        },
        "order_items": [
            {
                "itemQuantity": 1,
                "menu_item": {
                    "name": "Red grapes juice",
                    "price": 550
                }
            },
            {
                "itemQuantity": 1,
                "menu_item": {
                    "name": "Orange juice",
                    "price": 258.05
                }
            },
            {
                "itemQuantity": 1,
                "menu_item": {
                    "name": "Green tea",
                    "price": 280.05
                }
            }
        ]
    }
]


let result = data[0].order_items.reduce((sum, item) => sum + 1)

let kappa = data[0].order_items.reduce((sum, num) => sum + (num.itemQuantity * num.menu_item.price), 0);
console.log(kappa);
// console.log(result);
