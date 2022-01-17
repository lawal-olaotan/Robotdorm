import  React, {useEffect,useState} from 'react'
import type { NextPage } from 'next';
import { useRouter} from 'next/router';
import { getSession } from 'next-auth/react'; 
import AuthForm from '@components/AuthForm'



const Login: NextPage = () => {

    // const extensionId: string = 'llneclmbomnmhcgbaacmjdloencbfahj'; 

    const [loading, SetLoading] = useState(true); 
    const router = useRouter(); 

    useEffect(()=> {
        getSession()
        .then((session) => {
            if(session){
                router.replace('/Dashboard')
                
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