var express = require('express');
const { response, route, render } = require('../app');
var router = express.Router();
const userHelpers = require('../helpers/userhelpers');
const productHelpers = require('../helpers/producthelpers');
const { userDetails } = require('../helpers/adminhelpers');
const client = require('twilio')("AC820e52329f55752815191f21cd65fb0b", "13f9d60a917b462a3f5c519775658b14")

const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox',
  'client_id': 'AY0h8O7slqMdO1WTA9BEJ58Jc-ZycWU6LSrcHbSa45U89B5P40uk964J_-wozw5j9cBLTyn-Qp1INQia',
  'client_secret': 'EPCWSl1TDZfwZdDVKmHrWOvY6gWbFkd4yR97b14o_UieA8ynE37qDdUQ0v4-ZS6QxMqP3Hf1aKzDULZX'
});





/* GET home page. */
router.get('/', userNotLoggedin, function (req, res, next) {

  req.session.userLoggedIn = false
  res.render('index');
});




router.get('/userlogin', userNotLoggedin, (req, res) => {

  let user = req.session.user
  let error = req.session.loginError
  req.session.loginError = false
  res.render('userlogin', { error })

})




router.get('/usersignup', (req, res) => {
  let signError = req.session.signError
  req.session.signError = false;
  if (req.session.signError) {
    res.redirect('/userlogin');
  } else {

    res.render('usersignup', { signError })
  }

})


router.post('/usersignup', userNotLoggedin, (req, res) => {

  userHelpers.doSignup(req.body).then((response) => {
    console.log(response)

    if (response.status) {


      res.redirect('/userlogin')
    }
    else {
      req.session.signError = true

      res.redirect('/usersignup')
    }
  })
})





router.get('/userhome', isUserLoggedIn, async (req, res) => {
  let user = req.session.user
  let cartCount = null;

  cartCount = await userHelpers.getCartCount(req.session.user._id)
  let categoryList= await userHelpers.getCategoryView()

  productHelpers.productView().then((response) => {
    console.log(response);
    res.render('userhome', { response, users: true, cartCount, user});
  })
})


router.get('/mencategory',isUserLoggedIn,async(req,res)=>{
 console.log('mmmmmmmmmmm');
  let men=await userHelpers.menView()
console.log(men,'mennnnn');
res.render('menproduct',{men,user})
})

router.get('/womencategory',isUserLoggedIn,async(req,res)=>{
  console.log('mmmmmmmmmmm');
   let women=await userHelpers.womenView()
 console.log(women,'womeeenn');
 res.render('womenproduct',{women,user})
 })

 router.get('/kidscategory',isUserLoggedIn,async(req,res)=>{
  console.log('mmmmmmmmmmm');
   let kids=await userHelpers.kidsView()
 console.log(kids,'kidsss');
 res.render('kidsproducts',{kids,user})
 })



router.post('/userlogin', userNotLoggedin, (req, res) => {
  userHelpers.doLogin(req.body).then((response) => {
    console.log(response)
    if (response.status) {
      console.log(response.user);
      req.session.userLoggedIn = true
      req.session.user = response.user

      res.redirect('/userhome')
    } else {

      req.session.loginError = true
      res.redirect('/userlogin')
    }
  })
})

router.get('/logout', isUserLoggedIn, (req, res) => {
  req.session.userLoggedIn = false
  res.redirect('/userlogin')
})

router.get('/productdetail/:id', isUserLoggedIn, async (req, res) => {

  cartCount = await userHelpers.getCartCount(req.session.user._id)
  productHelpers.itemDetails(req.params.id).then((response) => {

    res.render('productdetail', { response, user, cartCount })
  })


})

//otp
router.get('/otplogin', (req, res) => {

  if (req.session.userLoggedIn) {
    res.redirect('/userhome')
  } else {
    let loginError = req.session.loginError
    req.session.loginError = false
    res.render('otplogin', { loginError })
  }

  // let loginError=req.session.loginError
  // req.session.userLoggedIn=false
  // req.session.loginError=false
  // res.render('otplogin',{loginError})
})

router.post('/otplogin', (req, res) => {
  console.log(req.body);

  if (req.session.userLoggedIn) {
    res.redirect('/userhome')
  } else {
    userHelpers.otpLogin(req.body).then((response) => {



      let phonenumber = response.user.phonenumber
      console.log(phonenumber);
      client
        .verify
        .services("VA01b0a61c6594dcdf13da1eddbee43e49")
        .verifications
        .create({
          to: `+91${phonenumber}`,
          channel: 'sms'
        }).then((data) => {
          req.session.user = response.phonenumber;
          res.render('otpverification', { phonenumber })
        }).catch((err) => {
          console.log(err, "errrorororor");
        })
    }).catch((response) => {

      req.session.loginError = true;

      res.redirect('/otplogin')
    })

  }

  //  userHelpers.otpLogin(req.body).then((response) => {



  //     let phonenumber = response.user.phonenumber
  //     console.log(phonenumber);
  //     client
  //       .verify
  //       .services("VA01b0a61c6594dcdf13da1eddbee43e49")
  //       .verifications
  //       .create({
  //         to: `+91${phonenumber}`,
  //         channel: 'sms'
  //       }).then((data) => {
  //         req.session.user = response.phonenumber;
  //         res.render('otpverification',{phonenumber})
  //       }).catch((err) => {
  //         console.log(err,"errrorororor");
  //       })
  //   }).catch((response) => {

  //     req.session.loginError = true;

  //     res.redirect('/otplogin')
  //   })
})

