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
    const {name,email} = data

    try{

        const dbInstance = (await ClientPromise).db();

        let userDetails = await dbInstance.collection('users').findOne({
            email:email
        });

         if(userDetails){
            const dbQuery = {userId:userDetails._id}; 
            const newValue = {$set:{name:name}}; 
            dbInstance.collection('sessions').updateOne(dbQuery,newValue, function(err){
                if(!err){
                    
                    res.status(200).send({data:userDetails._id}); 
                }
            })

         }
    
    }catch (e:any){
            console.error(e);
            res.status(500).json({
                message:"server error"
            })
        }
});


