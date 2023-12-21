import type { NextApiResponse, NextApiRequest} from "next";
import {quoteScheme} from '../../lib/Models/quote'
import ClientPromise from '../../lib/mongoDb';

export default async function handler (req:NextApiRequest, res:NextApiResponse){
    if(req.method == "POST")
    {   
        const data:quoteScheme = req.body; 
       try{
        
       const dbInstance = (await ClientPromise).db();
       await dbInstance.collection('quote').insertOne(data,function(err){
        if(err){
            console.log(err);
        }
        return res.status(200).send({message:'success'});

        });}catch (e:any){
            console.error(e);
            return res.status(500).json({
                message:"server error"
            })
        }
    }

}