import type { NextApiResponse, NextApiRequest} from "next";
import ClientPromise from '../../lib/mongoDb';

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === 'GET'){

        try{
            const Db = (await ClientPromise).db(); 
            const {query,page} = req.query;
            const pageNumber:any = page ? req.query.page : 1;
            let summaryCount; 
            
            if(pageNumber === 0){
                summaryCount = await Db.collection('summaries').find({'postedBy': query}).count()
            }
            const userDetails = await Db.collection('summaries').find({'postedBy': query}).skip(pageNumber * 6).limit(6).toArray();
            res.status(200).json({data:userDetails,count:summaryCount});
            
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

