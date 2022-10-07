const movie = require('../model/movie');
const movi_info =require('../model/movie');

exports.home_m=(req,res,next)=>{
    movi_info.find()
    .then(result=>{
        res.render('home',{
           isauth:false,
            movie:result,
            admin:false
        });
    });
}
exports.getaddpage=(req,res,next)=>{
    res.render('add_movie');

}
exports.savemovie=(req,res,next)=>{
   movie=new movi_info({
    name:req.body.name,
    genre:req.body.genre,
    rating:req.body.rating,
    quality:req.body.quality,
    image:req.body.image
   });
   movie.save()
   .then(result=>{
    console.log(result);
   })
   .then(err=>{
    console.log(err);
   })
}