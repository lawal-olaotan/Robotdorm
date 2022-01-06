import {check, validationResult } from 'express-validator';
import nextConnect from 'next-connect';
import type { NextApiResponse, NextApiRequest} from "next";

 const initiValidation = (validations: any) => {
    return async (req:NextApiRequest,res:NextApiResponse,next:any) =>{
        await Promise.all(validations.map((validation:any) => validation.run(req)))
        const errors = validationResult(req);
        if(errors.isEmpty()) return next();
        const err : any = [];
        errors.array().map( error => err.push(error.msg))

        res.status(400).json({success:false, data:null, error: err})
    }
}

const post = (middleware:any) => {
    return nextConnect().post(middleware)
}

const handler = nextConnect();
export default handler; 

export {check,post,initiValidation} 




