const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const summarySchema = new mongoose.Schema({
    'Est Total Revenue':{
        type:String,
    },
    'Est Total Units sold': {
        type:String,
    },
    'Est Average Revenue':{
        type:String,
    }, 
    'Average Price':{
        type:String,
    }, 
    'Average Rating': {
        type:String
    },
    keyWord:{
        type:String
    },
    postedBy:{
        type:ObjectId,
        ref:'User'
    },
    createdAt: {type:Date,default:Date.now}
},
{timestamp:true},
);

module.exports = mongoose.model('Summary',summarySchema)