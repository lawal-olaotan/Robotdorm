const mongoose = require('mongoose');
const {objectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    title : {
        type:String,
        trim:true,
        min:3,
        max:160,
        required:true,
    },
    amount:{
        type:String,
    }, 
    order_no:{
        type:String,
    }, 
    delivery_date: {
        type:String
    },
    productimg_url:{
        type:String
    },
    postedBy:{
        type:objectId,
        ref:'User'
    }
},
{timestamp:true}
);

module.exports = mongoose.model('Product',productSchema)