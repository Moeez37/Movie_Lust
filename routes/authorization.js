const express=require('express');


const router=express.Router();
const home=require('../controller/home');
const auth=require('../controller/authorization');


router.get('/prelogin',auth.prelogin);
router.post('/signup',auth.register);
router.get('/presignup',auth.signup);
router.post('/postlogin',auth.postlogin);
router.get('/logout',auth.Logout);
router.get('/',home.home_m);


module.exports=router;