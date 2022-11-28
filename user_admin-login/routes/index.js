var express = require('express');
const { response } = require('../app');
var router = express.Router();
const userHelpers=require('../helpers/user-helper')

/* GET home page. */
router.get('/',userNotLoggedin, function(req, res) {
  let error = req.session.loginError
  req.session.loginError = false
 
  res.render('index',{error});
});
 
router.get('/signup',(req,res,)=>{
  let signError=req.session.signError
  req.session.signError=false;
  if(req.session.signError){
    res.redirect('/index');
  }else{
    res.render('signup',{signError})
  }
 
  
  
})

router.get('/index',userNotLoggedin,(req,res)=>{
 let error=req.session.loginError
 req.session.loginError=false
  res.render('index',{error})
})


router.post('/signup',(req,res) => {
  
 userHelpers.doSignup(req.body).then((response)=>{
 
  if(response.status){
    
    res.redirect('/index')
  }
  else{
   req.session.signError=true;
    res.redirect('/signup')
  }
  
 

})



 


  // res.send('got it')
})
router.post('/index',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
  if(response.status){
   req.session.userLoggedIn=true
   req.session.user=response.user
    res.redirect('/userhome')
  }
  else{
   req.session.loginError=true
    res.redirect('/index')
  }
  })

})

router.get('/userhome',isUserLoggedIn,(req,res)=>{
  res.render('userhome')
})


router.get('/logout',isUserLoggedIn,(req,res)=>
{
  req.session.userLoggedIn=false
  res.redirect('/index')
})

//perventing from direct acessing the home  page
function isUserLoggedIn(req,res,next){
  if(req.session.userLoggedIn){
      next()
  }else{
      res.redirect('/index')
  }
}
//preventing from going to login if we logined ones it helps to stay in login terminal
function userNotLoggedin(req,res,next){
  if(req.session.userLoggedIn){
       res.redirect('/userhome')
  }else{
      next()
  }
}







module.exports = router;
