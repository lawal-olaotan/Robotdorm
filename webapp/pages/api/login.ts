import type { NextApiResponse, NextApiRequest} from "next";
import handler,{check,post,initiValidation} from '../../lib/middlehelper'


const validator = initiValidation([
    check('email','please enter a valid email').isEmail(),
    check('password', 'please enter a valid password').isLength({
        min:6
    }),
    check('email').notEmpty().withMessage('email is empty'),
    check('password').notEmpty().withMessage('password is empty')

]); 

export default handler.use(post(validator))

.post( async (res:NextApiResponse,req:NextApiRequest)=> {

    let {email,password} = req.body; 
        email.toLowerCase();

    try{

        console.log(email,password);


    }catch (e:any){
        console.error(e);
        res.status(500).json({
            message:"server error"
        })
    }



})


