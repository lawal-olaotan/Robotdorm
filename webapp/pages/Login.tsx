import  React, {useEffect,useState,useContext} from 'react'
import type { NextPage } from 'next';
import { useRouter} from 'next/router'
import { getSession,useSession } from 'next-auth/react'; 
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
                await chrome.runtime.sendMessage(extensionId, {type:'browser',data:session.user.id})
                router.replace('/Dashboard'); 
            }else{
                SetLoading(false)
            }
        })
    },[router])

    let myIdData : any;
    // const getUserInfo = async() => {

    //     await fetch('/api/getInfo', {method: 'GET',headers:{'Content-Type': 'application/json;'} })
    //     .then((response)=> response.json())
    //     .then((mydata)=> {
    //         let {id, ...newData} = mydata.data; 
    //         myIdData = newData; 
    //         SetMyId(newData);
    //     })

    //     chrome.runtime.sendMessage(extensionId, {type:'browser',data:myIdData.id})
         
    //     return true; 
    // }

    if(loading){
        return <p>Loading Page</p>
    }

    return <AuthForm/>
}

export default Login;