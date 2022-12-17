import  React, {useEffect, useState} from 'react'
import type { NextPage } from 'next';
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'; 
import AuthForm from '@components/AuthForm';


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
            chrome.runtime.sendMessage('nlgemkboidojehdepoaebdcoanhealnb', {type:'browser',data:session.user.id}); 
            return true;
        }
    }

    if(loading){
        return <p>Loading Page</p>
    }

    return <AuthForm/>

}

export default Login;