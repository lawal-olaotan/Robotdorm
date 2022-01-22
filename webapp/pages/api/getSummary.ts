
import type { NextApiResponse, NextApiRequest} from "next";
import {ObjectId } from 'mongoose'; 

import ClientPromise from '../../lib/mongoDb';

export default async function handler(req:NextApiRequest,res:NextApiResponse){

    if(req.method === 'GET'){

        try{
            const Db = (await ClientPromise).db(); 
            const pageNum = 6;
            const {query} = req.query;
            let userDetails = await Db.collection('summaries').find({'postedBy': query});

            console.log(userDetails);

            res.status(200).json({data:userDetails});

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
