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
        .then(async (session) => {
            if(session){
                const userId = session; 
                if(userId){
                    chrome.runtime.sendMessage(extensionId, {type:'browser',data:session.user.id})
                    router.replace('/Dashboard'); 
                }
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