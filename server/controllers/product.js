const Product = require('../model/product');


exports.saveData = (data,id,keyword) => {
    
    for( let y = 0; y < data.length; y ++){
        let newProduct = new Product; 
        let newKeys = data[y]; 
        Object.assign(newProduct, newKeys);
        newProduct.postedBy = id;
        newProduct.keyWord = keyword;

        newProduct.save((err,result)=>{

            if(err){
                console.log('this is the error',err)  
            }else{
               console.log( result, 'data saved successfully')
            }
        })
    }
}
