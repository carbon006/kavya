//jshint esversion:6
require('dotenv').config()
const express = require('express');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

// mongoose.connect('mongodb://localhost:27017/retailerDB',{useNewUrlParser:true,useUnifiedTopology:true})
// mongoose.set('useCreateIndex',true)
// secret = process.env.SECRET || "hello"

const app = express()

retailerSchema = new mongoose.Schema({
  name:String,
  email:String,
  password:String
})

userSchema.plugin(passportLocalMongoose)

const Retailer = mongoose.model('Retailer',retailerSchema)


app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(session({
  secret:'ourSecret',
  resave:false,
  saveUninitialized:true
}))

app.use(passport.initialize())
app.use(passport.session())
app.set('view engine','ejs');


passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.get('/register',(req,res)=>{
  res.render('register')
})

app.get('/login',(req,res)=>{
  res.render('login')
})

app.post('/register',function(req,res){
  Retailer.register({email:req.body.email,username:req.body.username},req.body.password,(req,res)=>{
    if(err){
      console.log(err);
      res.redirect('/register')
    }
    else {
      passport.authenticate('local')(req,res,()=>{
        res.redirect('/dashboard')
      })

    }
  })

})

app.post('login',(req,res)=>{
  const retailer = new Retailer({
    email:req.body.email,
    password:req.body.password
  })
  req.login(user,(err)=>{
    if(err){
      console.log(err);
    } else {
      passport.authenticate("local")(req,res,function(){
        res.redirect('dashboard')
      })
    }
  })
})


app.get('/dashboard',function(req,res){
  if(req.isAuthenticated()){
    res.render('dashboard')
  }
  else {
    res.render('login')
  }
})


app.listen(3000,function(){
  console.log('server started on port 3000');
})
