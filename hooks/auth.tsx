import {useSession } from 'next-auth/react';
import {useRouter}  from 'next/router';
import { extensionId } from "util/extension"
import { useEffect, useState} from "react"

import { getSession} from "next-auth/react";




    
export const  UseAuth = () => {
    const router = useRouter()
    const [userId,setUserId] = useState<string>()

    useEffect(()=> {
            getSession().then((session)=> {
                if(!session) router.replace('/login')
                const {id} = session.user
                setUserId(id)
            })
    }, [router])
    return userId
}









