import  React, {useEffect,useState} from 'react'
import type { NextPage } from 'next';
import { useRouter} from 'next/router'
import { getSession} from 'next-auth/react'; 
import AuthForm from '@components/AuthForm';


const Login: NextPage = () => {

    const [loading, SetLoading] = useState(true); 
    const router = useRouter();

    useEffect(()=> {
        getSession()
        .then((session) => {
            if(session){
                if(session.user.id !== undefined){
                    router.push('/Dashboard');
                }else{
                    let extensionKey = localStorage.getItem('userkey'); 
                    const auth = sendMessage(extensionKey)
                    if(auth){
                        router.push('/Dashboard');
                    }
                }
            }else{
                SetLoading(false)
            }
        })
    },[router]); 


    const sendMessage = (data:string)=>{
        return true; 
    }




    if(loading){
        return <p>Loading Page</p>
    }

    return <AuthForm/>
}

export default Login;