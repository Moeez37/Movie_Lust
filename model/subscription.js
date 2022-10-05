const mongoos=require('mongoose');

const schema=mongoos.Schema;


const scheme=new schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

}) ;
module.exports=mongoos.model('subscriber',scheme);