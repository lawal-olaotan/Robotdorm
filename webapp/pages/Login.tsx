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
            SetLoading(false) 
            if(session){
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