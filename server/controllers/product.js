const { searchPage , getSummary } = require('../helpers/scrapper')

const Product = require('../model/product');
const Summary = require('../model/summary')
const List = require('../model/product'); 


exports.saveList = async(req,res)=> {
    let list = req.body;
    console.log(list); 
    try{
        
       
        
        // saveToDb(new List(list));
        res.status(200).send('data saved successfull');
    }catch (err){
        console.log(err.message);
        res.status(500).send("data not saved")
    }
    
}

exports.saveData = async (req,res)=> {
    const data = req.body;
    try{ 
        const dbid = data._id
        const keyword = data.keyWord;
        const checkDb =  await Product.find({'keyWord':keyword},(err,mondata)=> {
            if(err){
                console.log('cannot find product')
            }; 
            return mondata; 
        }); 
        if (checkDb.length === 0){
            console.log(true); 
            const dbData =  await searchPage(data);
            const summary = await getSummary(dbData);
            summary.keyWord = keyword;
            summary.postedBy = dbid;
            saveToDb(new Summary(summary));
            for( let y = 0; y < dbData.length; y++){
                let newProduct = new Product; 
                let newKeys = dbData[y]; 
                Object.assign(newProduct, newKeys);
                newProduct.postedBy = dbid;
                newProduct.keyWord = keyword;
                saveToDb(newProduct)
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

const calcPagination = (page,size) => {
    // number of item to fetch from db
    const limit = size ? +size : 10;

    // numbers of item to skip
    const offset = page ? page * limit : 0

    return {limit,offset}
}

exports.getData = async (req,res)=> {
    try{
        const {page,size,querydata} = req.query; 
        const {limit,offset} = calcPagination(page,size);

       Product.paginate({'keyWord':querydata},{limit,offset},(err,data)=> {
            if(err){
                console.log('cannot find product')
            }
            let dbData = {
                totalProducts: data.totalDocs,
                data : data.docs, 
                totalPage : data.totalPages,
                currentPage: data.page,
            }

            if(page > 0){
                res.send(dbData);
            }else{
                Summary.find({'keyWord':querydata},(err,sumdata)=> {
                    if(err){
                        console.log('cannot find product')
                    };
                    dbData['summaryData'] = sumdata
                    res.send(dbData);
                });
            }
        });
    }catch (err){
        console.log(err.message);
        res.status(500).send("data not saved")
    }
}



const saveToDb = (schema) => {
    
    schema.save((err)=>{
        if(err){
            console.log('this is the error',err)  
        }
    })
}


