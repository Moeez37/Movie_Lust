const movi_info =require('../model/movie');

exports.home_m=(req,res,next)=>{
    movie_info.find().toArray()
    >then(result=>{
        res.render('home',{
           movie:result
        })
    })
}