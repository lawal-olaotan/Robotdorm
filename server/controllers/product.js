const { searchPage } = require('../helpers/scrapper')

const Product = require('../model/product');

exports.saveData = async (req,res)=> {
    const data = req.body;
    try{ 
        const dbid = data._id
        const keyword = data.keyWord;

        const checkDb =  await Product.find({'keyWord':keyword,'postedBy':dbid},(err,mondata)=> {
            if(err){
                console.log('cannot find product')
            }; 
            return mondata; 
        }); 

        if (checkDb.length === 0){
            console.log(true); 
            const dbData =  await searchPage(data);

            for( let y = 0; y < dbData.length; y++){
                let newProduct = new Product; 
                let newKeys = dbData[y]; 
                Object.assign(newProduct, newKeys);
                newProduct.postedBy = dbid;
                newProduct.keyWord = keyword;
                newProduct.save((err)=>{
                    if(err){
                        console.log('this is the error',err)  
                    }
                })
            }

            res.status(200).send('data saved successfull'); 
             
        }else{
            res.status(200).send('data found') 
        }

    } catch (err){
        console.log(err.message);
        res.status(500).send("data not saved")
    }

}

exports.getData = (req,res)=> {

    const conditions = req.params.queryData;
    console.log(conditions);

    Product.find({'keyWord':conditions}, (err,data)=> {
        if(err){
            console.log('cannot find product')
        }
        res.json(data); 
    }); 
}
