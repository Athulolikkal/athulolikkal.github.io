var db = require('../config/connection')
var collection = require('../config/collections')
const { response } = require('../app')
const { userDetails } = require('./adminhelpers')
var objectId=require('mongodb').ObjectId
module.exports={

// addProduct:(product)=>{
//     console.log(product) ;
//     db.collection('product').insertOne(product).then((data)=>{

//     })
// }


addProduct: (product,urls) => {
   
    // product.price=parseInt(product.price)

    return new Promise(async (resolve, reject) => {
      product.image=urls
        console.log(product)
    
               
            db.get().collection(collection.PRODUCT_COLLECTIONS).insertOne(product).then((data) => {
               console.log('product added')
                console.log(data)   

                let response={
                 
                    id:data.insertedId,
                    status:true

                }
               resolve(response)
                   
                
            })
       
       })
},






productView: (productData) => {
        
    return new Promise(async (resolve, reject) => {
    let product = await db.get().collection(collection.PRODUCT_COLLECTIONS).find().toArray();
     resolve(product)       
            
        
        

    })
},



productDelete:(productId)=>{
    
    return new Promise((resolve,reject)=>{
        db.get().collection(collection.PRODUCT_COLLECTIONS).deleteOne({_id:objectId(productId)}).then((response)=>{
           console.log(response);
            resolve(response)
        })
    })
   },




productDetails:(productId)=>{
    return new Promise ((resolve,reject)=>{
        db.get().collection(collection.PRODUCT_COLLECTIONS).findOne({_id:objectId(productId)}).then((product)=>{
            resolve(product);
            console.log(product)
        })
    })
 },


 updateProducts:(productId,productDetails,urls)=>{
    //  console.log(userDetails)
        return new Promise((resolve,reject)=>{
            console.log(productDetails);
            db.get().collection(collection.PRODUCT_COLLECTIONS).updateOne({_id:objectId(productId)},{$set:
                {name:productDetails.name,
                category:productDetails.category,
                description:productDetails.description,
                price:productDetails.price,
               image:urls,
             categoryId:productDetails.categoryId.toString()
            }
        }).then((response)=>{
            console.log("updated");
            resolve()
        })
        })
    
     },
    
insertCategory:(categoryDetails)=>{
    console.log(categoryDetails)
    return new Promise(async(resolve,reject)=>{
   try{

    categoryDetails.name=categoryDetails.name.toUpperCase();
    // categoryDetails.name=capitalizeFirstLetter(categoryDetails.name);

//     function capitalizeFirstLetter(string) {
//      return string.charAt(0).toUpperCase() + string.slice(1);
//    }

    let category=await db.get().collection(collection.CATEGORY_COLLECTIONS).findOne({name:categoryDetails.name})
   console.log(category);
    if(category==null){
      console.log(categoryDetails)
      


      // categoryDetails.status=true;
        db.get().collection(collection.CATEGORY_COLLECTIONS).insertOne(categoryDetails).then((data)=>{
            console.log("success")
            resolve({status:true})
        })

    }else{
        console.log("falid")
        resolve({status:false})
    }
   }catch{
    resolve({status:false})
   }
        
})
},

categoryView:(categoryData)=>{
    return new Promise((resolve,reject)=>{
        let category=db.get().collection(collection.CATEGORY_COLLECTIONS).find().toArray();
        resolve(category)
    })
},



categoryDetails:(categoryId)=>{
    console.log(categoryId)
    return new Promise ((resolve,reject)=>{
        db.get().collection(collection.CATEGORY_COLLECTIONS).findOne({_id:objectId(categoryId)}).then((response)=>{
          console.log(response);
            resolve(response)
        })
    })
},


updatecategory:(categoryId,categoryDetails)=>{
    //  console.log(userDetails)
        return new Promise((resolve,reject)=>{
            console.log(categoryDetails);
            categoryDetails.name=categoryDetails.name.toUpperCase();
            db.get().collection(collection.CATEGORY_COLLECTIONS).updateOne({_id:objectId(categoryId)},{$set:
                {name:categoryDetails.name,
                details:categoryDetails.details
                
            }
        }).then((response)=>{
            console.log("updated");
            resolve()
        })
        })
    
     },


     deleteCategory:(categoryId)=>{
        console.log(categoryId)
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.CATEGORY_COLLECTIONS).deleteOne({_id:objectId(categoryId)}).then((response)=>{
                resolve(response)
            })
        })
     },

     itemDetails:(productId)=>{
        return new Promise ((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTIONS).findOne({_id:objectId(productId)}).then((response)=>{
              console.log(response);
                resolve(response)

     
            })
        })
    },

    findCategory:(categoryId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.CATEGORY_COLLECTIONS).findOne({_id:objectId(categoryId)}).then((categoryData)=>{
                resolve(categoryData)
            })
        })
    },

    findCategoryName:(categoryName)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.CATEGORY_COLLECTIONS).findOne({name:categoryName}).then((response)=>{
                resolve(response)
            })

            })
        
    },


}