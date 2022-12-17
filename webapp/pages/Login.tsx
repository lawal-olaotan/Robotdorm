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
                if(session.user.id !== undefined){
                    const chromeMessage = chrome.runtime.sendMessage('nlgemkboidojehdepoaebdcoanhealnb', {type:'browser',data:session.user.id}); 
                    console.log(chromeMessage);
                }
                router.push('/Dashboard'); 
            }
        })
    },[router]); 

    if(loading){
        return <p>Loading Page</p>
    }

    return <AuthForm/>

}

export default Login;