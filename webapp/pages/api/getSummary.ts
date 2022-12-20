import type { NextApiResponse, NextApiRequest} from "next";
import ClientPromise from '../../lib/mongoDb';

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === 'GET'){

        try{
            const Db = (await ClientPromise).db(); 
            const {query,page,collection} = req.query;
            const pageNumber:any = page ? req.query.page : 1;
            let summaryCount; 
            
            if(pageNumber === 0)
            {
                summaryCount = await Db.collection(`${collection}`).find({'postedBy': query}).count()
            }

            const queriedData = await Db.collection(`${collection}`).find({'postedBy': query}).skip(pageNumber * 6).limit(6).toArray();
            let refinedData; 
            if(collection == 'summaries'){
                refinedData = queriedData.map(({_id, postedBy, __v, createdAt, ...cleanedData}) => cleanedData)
            }else
            {
                refinedData = queriedData.map(({_id, postedBy, __v, createdAt,revenueNum,ratings,salesPrice,customer,mode,shipping, ...cleanedData}) => cleanedData) 
            }
           console.log(refinedData);
            res.status(200).json({data:refinedData,count:summaryCount});
            
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



