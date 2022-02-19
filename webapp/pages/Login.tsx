import  React, {useEffect,useState,useContext} from 'react'
import type { NextPage } from 'next';
import { useRouter} from 'next/router'
import { getSession} from 'next-auth/react'; 
import AuthForm from '@components/AuthForm';
import { MyContext } from 'lib/UserContext';


const Login: NextPage = () => {

    const [loading, SetLoading] = useState(true); 
    const {myId} = useContext(MyContext)
    const router = useRouter();

    useEffect(()=> {
        getSession()
        .then((session) => {
            if(session){
                if(session.user.id !== undefined){
                    chrome.runtime.sendMessage(process.env.EXTENSION_ID, {type:'browser',data:session.user.id})   
                }
                router.push('/Dashboard'); 
            }else{
                SetLoading(false)
            }
        })
    },[router]); 




    if(loading){
        return <p>Loading Page</p>
    }

    return <AuthForm/>
}

export default Login;