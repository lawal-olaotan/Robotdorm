import type { NextApiResponse, NextApiRequest} from "next";
import {ProductDetails} from '../../interface/userSes'
import ClientPromise from '../../lib/mongoDb';

export default async function handler (req:NextApiRequest, res:NextApiResponse){
    if(req.method == "POST")
    {   
        const data:ProductDetails[] = req.body; 
       try{
        
       const dbInstance = (await ClientPromise).db();
       const deletedProduct = await dbInstance.collection('lists').deleteMany({title:{$in:data.map(prodTitle => (prodTitle.title))}})
       return res.status(200).send({message:deletedProduct.acknowledged })
        
    }catch (e:any){
            console.error(e);
            return res.status(500).json({
                message:"server error"
            })
        }
    }

}