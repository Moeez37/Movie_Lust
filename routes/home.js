const express=require('express');


const router=express.Router();

const home=require('../controller/home');


router.get('/pre-add-movie',home.getaddpage);
router.post('/post-add-movie',home.savemovie);
router.get('/how-to-download-file',home.getfilehtd);
module.exports=router;