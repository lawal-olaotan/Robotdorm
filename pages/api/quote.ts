import type { NextApiResponse, NextApiRequest} from "next";
import ClientPromise from '../../lib/mongoDb';

export default async function handler (req:NextApiRequest, res:NextApiResponse){
    if(req.method == "POST")
    {   
        const data = req.body; 
       try{
        
       const dbInstance = (await ClientPromise).db();
       await dbInstance.collection('quote').insertOne(data)
        return res.status(200).send({message:'success'});   

        }catch (e:any){
            console.error(e);
            return res.status(500).json({
                message:"server error"
            })
        }
    }

}