const express=require('express');


const router=express.Router();

const auth=require('../controller/authorization');


router.get('/prelogin',auth.prelogin);
router.post('/signup',auth.register);
router.get('/presignup',auth.signup);
router.post('/postlogin',auth.postlogin);


module.exports=router;