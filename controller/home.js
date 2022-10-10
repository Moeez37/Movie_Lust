const mongoos = require('mongoose');

const movie = require('../model/movie');
const movi_info =require('../model/movie');


exports.home_m=(req,res,next)=>{
    movi_info.find()
    .then(result=>{
        if(req.session.isloggin && req.session.isadmin){
        res.render('home',{
           isauth:true,
            movie:result,
            admin:true
        });}
        else{
            res.render('home',{
                isauth:false,
                 movie:result,
                 admin:false
        });
    }
});
}
exports.getaddpage=(req,res,next)=>{
    if(req.session.isadmin){
    res.render('add_movie');}
    else{
        res.render('login')
    }
}
exports.savemovie=(req,res,next)=>{
   
   if(req.session.isadmin){ movies=new movi_info({
    name:req.body.name,
    genre:req.body.genre,
    rating:req.body.rating,
    quality:req.body.quality,
    
   }); 
   movies.save()
   .then(result=>{
    console.log(result);
   res.redirect('/')
   })
   .catch(err=>{
    console.log(err);
   })}
   else
   {
    res.render('login');
   }
}