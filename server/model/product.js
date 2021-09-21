const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    title : {
        type:String,
        trim:true,
        min:3,
        max:160,
        required:true,
    },
    image:{
        type:String,
    }, 
    qty:{
        type:String,
    }, 
    price: {
        type:String
    },
    deliveryDate:{
        type:String
    },
    orderNo:{
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