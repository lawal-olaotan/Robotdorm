import type { NextApiResponse, NextApiRequest} from "next";
import handler,{check,post,initiValidation} from '../../lib/middlehelper'
import ClientPromise from '../../lib/mongoDb';
import emailMarketingProvider from "lib/Email";


const validator = initiValidation([
    check('email','please enter a valid email').isEmail(),
    check('email').notEmpty().withMessage('email is empty'),
]); 

export default handler.use(post(validator))


.post( async (req:NextApiRequest,res:NextApiResponse)=> {
        
        
    try{
        const dbInstance = (await ClientPromise).db();
        let emailClient = emailMarketingProvider()
        const data = req.body;
        const {name,email} = data


        await dbInstance.collection('users').findOneAndUpdate({email},{$set:{name}},{returnDocument:'after'}, async(err,document) => {
                if(err) throw new Error(JSON.stringify(err));
                await emailClient.createContact(email,name)
                return res.status(200).send(document.value)
        });
    
         
    
    }catch (error:any){
            res.status(500).json({
                message: error.message
            })
        }
});