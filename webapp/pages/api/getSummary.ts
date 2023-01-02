import type { NextApiResponse, NextApiRequest} from "next";
import ClientPromise from '../../lib/mongoDb';

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === 'GET'){

        try{
            const Db = (await ClientPromise).db(); 
            const {query,page,collection} = req.query;
            const pageNumber = Number(page);

            
            //  TODO: won't it be better to clean data before saving to the database
            if(collection == 'summaries'){
                let summaryCount = pageNumber === 0 ? await Db.collection(`${collection}`).find({'postedBy': query}).count() : 0;
                let searchSummaryData = await Db.collection(`${collection}`).find({'postedBy': query}).skip(pageNumber * 6).limit(6).toArray();
                const RefinedSearchData  = searchSummaryData.map(({postedBy, __v, createdAt, ...cleanedData}) => cleanedData)
                console.log(RefinedSearchData)
                res.status(200).json({data:RefinedSearchData,count:summaryCount});
            }else
            {
                const savedProduct = await Db.collection(`${collection}`).find({'postedBy': query}).toArray()
                const refinedProductList = savedProduct.map(({_id, postedBy, __v, createdAt,revenueNum,ratings,salesPrice,customer,mode,shipping, ...cleanedData}) => cleanedData)
                res.status(200).json(refinedProductList); 
            }
            
            
        }catch (e:any){
            console.error(e);
            res.status(500).json({
                message:"server error"
            })
        }

    }else{
        return null 
    }

}



