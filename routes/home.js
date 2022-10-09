const express=require('express');


const router=express.Router();

const home=require('../controller/home');

router.get('/',home.home_m);
router.post('/pre-add-movie',home.getaddpage);
router.post('/post-add-movie',home.savemovie);
module.exports=router;