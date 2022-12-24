var db = require('../config/connection')
var collection = require('../config/collections')
const bcrypt = require('bcrypt')
const { response } = require('../app')
const e = require('express')
const { userDetails } = require('./adminhelpers')
var objectId = require('mongodb').ObjectId
module.exports = {


    doSignup: (userData) => {
        // console.log(userData)
        //if promise or callback is not used it will return a null result
        return new Promise(async (resolve, reject) => {
            // console.log(userData)
            try {
                let user = await db.get().collection(collection.USER_COLLECTIONS).findOne({ email: userData.email })

                if (user == null) {
                    userData.password = await bcrypt.hash(userData.password, 10)
                    userData.status = true;
                    db.get().collection(collection.USER_COLLECTIONS).insertOne(userData).then((data) => {

                        resolve({ status: true })


                    })
                }
                else {
                    resolve({ status: false })
                }





            }
            catch {


                resolve({ status: false })

            }



        })


    },

    doLogin: (userData) => {

        return new Promise(async (resolve, reject) => {
            let loginStatus = false;
            let response = {}

            try {
                let user = await db.get().collection(collection.USER_COLLECTIONS).findOne({ email: userData.email })
                if (user) {

                    if (user.status == true) {
                        console.log(userData, user)
                        await bcrypt.compare(userData.password, user.password).then((status) => {
                            console.log(status)
                            console.log(user.status)
                            console.log("user is not blocked");
                            if (status) {
                                console.log("login success");
                                response.user = user
                                response.status = true
                                resolve(response)
                            } else {
                                console.log("login failed");
                                resolve({ status: false })
                            }
                        })
                    } else {
                        console.log("user blocked")
                        resolve({ status: false })
                    }
                }


                else {
                    console.log("login failed");
                    resolve({ status: false })
                }

            } catch {
                reject()
            }



        })
    },

    otpLogin: (userData) => {
        let response = {};
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.USER_COLLECTIONS).findOne({ phonenumber: userData.phonenumber })
            console.log(user);
            if (user) {
                response.user = user;
                response.status = true;
                resolve(response);
            } else {
                console.log('Login Failed');
                resolve({ status: false })
            }
        }
        )
    },

    addToCart: (productId, userId) => {

        let productObj = {
            item: objectId(productId),
            quantity: 1
        }




        return new Promise(async (resolve, reject) => {
            let userCart = await db.get().collection(collection.CART_COLLECTIONS).findOne({ user: objectId(userId) })

            if (userCart) {
                let productExist = userCart.products.findIndex(product => product.item == productId)
                console.log(productExist)
                //if 0 it means there is no product
                if (productExist != -1) {
                    db.get().collection(collection.CART_COLLECTIONS).updateOne({ user: objectId(userId), 'products.item': objectId(productId) },
                        {   //$ sign to change elements in a array in DB
                            $inc: { 'products.$.quantity': 1 }
                        }
                    ).then(() => {
                        resolve()
                    })
                } else {
                    db.get().collection(collection.CART_COLLECTIONS).updateOne({ user: objectId(userId) },
                        {
                            $push: {
                                products: productObj
                            }
                        }).then((response) => {
                            console.log(response);
                            resolve(response)
                        })
                }
            } else {

                let cartObj = {
                    user: objectId(userId),
                    products: [productObj]
                }
                db.get().collection(collection.CART_COLLECTIONS).insertOne(cartObj).then((response) => {
                    console.log(response);
                    resolve(response)
                })
            }

        })
    },


    cartView: (userId) => {
        return new Promise(async (resolve, reject) => {
            let cartItems = await db.get().collection(collection.CART_COLLECTIONS).aggregate([

                {
                    $match: { user: objectId(userId) }

                },

                {
                    $unwind: '$products'
                },
                {
                    $project: {
                        item: '$products.item',
                        quantity: "$products.quantity"
                    }
                },
                {
                    $lookup: {
                        from: collection.PRODUCT_COLLECTIONS,
                        localField: "item",
                        foreignField: '_id',
                        as: 'productDetails'
                    }
                },
                {
                    $project: {
                        item: 1, quantity: 1, productDetails: { $arrayElemAt: ['$productDetails', 0] }
                    }

                },


                // {
                //     $lookup:{

                //         from:collection.PRODUCT_COLLECTIONS,
                //        let:{productList:'$products'},

                //        pipeline:[
                //         {
                //             //for match products id in the product array
                //              $match:{
                //                 $expr:{
                //                     $in:['$_id','$$productList']
                //                 }
                //              }
                //         }

                //        ],
                //        as:'cartItems'

                //     }
                // }
            ]).toArray()

            //   console.log(cartItems[0].productDetails,"hlooo");
            resolve(cartItems)


        })

    },

    getCartCount: (userId) => {
        return new Promise(async (resolve, reject) => {
            let count = 0;
            let cart = await db.get().collection(collection.CART_COLLECTIONS).findOne({ user: objectId(userId) })
            console.log(cart, 'this is cart')
            if (cart) {

                count = cart.products.length
            }
            resolve(count)
        })
    },

    changeProductQuantity: (details) => {
        console.log(details, 'hohoho')
        details.count = parseInt(details.count)
        details.quantity = parseInt(details.quantity)

        //    console.log(cartId,count,productId,"hohohohohoho")
        return new Promise((resolve, reject) => {
            if (details.count == -1 && details.quantity == 1) {
                db.get().collection(collection.CART_COLLECTIONS).updateOne({ _id: objectId(details.cart) }, {
                    $pull: { products: { item: objectId(details.product) } }
                }).then((response) => {
                    resolve({ removeProduct: true })
                })
            } else {

                db.get().collection(collection.CART_COLLECTIONS).updateOne({ _id: objectId(details.cart), 'products.item': objectId(details.product) },
                    {   //$ sign to change elements in a array in DB
                        $inc: { 'products.$.quantity': details.count }
                    }
                ).then((response) => {
                    resolve({ status: true })
                })



            }


        })
    },

    removeItem: (productId, userId) => {

        return new Promise((resolve, reject) => {
            db.get().collection(collection.CART_COLLECTIONS).updateOne({ user: objectId(userId) }, {
                $pull: { products: { item: objectId(productId) } }
            }
            ).then((response) => {
                resolve(response)
            })
        })
    },




    totalPrice: (userId) => {

        return new Promise(async (resolve, reject) => {



            let total = await db.get().collection(collection.CART_COLLECTIONS).aggregate([

                {
                    $match: { user: objectId(userId) }

                },

                {
                    $unwind: '$products'
                },
                {
                    $project: {
                        item: '$products.item',
                        quantity: "$products.quantity"
                    }
                },
                {
                    $lookup: {
                        from: collection.PRODUCT_COLLECTIONS,
                        localField: "item",
                        foreignField: '_id',
                        as: 'productDetails'
                    }
                },
                {
                    $project: {
                        item: 1, quantity: 1, productDetails: { $arrayElemAt: ['$productDetails', 0] }
                    }

                },
                {



                    $group: {
                        _id: null,

                        total: { $sum: { $multiply: [{ $toInt: '$quantity' }, { $toInt: '$productDetails.price' }] } }

                    }


                }
            ]).toArray()
            //  console.log(total);
            resolve(total[0]?.total)

        })
    },

    placeOrder: (order, products, total) => {
        return new Promise((resolve, reject) => {
            console.log(order, products, total)
            let status = order['payment-method'] === 'COD' ? 'placed' : 'pending'
            let date = new Date()
            let orderObj = {
                deliveryDetails: {
                    name: order.name,
                    email: order.email,
                    mobile: order.phonenumber,
                    address: order.address,
                    pincode: order.pincode,
                },
                userId: objectId(order.userId),
                paymentMethod: order['payment-method'],
                products: products,
                totalAmount: total,
                date: date,
                displayDate: date.toDateString(),
                status: status
            }
            db.get().collection(collection.ORDER_COLLECTIONS).insertOne(orderObj).then((response) => {
                console.log(response, "okiiiiiiiiiiiiiiiiiii");
                resolve(response.insertedId)
            })

        })
    },

    deleteCart: (userId) => {
        db.get().collection(collection.CART_COLLECTIONS).deleteOne({ user: objectId(userId) })
           
        
    },

    getCartProductList: (userId) => {
        console.log(userId, "userId isss");
        return new Promise(async (resolve, reject) => {
            let cart = await db.get().collection(collection.CART_COLLECTIONS).findOne({ user: objectId(userId) })
            console.log(cart, ":cart");
            resolve(cart?.products)
        })
    },

    viewOrders: (userId) => {
        return new Promise(async (resolve, reject) => {
            let myOrders = await db.get().collection(collection.ORDER_COLLECTIONS).find({ userId: objectId(userId) }).toArray()
            console.log(myOrders, "myorders")
            resolve(myOrders)
        })
    },


    cancelOrder: (orderId, userId) => {
        console.log('orderid,userid', orderId, userId);
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.ORDER_COLLECTIONS).find({ userId: objectId(userId) })
            if (user) {
                console.log(user, 'i am the user')
                db.get().collection(collection.ORDER_COLLECTIONS).deleteOne({ _id: objectId(orderId) }).then((response) => {
                    resolve(response)
                })

            } else {
                resolve(response)
            }


        })

    },
    getOrderDetails: (orderId) => {

        return new Promise(async (resolve, reject) => {
            let orderItems = await db.get().collection(collection.ORDER_COLLECTIONS).aggregate([

                {
                    $match: { _id: objectId(orderId) }

                },

                {
                    $unwind: '$products'
                },
                {
                    $project: {
                        item: '$products.item',
                        quantity: "$products.quantity"
                    }
                },
                {
                    $lookup: {
                        from: collection.PRODUCT_COLLECTIONS,
                        localField: "item",
                        foreignField: '_id',
                        as: 'productDetails'
                    }
                },
                {
                    $project: {
                        item: 1, quantity: 1, productDetails: { $arrayElemAt: ['$productDetails', 0] }
                    }

                },

            ]).toArray()

            console.log(orderItems, "hloooOrderItems");
            resolve(orderItems)


        })


    },

    orderCancelation: (orderId, userId) => {
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.ORDER_COLLECTIONS).find({ userId: objectId(userId) })
            if (user) {
                db.get().collection(collection.ORDER_COLLECTIONS).updateOne({ _id: objectId(orderId) }, [{ '$set': { status: 'cancelled' } }]).then((response) => {
                    resolve(response)
                })
            } else {
                resolve(response)
            }

        })

    },

    editUserProfile: (userDetails) => {
        return new Promise((resolve, reject) => {
            console.log(userDetails.userId, "userDetails,userId")
            db.get().collection(collection.USER_COLLECTIONS).updateOne({ _id: objectId(userDetails.userId) }, {
                $set:
                {
                    fname: userDetails.fname,
                    email: userDetails.email,
                    phonenumber: userDetails.phonenumber,
                    address: userDetails.address
                }
            }).then((response) => {
                console.log('upadted')
                resolve(response)
            })
        })
    },

    viewUsers: (userId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.USER_COLLECTIONS).findOne({ _id: objectId(userId) }).then((user) => {
                resolve(user)

            })
        })
    },

    userDetails: (userId) => {

        return new Promise((resolve, reject) => {
            db.get().collection(collection.USER_COLLECTIONS).findOne({ _id: objectId(userId) }).then((response) => {
                resolve(response)
            })
        })


    },

    changePaymentStatus: (orderId, userId, products) => {
        console.log(orderId, userId, products, "details areeee")
        return new Promise((resolve, reject) => {
            products.forEach(async (item) => {
                let response = db.get().collection(collection.ORDER_COLLECTIONS).updateOne({ _id: objectId(orderId) }, [{ '$set': { status: 'placed' } }])
                // await db.get().collection(collection.PRODUCT_COLLECTIONS)
                //     .updateOne({
                //         _id: objectId(item.item)
                //     }, {
                //         $inc: {
                //             stock: -(item.quantity)
                //         }
                //     })
                console.log(response, 'responseeeeeeeeeeeeeee');
            })
            db.get().collection(collection.CART_COLLECTIONS)
                .deleteOne({
                    user: objectId(userId)
                })
            resolve()
        })
    },





}



