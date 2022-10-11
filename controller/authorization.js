const subs=require('../model/subscription');
const path=require('path');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const { default: mongoose } = require('mongoose');
const  admin = String("633ffb59b8ba20a732b85c63");
exports.register=(req,res,next)=>{
   bcrypt.hash(req.body.password,12).then(encrptedpass=>{
    User=new subs({
        username:req.body.firstname+' '+req.body.lastname,
        email:req.body.email,
        password: encrptedpass
    });
    subs.find({email:req.body.email}).then(product=>{
        console.log(product);
        if(product.length==0){
        User.save()
    .then(result=>{
        console.log(result);
        req.session.islogin=true;
        req.session.object=result;
        req.session.save();
        if(result._id==mongoose.Types.ObjectId(admin))
        {
            req.session.isadmin=true;
        res.render('home',{
            isauth:true
            ,movie:[],
            admin:true
        });}
        else{
            res.render('home',{
                isauth:true
                ,movie:[],
                admin:false
            });

        }
        /* newly added code*/
        
    })
    .catch(err=>{
        console.log(err); 
    })}
    else
    {
        res.render('signup',{
            errorinfo:"Email Already Exist !!"
        });
    }
})
})
}

exports.postlogin=(req,res,next)=>{
subs.findOne({email:req.body.email})
.then(result=>{
    console.log(result['password']);
    console.log(req.body.password)
    bcrypt.compare(req.body.password,result['password'])
    .then(match=>
    { console.log('match is :'+match);
        if(match){
            req.session.isloggin=true;
            req.session.object=result;
            m=[];
            console.log(result._id.toString()+"   "+(admin))  ;
       if(result._id.toString()==(admin))
         {   req.session.isadmin=true;
            console.log('success to admin');
                         console.log(admin);
                         res.redirect('/');
        }
        else{
            res.redirect('/');
    }
        }
        else{
            res.render('login',{
                errorinfo:"Password Did'nt match"});
        }
 })
    })
    .catch(err=>{console.log(err);})
}
exports.prelogin=(req,res,next)=>{
    res.render('login',{
        errorinfo:""
    });
}
exports.signup=(req,res,next)=>{
    res.render('signup',{
        errorinfo:""
    });}
    exports.Logout=(req,res,next)=>{
        req.session.isloggin=false
        req.session.isadmin=false
        req.session.destroy((err)=>{
            console.log(err);
            
            res.redirect('/');
        });
        }
        
