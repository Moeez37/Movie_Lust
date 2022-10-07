const movi_info =require('../model/movie');

exports.home_m=(req,res,next)=>{
    movi_info.find()
    .then(result=>{
        res.render('home',{
           isauth:false,
            movie:result
        })
    })
}