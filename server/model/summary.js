const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema({
    EstTotalRevenue:{
        type:String,
    },
    EstTotalUnitsSold: {
        type:String,
    },
    EstAverageRevenue:{
        type:String,
    }, 
    AveragePrice:{
        type:String,
    }, 
    AverageRating: {
        type:String
    },
    keyWord:{
        type:String
    },
    postedBy:{
        type:String
    },
    createdAt: {type:Date,default:Date.now}
},
{timestamp:true},
);

module.exports = mongoose.model('Summary',summarySchema)