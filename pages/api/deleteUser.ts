import type { NextApiResponse, NextApiRequest} from "next";
import { db } from "util/db";

export default async function handler (req:NextApiRequest, res:NextApiResponse){
    if(req.method == "POST")
    {   
     
       try{
        const userId:string = req.body; 
        const dbClient = await db()
        await dbClient.deleteResourcesById(userId)
       return res.status(200).send({message:true})
        
    }catch (e:any){
            console.error(e);
            return res.status(500).json({
                message:"server error"
            })
        }
    }

}