router.get('/otpverification', userNotLoggedin, (req, res) => {
  // let phonenumber = req.session.phone
  let otpErr = req.session.otpErr
  req.session.otpErr = false
  res.render('otpverification', { otpErr })
})

router.post('/otpverification', userNotLoggedin, (req, res) => {
  console.log(req.body, "uuuuuuuuuuuuuuuuuuuu");
  client
    .verify
    .services("VA01b0a61c6594dcdf13da1eddbee43e49")
    .verificationChecks
    .create({
      to: `+91${req.body.phonenumber}`,
      code: req.body.otp
    }).then((data) => {
      console.log(data);
      if (data.valid) {
        req.session.user = response.user
        req.session.userLoggedIn = true;
        res.redirect('/userhome')
      } else {
        delete req.session.user

        req.session.otpErr = true;
        console.log('1213456');
        res.redirect('/otplogin')
      }
    }).catch((err) => {
      delete req.session.user

      console.log(err)
      res.redirect('/otplogin')
    })
})

router.get('/cart', isUserLoggedIn, async (req, res) => {

      console.log(req.session.user._id,'userrrriddd');
  let products = await userHelpers.cartView(req.session.user._id)

  let totalAmount = await userHelpers.totalPrice(req.session.user._id)
  console.log(products)
  res.render('cart', { users: true, user: req.session.user._id, products, totalAmount, user })
})


router.get('/addToCart/:id', (req, res) => {
  console.log('api call')
  productId = req.params.id
  userId = req.session.user._id
  console.log(productId, userId)
  userHelpers.addToCart(productId, userId).then((response) => {
    console.log(response, "here is the response");
    res.json({ status: true })
  })

})


router.post('/change-product-quantity', (req, res, next) => {

  userHelpers.changeProductQuantity(req.body).then(async (response) => {
   console.log(req.body,'userridisss');
   console.log( req.session.user._id,'userrrrr');
   response.totalAmount = await userHelpers.totalPrice(req.session.user._id)
    //when we using ajax we only doing passing data in the json format
    res.json(response)
  })

})

router.get('/remove-cart-item/:id', (req, res) => {
  console.log('cartremove call')
  productId = req.params.id
  userId = req.session.user._id
  userHelpers.removeItem(productId, userId).then((response) => {
    console.log(response, 'response of');
    res.json({ response })
  })
})

router.get('/checkcart', isUserLoggedIn, async (req, res) => {
  let totalAmount = await userHelpers.totalPrice(req.session.user._id)
  let products = await userHelpers.cartView(req.session.user._id)
  console.log(products, "productsss");
  product = products.length
  console.log(product, "productssslength");
  if (product == 0) {
    res.redirect('/userhome')
  } else {

    res.render('checkcart', { users: true, totalAmount, user })
  }


})

router.post('/checkcart', isUserLoggedIn, async (req, res) => {
  console.log(req.body,'chechcarttttttttttttttttttttttttttttttttttttttttttt');
  let products = await userHelpers.getCartProductList(req.body.userId)
  // var totalAmount = await userHelpers.totalPrice(req.session.user._id)
  var totalAmount=req.body.totalprice
 
  console.log(totalAmount, "totalamonutaaaaaaaaa");
  userHelpers.placeOrder(req.body, products, totalAmount).then((response) => {
    if (req.body['payment-method'] == 'COD') {
      userHelpers.deleteCart(req.session.user._id)
      res.json({ COD: true })
      //paypal start---
    } else {
      req.session.orderId = response
      var create_payment_json = {
        "intent": "sale",
        "payer": {
          "payment_method": "paypal"
        },
        "redirect_urls": {
          "return_url": "http://localhost:3000/success",
          "cancel_url": "http://localhost:3000/cancel"
        },
        "transactions": [{
          "item_list": {
            "items": [{
              "name": 'item',
              "sku": "item",
              "price": totalAmount,
              "currency": "USD",
              "quantity": 1
            }]
          },
          "amount": {
            "currency": "USD",
            "total": totalAmount
          },
          "description": "This is the payment description."
        }]
      };

      paypal.payment.create(create_payment_json, function (error, payment) {
        console.log(error,"gggggggggggggggggggggggggggggggggggg");
        if (error) {
          throw error;
        } else {
          console.log("Create Payment Response");
          console.log(payment);
          for (let i = 0; i < payment.links.length; i++) {
            if (payment.links[i].rel === 'approval_url') {
              console.log(payment.links[i].href);
              res.json({ url: payment.links[i].href, paypal: true });
            }
          }
        }
      });
    }
  })
})

