import {useSession } from 'next-auth/react';
import {useRouter}  from 'next/router'; 

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
