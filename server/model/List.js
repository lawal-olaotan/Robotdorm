const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');



const listSchema = new mongoose.Schema({
    keyWord:{
        type:String,
    },
    title : {
        type:String,
        trim:true,
        min:3,
        max:250,
        required:true,
    },
    img:{
        type:String,
    }, 
    link:{
        type:String,
    }, 
    price: {
        type:String
    },
    sales:{
        type:Number
    },
    revenue:{
        type:String
    },
    revenueNum:{
        type:Number
    },
    salesPrice:{
        type:Number
    },
    ratings:{
        type:Number
    },
    customer:{
        type:Number,
    },
    mode:{
        type:String,
    },
    shipping:{
        type:String,
    },
    postedBy:{
        type:String,
        required:true,
    },
    createdAt: {type:Date,default:Date.now}
},
{timestamp:true}
);


module.exports = mongoose.model('List',listSchema);

