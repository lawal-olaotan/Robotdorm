const Product = require('../model/product');


function saveData(data,id){
    
    for( let y = 0; y < data.length; y ++){
        let newProduct = new Product; 
        let newKeys = data[y]; 
        Object.assign(newProduct, newKeys);
        newProduct.postedBy = id;

        newProduct.save((err,result)=>{

            if(err){
                console.log('this is the error',err)  
            }else{
               console.log( result, 'data saved successfully')
            }
        })
    }
}


module.exports = (data) => saveData(data)