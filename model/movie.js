const mongoos=require('mongoose');

const schema=mongoos.Schema;

const scheme=new schema({
    name:{
        type:String,
        required:true
    },
    imageurl:{
        type:String,
        required:true
    },
    videourl:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    quality:{
        type:String,
        required:true
    },

});
module.exports=mongoos.model('movie-info',scheme);