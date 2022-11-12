const express = require("express");
const path=require("path");
const app = express();

app.set("view-engine", "ejs")

//load static assets
app.use('/static',express.static(path.join(__dirname,'stylesheet')));


//taking the json format data for parsing
app.use(express.json());

//checking data is string,array or object for converting
app.use(express.urlencoded({ extended: true }))

var sessions = require("express-session");
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-cache, private,no-store,must-revalidate,max-stale=0,pre-check=0')
    next()
})
app.use(
    sessions({
        secret: "My secret key to use",
        resave: false,
        saveUninitialized: false,
    }))
const nameDB = "athul"
const emailDB = "athul@gmail.com";
const passwordDB = "123";

app.get("/", (req, res) => {   
    res.render("index.ejs")
})
app.get("/login",userNotLoggedin, (req, res) => {
    let error = req.session.loginError
    req.session.loginError = false
    res.render("login.ejs",{error})
})
app.post("/login", (req, res, err) => {
    const { name, email, password } = req.body;

    if (name === nameDB && email === emailDB && password === passwordDB) {
        req.session.userLoggedIn=true 
        res.redirect('/register')
    } else {
        req.session.loginError = true
        res.redirect('/login')
    }
})
app.get("/register",isUserLoggedIn, (req, res) => {
    res.render("register.ejs")
})


app.get('/logout',isUserLoggedIn,(req,res)=>{
    req.session.userLoggedIn = false
    res.redirect('/login')
})

//perventing from direct acessing the home  page
function isUserLoggedIn(req,res,next){
    if(req.session.userLoggedIn){
        next()
    }else{
        res.redirect('/login')
    }
}
//preventing from going to login if we logined ones it helps to stay in login terminal
function userNotLoggedin(req,res,next){
    if(req.session.userLoggedIn){
         res.redirect('/register')
    }else{
        next()
    }
}

app.listen(3000)