var express = require('express');
var router = express.Router();
const { response } = require('../app');
const adminHelpers = require('../helpers/adminhelpers');
const productHelpers = require('../helpers/producthelpers');
// var fileUpload=require('express-fileupload');
const cloudinary = require('../utils/cloudinary')
const multer = require('multer')
const path = require('path');

upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname)
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".webp") {
      cb(new Error("File type is not supported"), false)
      console.log('Its workinggggggggggggggggggggg');
      return
    }
    cb(null, true)
  }
})

// const { route } = require('.');
/* GET home page. */

router.get('/', isuserNotLoggedin, function (req, res, next) {
  let error = req.session.loginError
  req.session.adminLoggedIn = false
  req.session.loginError = false
  if (req.session.adminLoggedIn) {

    res.redirect("/admin/adminuserslist")
  } else {
    res.render('admin');
  }
})

router.get('/admindashboard', isadminLoggedIn, function (req, res) {
  res.render('admindashboard', { admin: true });
})





router.post('/admin', (req, res) => {
  console.log(req.body, "hiii")
  adminHelpers.adminLogin(req.body).then((response) => {
    if (response.status) {
      req.session.adminLoggedIn = true
      req.session.admin = response.user
      res.redirect('/admin/admindashboard');
    }
    else {

      req.session.adminloginError = true
      res.redirect('/admin')
    }
  })
})

// router.get('/adminuserslist',function(req,res){
//   res.render('adminuserslist',{admin:true});
// })

router.get('/adminuserslist', isadminLoggedIn, (req, res) => {
  adminHelpers.doView().then((response) => {
    console.log(response);
    res.render('adminuserslist', { response, admin: true })
  })

})

router.get('/deleteuser/:id', (req, res) => {
  let userId = req.params.id
  adminHelpers.doDelete(userId).then((response) => {
    res.redirect('/admin/adminuserslist')
  })


})


router.get('/blockuser/:id', (req, res) => {
  let userId = req.params.id
  adminHelpers.userBlock(userId).then((response) => {
    console.log(response);
    res.redirect('/admin/adminuserslist')
  })


})

router.get('/edituser/:id', async (req, res) => {
  let user = await adminHelpers.userDetails(req.params.id)
  console.log(user);
  res.render('edituser', { admin: true, user })
})

router.post('/edituser/:id', (req, res) => {
  adminHelpers.updateUser(req.params.id, req.body).then(() => {
    res.redirect('/admin/adminuserslist')
  })
})

router.get('/insertuser', (req, res) => {
  let insertError = req.session.insertError
  req.session.insertError = false
  if (req.session.insertError) {
    res.render('/insertuser', { admin: true })
  } else {
    res.render('insertuser', { insertError, admin: true })
  }

})

router.post('/insertuser', (req, res) => {

  adminHelpers.doInsert(req.body).then((response) => {

    if (response.status) {
      res.redirect('/admin/insertuser')

    }
    else {
      req.session.insertError = true
      res.redirect('/admin/insertuser')
    }
  })
})

router.get('/back', (req, res) => {
  res.redirect('/admin/adminuserslist')

})

router.get('/admincategory', isadminLoggedIn, (req, res) => {
  productHelpers.categoryView().then((response) => {
    res.render('admincategory', { response, admin: true })

  })

})

router.get('/adminproduct', isadminLoggedIn, (req, res) => {
  productHelpers.productView().then((response) => {
    console.log(response);
    res.render('adminproduct', { response, admin: true })
  })
})


router.get('/addproducts', (req, res) => {

  //setting category view on adding products 
  productHelpers.categoryView().then((response) => {
    res.render('addproducts', { response })
  })
})

router.get('/backadminproduct', (req, res) => {

  res.redirect('/admin/adminproduct')
})


//  router.post('/addproducts',async (req,res)=>{
//   // console.log(req.body);
//   let product =req.body

//   let cateName=await productHelpers.findCategory(product.category)
//   product.categoryId = product.category

//   product.category=cateName.name
//   //adding category name to product

//   productHelpers.addProduct(product).then((response)=>{
//     console.log(response);
//       let image=req.files.image
//       image.mv('./public/product-images/'+response.id+'.jpg',(err,done)=>{
//         // C:\Users\ATHUL\OneDrive\Desktop\eCommerceProject\public\product-images

// if(!err){
//   res.render('addproducts')
// }else{
//   console.log(err);
// }

//       })

//   })
//  })










router.post('/addproducts', upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },

]), async (req, res) => {
  console.log(req.files);
  const cloudinaryImageUploadMethod = (file) => {
    console.log("qwertyui");
    return new Promise((resolve) => {
      cloudinary.uploader.upload(file, (err, res) => {
        console.log(err, " asdfgh");
        if (err)
          console.log(err,"sssssssssssssssssssssssss");
        resolve(res.secure_url)
      })
    })
  }

  const files = req.files
  let arr1 = Object.values(files)
  let arr2 = arr1.flat()
  const urls = await Promise.all(
    arr2.map(async (file) => {
      const { path } = file
      const result = await cloudinaryImageUploadMethod(path)
      return result
    })
  )
  console.log(urls);
  // console.log(req.body);
  let product = req.body

  let cateName = await productHelpers.findCategory(product.category)
  product.categoryId = product.category

  product.category = cateName.name
  //adding category name to product

  productHelpers.addProduct(product, urls).then((response) => {
    console.log(response);
    res.redirect('/admin/adminproduct')

  })
})















