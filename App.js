const express=require('express');
const csrf = require('csurf');
const body_parse= require('body-parser');
const Session=require('express-session');
const multer=require('multer');
const Mongosession=require('connect-mongodb-session')(Session);
const path=require('path');
const home=require('./routes/home');
const app=express();

const auth=require('./routes/authorization');
const  mongoos = require('mongoose');
const { syncBuiltinESMExports } = require('module');
app.use(body_parse.urlencoded({extended:false}));
const Store=new Mongosession({
    uri:'mongodb+srv://Moeez:bsef19a537@cluster0.076ljp2.mongodb.net/Movie-lust?retryWrites=true&w=majority',
    collection:'sessions'
})
app.use(Session({ 
    secret:"my session",
    resave:false,                   
    saveUninitialized:false,
    store:Store                 //to store session on mongo
}));
const filestorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        if(file.fieldname=="movie"){
        cb(null,'files/movies')}
        else if(file.fieldname=="image")
        {
            cb(null,'files/images')
        }
    },
    filename:(req,file,cb)=>{
        if(file.fieldname=="movie"){
            req.session.movi=Date.now()+'-'+file.originalname+path.extname(file.originalname);
            if(req.session.movi){
            cb(null,req.session.movi);}
            else{res.send("<h4>Error</h4>")}}
    else if(file.fieldname=='image')
    {
        req.session.image=Date.now()+'-'+file.originalname+path.extname(file.originalname)
        if(req.session.image){
        cb(null,req.session.image);}
        else{res.send("<h4>Error</h4>")}
    }
    }
})

// const csrfProtection = csrf();
app.set("view engine","ejs");
app.set("views","views");


// app.use(csrfProtection);

 
  //For url parsing
app.use(multer({storage:filestorage}).fields([
    {
        name:'movie',
        maxCount:1
    },
    {
        name:'image',
        maxCount:1
    }
]));
app.use(express.static(path.join(__dirname,'files')));
app.use(express.static(path.join(__dirname,'public'))); //setting folder that includes views satic file i.e backgound img etc
app.use('/home',home);
app.use('/',auth);

mongoos.connect("mongodb+srv://Moeez:bsef19a537@cluster0.076ljp2.mongodb.net/Movie-lust?retryWrites=true&w=majority")
.then(result=>{
    console.log('connected');
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
})
