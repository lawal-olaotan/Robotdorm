import type { NextApiResponse, NextApiRequest} from "next";
import handler,{check,post,initiValidation} from '../../lib/middlehelper'
import ClientPromise from '../../lib/mongoDb';
import emailMarketingProvider from "util/Email";


const validator = initiValidation([
    check('email','please enter a valid email').isEmail(),
    check('email').notEmpty().withMessage('email is empty'),
]); 

export default handler.use(post(validator))


.post( async (req:NextApiRequest,res:NextApiResponse)=> {
    
    const environment = process.env.ENVIRONMENT
        
    try{
        const dbInstance = (await ClientPromise).db();
        let emailClient = emailMarketingProvider()

        const data = req.body;
        const {name,email} = data

        const userData = {email,name,isPremium:false,emailVerified:'not-verified',}
        await dbInstance.collection('users').insertOne(userData);
        if(environment !== 'dev') await emailClient.createContact(email,name)

        res.status(200).json({ok:true});
    }catch (error:any){
        console.log(error)
            res.status(500).json({
                message: error.message,
                ok:false
            })
        }
});