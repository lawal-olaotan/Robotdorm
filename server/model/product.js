const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const productSchema = new mongoose.Schema({
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
        type:String
    },
    createdAt: {type:Date,default:Date.now}
},
{timestamp:true}
);
productSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Product',productSchema);


