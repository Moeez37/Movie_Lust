const express=require('express');
const body_parse= require('body-parser');
const Session=require('express-session');
const Mongosession=require('connect-mongodb-session')(Session);
const path=require('path');
const home=require('./routes/home');
const app=express();

const auth=require('./routes/authorization');
const  mongoos = require('mongoose');

const Store=new Mongosession({
    uri:'mongodb+srv://Moeez:bsef19a537@cluster0.076ljp2.mongodb.net/Movie-lust?retryWrites=true&w=majority',
    collection:'sessions'
})

app.set("view engine","ejs");
app.set("views","views")
app.use(Session({ 
    secret:"my session",
    resave:false,                   
    saveUninitialized:false,
    store:Store                 //to store session on mongo
}));

app.use(body_parse.urlencoded({extended:false}));   //For url parsing
app.use(express.static(path.join(__dirname,'public'))); //setting folder that includes views satic file i.e backgound img etc
app.use('/',auth);
app.use('/',home);
mongoos.connect("mongodb+srv://Moeez:bsef19a537@cluster0.076ljp2.mongodb.net/Movie-lust?retryWrites=true&w=majority")
.then(result=>{
    console.log('connected');
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
})
