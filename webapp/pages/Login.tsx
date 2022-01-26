import  React, {useEffect,useState,useContext} from 'react'
import type { NextPage } from 'next';
import { useRouter} from 'next/router'
import { getSession} from 'next-auth/react'; 
import AuthForm from '@components/AuthForm';




const Login: NextPage = () => {

    const [loading, SetLoading] = useState(true); 
    const router = useRouter();
    
    const extensionId: string = 'llneclmbomnmhcgbaacmjdloencbfahj'; 

    useEffect(()=> {
        getSession()
        .then((session) => {
            if(session){
                const results = SendMs(session)
                if(results){
                    router.push('/Dashboard'); 
                }
            }else{
                SetLoading(false)
            }
        })
    },[router])

    const SendMs =(session) => {
        chrome.runtime.sendMessage(extensionId, {type:'browser',data:session.user.id})
        return true
    }


    if(loading){
        return <p>Loading Page</p>
    }

    return <AuthForm/>
}

export default Login;