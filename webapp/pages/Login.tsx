import  React, {useEffect, useState} from 'react'
import type { NextPage } from 'next';
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'; 
import AuthForm from '@components/AuthForm';
import { Loader } from '@components/dashboard/Loader';


const Login: NextPage = () => {

    const [loading, SetLoading] = useState(true); 
    const router = useRouter();

    useEffect(()=> {
        getSession()
        .then((session) => {
            SetLoading(false) 
            if(session){
                const pushDash = sendMessage(session)
                if(pushDash){router.push('/Dashboard');}
            }
        })
    },[router]); 

    const sendMessage = (session:any) => {
        if(session.user.id !== undefined){
            const localEnv = window.location.href.includes('localhost:') 
            if(!localEnv)
            {
            chrome.runtime.sendMessage('ocphbhklbogjbkomckglmbcfldamdcbi', {type:'browser',data:session.user.id})
            }
            return true;
        }
    }

    if(loading){
        return <Loader/>
    }
    return <AuthForm/>
}

export default Login;