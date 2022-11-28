var express = require('express');
var router = express.Router();
const { response } = require('../app');
const userHelpers = require('../helpers/user-helper')
/* GET users listing. */
router.get('/', function (req, res, next) {
 
  let error = req.session.loginError
  req.session.loginError = false
  if (req.session.adminLoggedIn) {
    
    res.redirect("/admin/adminhome")
  } else {
    // req.session.loginError = true
    res.render('adminlogin',{error});
  }

});




router.post('/adminlogin', (req, res) => {
  userHelpers.adminLogin(req.body).then((response) => {
    if (response.status) {
      req.session.adminLoggedIn = true
      req.session.admin = response.user
      res.redirect('/admin/adminhome');
    }
    else {

      req.session.loginError = true
      res.redirect('/admin')
    }
  })
})


router.get('/adminhome',isadminLoggedIn, (req, res) => {
  res.render('adminhome')
})


router.get('/adminlogout',isadminLoggedIn, (req, res) => {

  req.session.adminLoggedIn = false
  res.redirect('/admin')
})

router.get('/deleteuser/:id',isadminLoggedIn, (req, res) => {
  let userId = req.params.id
  userHelpers.doDelete(userId).then((response) => {
    res.redirect('/admin/viewuser')
  })


})

router.get('/viewuser',isadminLoggedIn, (req, res) => {
  userHelpers.doView().then((response) => {
    // console.log(response);
    res.render('viewuser', { response })
  })

})



router.get('/insertuser',isadminLoggedIn, (req, res) => {
  let insertError=req.session.insertError
  req.session.insertError=false
  if(req.session.insertError){
    res.render('insertuser')
  }else{
    res.render('insertuser',{insertError})
  }
  
})
router.post('/insertuser', (req, res) => {

  userHelpers.doInsert(req.body).then((response) => {
   
    if (response.status) {
      res.redirect('/admin/insertuser')

    }
    else {
     req.session.insertError=true
      res.redirect('/admin/insertuser')
    }
  })
})

router.get('/edituser/:id', async (req, res) => {
  let user = await userHelpers.userDetails(req.params.id)
  console.log(user);
  res.render('edituser', { user })
})

router.post('/edituser/:id', (req, res) => {
  userHelpers.updateUser(req.params.id, req.body).then(() => {
    res.redirect('/admin/viewuser')
  })
})



router.get('/home', (req, res) => {

  res.redirect('/admin/adminhome')
})

router.get('/back', (req, res) => {

  res.redirect('/admin/viewuser')
})


//perventing from direct acessing the home  page
function isadminLoggedIn(req,res,next){
  if(req.session.adminLoggedIn){
      next()
  }else{
      res.redirect('/admin')
  }
}










module.exports = router;
