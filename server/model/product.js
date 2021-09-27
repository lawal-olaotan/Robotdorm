const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    keyWord:{
        type:String,
    },
    title : {
        type:String,
        trim:true,
        min:3,
        max:160,
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
        type:ObjectId,
        ref:'User'
    }
},
{timestamp:true}
);

module.exports = mongoose.model('Product',productSchema)