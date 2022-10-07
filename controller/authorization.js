const subs=require('../model/subscription');
const path=require('path')
exports.login=(req,res,next)=>{

}
exports.register=(req,res,next)=>{
    User=new subs({
        username:req.body.firstname+' '+req.body.lastname,
        email:req.body.email,
        password: req.body.password
    });
    subs.find({email:req.body.email}).then(product=>{
        console.log(product);
        if(product.length==0){
        User.save()
    .then(result=>{
        console.log(result);
        req.session.islogin=true;
        req.session.object=result;
        res.render('home',{
            isauth:true
            ,movie:[]
        });
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

}
exports.postlogin=(req,res,next)=>{
subs.findOne({email:req.body.email})
.then(result=>{
    console.log(result['password']);
    console.log(req.body.password)
    if(result['password']==req.body.password)
    {
        req.session.isloggin=true;
        req.session.object=result;
       m=[];
        res.render("home",{
            isauth:true,
            movie:m
        });
    }
    else
    {
        res.render('login',{
            errorinfo:"Password Did'nt match"
        });

    }
})

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
        req.session.destroy((err)=>{
            console.log(err);
            mov=[];
            res.render('home',{
                isauth:false
                ,movie:mov
            })
        });
        }