router.get('/deleteproducts/:id', (req, res) => {
  let productId = req.params.id
  productHelpers.productDelete(productId).then((response) => {
    res.redirect('/admin/adminproduct')
  })


})

router.get('/editproducts/:id', async (req, res) => {
  let product = await productHelpers.productDetails(req.params.id)
  let category = await productHelpers.categoryView(req.params.id)
  console.log(product);
  res.render('editproducts', { admin: true, product, category })
})



// router.post('/editproducts/:id', async (req, res) => {

//   let product=req.body;
//   let cateName=await productHelpers.findCategoryName(product.category)

//   product.categoryId=cateName._id
//   product.category=cateName.name


//   productHelpers.updateProducts(req.params.id, product).then(() => {
//     res.redirect('/admin/adminproduct')

//     if(req?.files?.image){

//     let image=req.files.image
//       image.mv('./public/product-images/'+req.params.id+'.jpg')

//     }


//   })
// })






router.post('/editproducts/:id', upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  //multer code
]), async (req, res) => {
  console.log(req.files);
  const cloudinaryImageUploadMethod = (file) => {
    console.log("qwertyui");
    return new Promise((resolve) => {
      cloudinary.uploader.upload(file, (err, res) => {
        console.log(err, " asdfgh");
        if (err) return res.status(500).send("Upload Image Error")
        resolve(res.secure_url)
      })
    })
  }

  const files = req.files
  let arr1 = Object.values(files)
  let arr2 = arr1.flat()
  const urls = await Promise.all(
    arr2.map(async (file) => {
      const { path } = file
      const result = await cloudinaryImageUploadMethod(path)
      return result
    })
  )
  console.log(urls);





  let product = req.body;
  let cateName = await productHelpers.findCategoryName(product.category)

  product.categoryId = cateName._id
  product.category = cateName.name


  productHelpers.updateProducts(req.params.id, product, urls).then(() => {
    res.redirect('/admin/adminproduct')



  })
})












router.get('/addcategory', (req, res) => {

  res.render('addcategory', { admin: true })
})

router.post('/addcategory', (req, res) => {

  productHelpers.insertCategory(req.body).then((response) => {

    if (response.status) {
      res.redirect('/admin/admincategory')

    }
    else {

      res.redirect('/admin/addcategory')
    }
  })
})


router.get('/categoryback', (req, res) => {
  res.redirect('/admin/admincategory')
})

router.get('/editcategory/:id', async (req, res) => {
  let category = await productHelpers.categoryDetails(req.params.id)
  console.log(category);
  res.render('editcategory', { admin: true, category })


})

router.post('/editcategory/:id', (req, res) => {
  productHelpers.updatecategory(req.params.id, req.body).then(() => {
    res.redirect('/admin/admincategory')
  })
})

router.get('/deletecategory/:id', (req, res) => {
  productHelpers.deleteCategory(req.params.id).then((response) => {
    res.redirect('/admin/admincategory')
  })
})

router.get('/adminlogout', (req, res) => {
  req.session.adminLoggedIn = false
  res.redirect('/admin')

})

router.get('/adminorders', (req, res) => {
  adminHelpers.userOrderView().then((response) => {
    res.render('adminorders', { admin: true, response })
  })

})

router.get('/cancel-userorder/:id', (req, res) => {
  orderId = req.params.id
  adminHelpers.cancelOrder(orderId).then((response) => {
    res.json({ status: true })
  })
})

// router.get('/cancel-userorder/:id', (req, res) => {
//   orderId = req.params.id
//   adminHelpers.cancelOrder(orderId).then((response) => {
//     res.redirect('/admin/adminorders')
//   })
// })


router.get('/shipping-userorder/:id', (req, res) => {
  orderId = req.params.id
  adminHelpers.shippingOrder(orderId).then((response) => {
    res.json({ status: true })
  })
})


router.get('/deliverd-userorder/:id', (req, res) => {
  orderId = req.params.id
  adminHelpers.deliverdOrder(orderId).then((response) => {
    res.json({ status: true })
  })
})










// preventing the direct acessing the home page
function isadminLoggedIn(req, res, next) {
  if (req.session.adminLoggedIn) {
    next()
  } else {
    res.redirect('/admin')
  }
}


function isuserNotLoggedin(req, res, next) {
  if (req.session.adminLoggedIn) {
    res.redirect('/admin/adminuserslist')
  } else {
    next()
  }
}





module.exports = router;



