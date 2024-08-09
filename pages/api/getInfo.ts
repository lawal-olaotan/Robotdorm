import type { NextApiResponse, NextApiRequest} from "next";
import ClientPromise from '../../lib/mongoDb';
import { getSession } from 'next-auth/react'

export default async function handler(req:NextApiRequest,res:NextApiResponse){

    // 
    if(req.method === 'GET'){

        try{
            const Db = (await ClientPromise).db(); 
            const {email} = req.query
            let userDetails = await Db.collection('users').findOne({email
            });
            const isUserSaved = userDetails ? true : false
            res.status(200).send({ok:isUserSaved});
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