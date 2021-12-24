const fs = require('fs'); 

exports.readHtmlFile = function (path,callback){
    fs.readFile(path,{encoding:'utf-8'}, function(err,html){ 
        if(err){
            callback(err);
            throw err;
        }else{
            callback(null,html)
        }
    }); 
};
