var db = require('../config/connection')
var collection = require('../config/collections')
const bcrypt = require('bcrypt')
const { response } = require('../app')
var objectId=require('mongodb').ObjectId
module.exports = {

    doSignup: (userData) => {
        //if promise or callback is not used it will return a null result
        return new Promise(async (resolve, reject) => {
           try{
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ email: userData.email })
            if (user == null) {
                userData.password = await bcrypt.hash(userData.password, 10)
                db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data) => {
                   
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

    doLogin: (userData) => {
        
        return new Promise(async (resolve, reject) => {
            
                let loginStatus = false
                let response = {}
                try{
                    let user = await db.get().collection(collection.USER_COLLECTION).findOne({ email: userData.email })
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
   
    adminLogin: (userData) => {
        
        return new Promise(async (resolve, reject) => {
            
                let loginStatus = false
                let response = {}
                try{
                    let user = await db.get().collection(collection.ADMIN_COLLECTION).findOne({ username: userData.username })
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
    doInsert: (userData) => {
        console.log(userData)
        
        return new Promise(async (resolve, reject) => {
           try{
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ email: userData.email })
            if (user == null) {
                userData.password = await bcrypt.hash(userData.password, 10)
                db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data) => {
                   
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

    doView: (userData) => {
        
        return new Promise(async (resolve, reject) => {
        let user = await db.get().collection(collection.USER_COLLECTION).find().toArray();
         resolve(user)       
                
            
            

        })
    },
   

   doDelete:(userId)=>{
    
    return new Promise((resolve,reject)=>{
        db.get().collection(collection.USER_COLLECTION).deleteOne({_id:objectId(userId)}).then((response)=>{
           console.log(response);
            resolve(response)
        })
    })
   },

 userDetails:(userId)=>{
    return new Promise ((resolve,reject)=>{
        db.get().collection(collection.USER_COLLECTION).findOne({_id:objectId(userId)}).then((user)=>{
            resolve(user)
        })
    })
 },

 updateUser:(userId,userDetails)=>{

    return new Promise((resolve,reject)=>{
        db.get().collection(collection.USER_COLLECTION).updateOne({_id:objectId(userId)},{$set:
            {name:userDetails.name,
            email:userDetails.email}
    }).then((response)=>{
        resolve()
    })
    })

 }



}