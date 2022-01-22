import  React, {useEffect,useState,useContext} from 'react'
import type { NextPage } from 'next';
import { useRouter} from 'next/router'
import { useSession } from 'next-auth/react'; 
import AuthForm from '@components/AuthForm';


const Login: NextPage = () => {

    const {data:session,status} = useSession()
    const [loading, SetLoading] = useState(true); 
    const router = useRouter();
    
    const extensionId: string = 'llneclmbomnmhcgbaacmjdloencbfahj';
    
    if(status === 'authenticated'){
       chrome.runtime.sendMessage(extensionId, {type:'browser',data:session.user.id})
        router.replace('/Dashboard');
    }else{
        SetLoading(false)
    }
    // let myIdData : any;
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