router.get('/success', async (req, res) => {
  console.log(req.session.user._id, "userId isss")
  let products = await userHelpers.getCartProductList(req.session.user._id)
  console.log(products, 'products aree');
  userHelpers.changePaymentStatus(req.session.orderId, req.session.user._id, products).then(() => {
    req.session.orderId = null
    res.redirect('/userorders')
  })
})
//paypal--ends--

router.get('/userorders', isUserLoggedIn, async (req, res) => {
  console.log(req.session.user._id);
  let orders = await userHelpers.viewOrders(req.session.user._id)
  console.log(orders);
  res.render('userorders', { users: true, orders, user: req.session.user })
})


router.get('/cancelorder/:id', (req, res) => {
  console.log('cancelorder')
  orderId = req.params.id
  userId = req.session.user._id
  console.log(orderId, userId)
  userHelpers.cancelOrder(orderId, userId).then((response) => {
    console.log(response, "here is the response");
    res.json({ status: true })
  })

})


router.get("/order-details/:id", isUserLoggedIn, async (req, res) => {
  let products = await userHelpers.getOrderDetails(req.params.id)
  console.log(products, "order-products")
  res.render('order-details', { users: true, user: req.session.user, products })
})


router.get('/order-cancel/:id', (req, res) => {
  orderId = req.params.id
  userId = req.session.user._id
  userHelpers.orderCancelation(orderId, userId).then((response) => {
    console.log(response, "order cancelled")
    res.json({ status: true })
  })
})

router.get('/userprofile/:id', isUserLoggedIn, async (req, res) => {
  userId = req.params.id
  console.log(userId, "userId is this")
  let userDetails = await userHelpers.userDetails(userId)
  res.render('userprofile', { userDetails, user })
})


router.post('/user-edit-profile', (req, res) => {
  let userDetails = req.body;
  userHelpers.editUserProfile(userDetails).then((response) => {
    //when we using ajax we only doing passing data in the json format
    console.log(response, "response of update")
    res.json(response)
  })

})

router.get('/changepassword/:id', isUserLoggedIn, async (req, res) => {
  userId = req.params.id
  let userDetails = await userHelpers.userDetails(userId)
  res.render('changepassword', { user, userDetails })
})

router.post('/password-verify',isUserLoggedIn, (req, res) => {
  let userDetails = req.body
  console.log(userDetails, "password,id")
  userHelpers.passwordVerify(userDetails).then((response) => { 
console.log(response,"responseeeee");
 res.json(response)

  })

})

router.post('/change-user-password',(req,res)=>{
 console.log(req.body,"passsworddd");
userHelpers.changePassword(req.body).then((response)=>{
  console.log(response,"eeeeeeee");
   res.json(response)
})

})

router.post('/applyCoupon-offer',async(req,res)=>{
  console.log(req.body,"applycoupon");
  let coupon=req.body
  // let couponCode=coupon.toUpperCase()
  console.log(coupon,'couponnnnnn');
  var totalAmount = await userHelpers.totalPrice(req.session.user._id)
   console.log(totalAmount,'tottaaaaaal');
  await userHelpers.verifyCoupon(coupon,totalAmount).then((response)=>{
   console.log(response,'couponavailableeee');
    res.json(response)
  })
})

router.get('/cancelcoupon',(req,res)=>{
  res.redirect('/checkcart')
})

// router.get('/order-return/:id',(res,req)=>{
 
//   console.log(req.params.id,'returnidddd');
//   userHelpers.returnOrder(req.params.id).then((response)=>{
//     res.json(response)

//   })
// })

router.get('/order-return/:id', (req, res) => {
  orderId = req.params.id
  // userId = req.session.user._id
  userHelpers.returnOrder(orderId).then((response) => {
    console.log(response, "order retruned")
    res.json({ status: true })
  })
})

router.get('/userwallet/:id', isUserLoggedIn, async (req, res) => {
  userId = req.params.id
  let userDetails = await userHelpers.userDetails(userId)
  res.render('userwallet', { user, userDetails })
})

// router.get('/categoryitems/:id',(req,res)=>{
//   categoryId=req.params.id
//  console.log(categoryId,'categoryIdddddddddd');
//   let product=userHelpers.categoryProducts(categoryId)
// })







//perventing from direct acessing the home  page
function isUserLoggedIn(req, res, next) {
  if (req.session.userLoggedIn) {
    user = req.session.user
    next()

  } else {
    res.redirect('/userlogin')
  }
}
//preventing from going to login if we logined ones it helps to stay in login terminal 
function userNotLoggedin(req, res, next) {
  console.log(req.session.userLoggedIn)
  if (req.session.userLoggedIn) {
    console.log(req.session.userLoggedIn);
    res.redirect('/userhome')
  } else {
    next()
  }
}
//  function otphome(req,res,next){
//   if(req.session.userLoggedIn){
//     res.redirect('/userhome')
//   }else{
//     res.redirect("/otpverification")

//  }}







module.exports = router;
