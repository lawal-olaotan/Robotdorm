import {useSession } from 'next-auth/react';
import {useRouter}  from 'next/router';
import { extensionId } from "../extension"
import { signOut} from "next-auth/react";


export function AuthFunc ({children}:{children:React.ReactNode}){
    const router = useRouter(); 
    const {data: session, status} = useSession<boolean>({required:true,
     onUnauthenticated(){
        router.push('/login')
     }});
     const isUser = !!session?.user

     if(isUser){
         return {children}
     }
     return(<div>Loading ... </div>)
}



export async function logout (event:React.SyntheticEvent){
    event.preventDefault()
    
    try{    
        await chrome?.runtime.sendMessage(extensionId,{
            type:"delete"
        })
    }catch(error){
        console.log("Error in logging out",)
    }
    
    signOut();
}
