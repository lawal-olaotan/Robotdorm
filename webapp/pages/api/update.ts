import { ReturnDocument } from "mongodb";
import type { NextApiResponse, NextApiRequest} from "next";
import handler,{check,post,initiValidation} from '../../lib/middlehelper'
import ClientPromise from '../../lib/mongoDb';


const validator = initiValidation([
    check('email','please enter a valid email').isEmail(),
    check('email').notEmpty().withMessage('email is empty'),
]); 

export default handler.use(post(validator))


.post( async (req:NextApiRequest,res:NextApiResponse)=> {
        const data = req.body; 
    try{
        
        const {name,email} = data
        let myName:string = name
        let myEmail:string = email

        type Query = {
            email:string
        }

        const dbInstance = (await ClientPromise).db();
        const newValue = {$set:{name:myName}}; 
        const query:Query = {email:myEmail}
        await dbInstance.collection('users').findOneAndUpdate(query,newValue,function(err,document){
            if(!err){
                res.status(200).send({data:document.value});
            }else{
                console.log(err);
            }
        });
    
         
    
    }catch (e:any){
            console.error(e);
            res.status(500).json({
                message:"server error"
            })
        }
});


