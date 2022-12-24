var db = require('../config/connection')
var collection = require('../config/collections')
const bcrypt=require('bcrypt')
const { response } = require('../app')
var objectId=require('mongodb').ObjectId
module.exports={

    adminLogin: (userData) => {
        console.log(userData,"hihi")
        
        return new Promise(async (resolve, reject) => {
            
                let loginStatus = false
                let response = {}
                try{
                    let user = await db.get().collection(collection.ADMIN_COLLECTIONS).findOne({ email: userData.email })
                    if (user) {
                        console.log(userData, user)
                        await bcrypt.compare(userData.password, user.password).then((status) => {
                            console.log(status)
                                if(status){
        
                                    console.log("login success");
                                    response.user=user
                                    response.status=true
                                    resolve(response)

        
                                }else{
                                    console.log("login failed");
                                    resolve({status:false})
                                }
                        })
                    } else {
                        console.log("login failed");
                        resolve({status:false})
                    }
                }catch{
                    reject()
                }
                
            
            

        })
    },
    

    doView: (userData) => {
        
        return new Promise(async (resolve, reject) => {
        let user = await db.get().collection(collection.USER_COLLECTIONS).find().toArray();
         resolve(user)       
                
            
            

        })
    },



    doDelete:(userId)=>{
    
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTIONS).deleteOne({_id:objectId(userId)}).then((response)=>{
               console.log(response);
                resolve(response)
            })
        })
       },


       userDetails:(userId)=>{
        return new Promise ((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTIONS).findOne({_id:objectId(userId)}).then((user)=>{
                resolve(user)
            })
        })
     },
    
     updateUser:(userId,userDetails)=>{
    //  console.log(userDetails)
        return new Promise((resolve,reject)=>{
            console.log(userDetails);
            db.get().collection(collection.USER_COLLECTIONS).updateOne({_id:objectId(userId)},{$set:
                {fname:userDetails.fname,
                email:userDetails.email}
        }).then((response)=>{
            console.log("updated");
            resolve()
        })
        })
    
     },
    
     doInsert: (userData) => {
        console.log(userData)
        
        return new Promise(async (resolve, reject) => {
           try{
            let user = await db.get().collection(collection.USER_COLLECTIONS).findOne({ email: userData.email })
            if (user == null) {
                userData.password = await bcrypt.hash(userData.password, 10)
                db.get().collection(collection.USER_COLLECTIONS).insertOne(userData).then((data) => {
                   
                        resolve({status:true})
                       
                    
                })
            }else{
                resolve({status:false})
            }
                
               
            


           }catch{
            
                
                resolve({status:false})
            
           }
           


        })


    },

    userBlock:(userId)=>{
        return new Promise((resolve,reject)=>{
            console.log(userId);
            db.get().collection(collection.USER_COLLECTIONS).updateOne({_id:objectId(userId)},[{"$set":{status:{"$not":"$status"}}}]).then((response)=>{
                console.log(response);
                 resolve(response)

        })

    })

    

},

userOrderView:()=>{
    return new Promise(async(resolve,reject)=>{
        let orders=await db.get().collection(collection.ORDER_COLLECTIONS).find().toArray()
        resolve(orders)
    })
},

cancelOrder:(orderId)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(collection.ORDER_COLLECTIONS).updateOne({_id:objectId(orderId)},[{'$set':{status:'cancelled'}}]).then((response)=>{
            resolve(response)
        })
      resolve(response)
    })
},

shippingOrder:(orderId)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(collection.ORDER_COLLECTIONS).updateOne({_id:objectId(orderId)},[{'$set':{status:'shipped'}}]).then((response)=>{
            resolve(response)
        })
      resolve(response)
    })


},



deliverdOrder:(orderId)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(collection.ORDER_COLLECTIONS).updateOne({_id:objectId(orderId)},[{'$set':{status:'deliverd'}}]).then((response)=>{
            resolve(response)
        })
      resolve(response)
    })
}
}