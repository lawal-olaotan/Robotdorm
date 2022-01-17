import type { NextApiResponse, NextApiRequest} from "next";
import handler,{check,post,initiValidation} from '../../lib/middlehelper'
import ClientPromise from '../../lib/mongoDb';

interface User{
    name: string,
    email: string 
}


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
                    res.status(201).json({message:'User Info Updated'}); 
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

// export default async function handler(req:NextApiRequest,res:NextApiResponse){

//     if(req.method === 'POST'){

        
        

//         try{


//             // const dbInstance = (await ClientPromise).db();
//             // let userDetails = await dbInstance.collection('users').findOne({
//             //     email:email
//             // }); 
//            //  if(userDetails){
//            //     res.status(201).json({message:'User Info Updated'});    
//            //  }
//             // (await ClientPromise).close()
       
//         }catch (e:any){
//                console.error(e);
//                res.status(500).json({
//                    message:"server error"
//                })
//            }
//     }
// }

