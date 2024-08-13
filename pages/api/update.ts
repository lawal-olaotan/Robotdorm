import type { NextApiResponse, NextApiRequest} from "next";
import handler,{check,post,initiValidation} from '../../lib/middlehelper'
import ClientPromise from '../../lib/mongoDb';
import emailMarketingProvider from "util/Email";
import Tiktok from "components/Analytics/tiktok";
import { IncomingMessage } from "http";


const validator = initiValidation([
    check('email','please enter a valid email').isEmail(),
    check('email').notEmpty().withMessage('email is empty'),
]); 

export default handler.use(post(validator))


.post( async (req:NextApiRequest,res:NextApiResponse)=> {
        
        
    try{
        const dbInstance = (await ClientPromise).db();
        let emailClient = emailMarketingProvider()
        let tiktok = Tiktok()

        const data = req.body;
        const {name,email} = data
        const query = {name,isPremium:false}

        const document = await dbInstance.collection('users').findOneAndUpdate({email},{$set:query},{returnDocument:'after'});
        const {_id} = document.value
        const tiktokTrackableData = {req:req as IncomingMessage,user:{email,id:_id.toString()},view:'CompleteRegistration'}
        await emailClient.createContact(email,name)
        await tiktok.track(tiktokTrackableData).then(()=> res.status(200).send(document.value))
    }catch (error:any){
            res.status(500).json({
                message: error.message
            })
        }
});