import  React, {useEffect, useState} from 'react'
import type { NextPage } from 'next';
import { useRouter } from 'next/router' 
import AuthForm from '@components/AuthForm';
import { Loader } from '@components/dashboard/Loader';
import {useSession, getSession} from 'next-auth/react'

const Login: NextPage = () => {
    const {data:session,status} = useSession();
    const [loading, SetLoading] = useState(true); 
    const router = useRouter();

    useEffect(()=> {
        getSession()
        .then((session) => {
            if(session){
                console.log(session.user.id)
                const localEnv = window.location.href.includes('localhost:') 
            if(!localEnv)
            {
            chrome.runtime.sendMessage('nlgemkboidojehdepoaebdcoanhealnb', {type:'browser',data:session.user.id})
            }
            router.push('/Dashboard');
        }else{
            SetLoading(false)
        }
            
        })
    },[router]); 

    

    if(loading){
        return <Loader/>
    }
    return <AuthForm/>
}

export default Login;