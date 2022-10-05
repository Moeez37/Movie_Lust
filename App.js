const express=require('express');
const body_parse= require('body-parser');
const path=require('path');

const app=express();

const auth=require('./routes/authorization');
const  mongoos = require('mongoose');

app.set("view engine","ejs");
app.set("views","views")

app.use(body_parse.urlencoded({extended:false}));   //For url parsing
app.use(express.static(path.join(__dirname,'public'))); //setting folder that includes views satic file i.e backgound img etc
app.use('/',auth);
mongoos.connect("mongodb+srv://Moeez:bsef19a537@cluster0.076ljp2.mongodb.net/Movie-lust?retryWrites=true&w=majority")
.then(result=>{
    console.log('connected');
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
})
