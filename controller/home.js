// const mongoos = require('mongoose');
const path=require('path');
const fs=require('fs');
// const movie = require('../model/movie');
const movi_info =require('../model/movie');


exports.home_m=(req,res,next)=>{
    movi_info.find()
    .then(result=>{
        if(req.session.isloggin &&  !req.session.isadmin){
        res.render('home',{
           isauth:true,
            movie:result,
            admin:false
        });}
        else if(req.session.isadmin){
            res.render('home',{
                isauth:true,
                 movie:result,
                 admin:true
        });}
        else {
            res.render('home',{
               isauth:false,
               movie:result,
               admin:false 
            });
        }
    })
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
    imageurl:"/movies/"+req.session.movi,
    videourl:"/images/"+req.session.image,
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
exports.getfilehtd=(req,res,next)=>{
    const pdfpath=path.join('Data','how_to_download.pdf');
    fs.readFile(pdfpath,(err,data)=>{
    if(err)
    {console.log(err)}
    else{
        const file=fs.createReadStream(pdfpath);
        res.setHeader('Content-Type','application/pdf');
        res.setHeader('Content-Disposition','inline; filename="'+"How_to_downoad.pdf"+'"')
        file.pipe(res);
    }
});
}
exports.getmovidetailview=(req,res,next)=>{
    const movieID = req.params['movie_ID'];
    console.log(movieID);
    movi_info.findById(movieID)
    .then(movi => {
        if(movi){
        console.log(movi)
    //   res.render('movie_view_download', {
    //     movie: movi
    //   });
}})
    .catch(err => {
        console.log(err)
    });
}
exports.downloadmovie=(req,res,next)=>{
 const ID=req.body.movieID;
 movie_info.finfOne(ID)
 .then((data)=>{
    const adressmovie=data.videourl;
    const file=fs.createReadStream(adressmovie);
    // res.setHeader('Content-Type','');
    res.setHeader('Content-Disposition','inline; filename="'+data.name+'.mp4"');
    file.pipe(res);
 })   
     
}