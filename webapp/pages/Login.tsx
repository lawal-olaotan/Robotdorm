import  React, {useEffect,useState} from 'react'
import type { NextPage } from 'next';
import { useRouter} from 'next/router'
import { getSession } from 'next-auth/react'; 
import AuthForm from '@components/AuthForm'




const Login: NextPage = () => {

    const extensionId: string = 'llneclmbomnmhcgbaacmjdloencbfahj'; 

    const [loading, SetLoading] = useState(true); 
    const router = useRouter(); 

    useEffect(()=> {
        getSession()
        .then(async (session) => {
            if(session){
                const data = await getUserInfo()
                if(data){
                    router.push('/Dashboard'); 
                }
            }else{
                SetLoading(false)
            }
        })
    },[router])

    let myId : any;

    const getUserInfo = async() => {

        await fetch('/api/getInfo', {method: 'GET',headers:{'Content-Type': 'application/json;'} })
        .then((response)=> response.json())
        .then((data)=> {
            myId = data; 
        })

        await chrome.runtime.sendMessage(extensionId, {type:'browser',data:myId})

        return true; 
    }

    if(loading){
        return <p>Loading Page</p>
    }

    return <AuthForm/>
}

export default Login;