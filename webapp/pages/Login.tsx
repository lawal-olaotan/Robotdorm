import  React, {useEffect,useState,useContext} from 'react'
import type { NextPage } from 'next';
import { useRouter} from 'next/router'
import { getSession} from 'next-auth/react'; 
import AuthForm from '@components/AuthForm';
import {MyContext} from '../lib/UserContext'




const Login: NextPage = () => {

    const {SetMyId} = useContext(MyContext); 
    const [loading, SetLoading] = useState(true); 
    const router = useRouter();
    
    const extensionId: string = 'llneclmbomnmhcgbaacmjdloencbfahj'; 

    useEffect(()=> {
        getSession()
        .then(async (session) => {
            if(session){
                console.log(session.user.id);
                await chrome.runtime.sendMessage(extensionId, {type:'browser',data:session.user.id})
                router.replace('/Dashboard'); 
            }else{
                SetLoading(false)
            }
        })
    },[router])

    if(loading){
        return <p>Loading Page</p>
    }

    return <AuthForm/>
}

export default Login;