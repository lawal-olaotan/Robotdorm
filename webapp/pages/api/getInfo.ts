import type { NextApiResponse, NextApiRequest} from "next";
import ClientPromise from '../../lib/mongoDb';
import { getSession } from 'next-auth/react'

export default async function handler(req:NextApiRequest,res:NextApiResponse){

    // 
    if(req.method === 'GET'){

        try{
            const Db = (await ClientPromise).db(); 
            const session = await getSession({req})
            const user = session.user; 
            let userDetails = await Db.collection('users').findOne({
                email: user.email
            });
            res.status(200).send(userDetails);
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