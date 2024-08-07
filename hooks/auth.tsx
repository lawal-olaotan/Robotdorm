import {useSession } from 'next-auth/react';
import {useRouter}  from 'next/router';
import { extensionId } from "util/extension"
import { useEffect, useState} from "react"

import { getSession} from "next-auth/react";




    
export const  UseAuth = () => {
    const router = useRouter()

    useEffect(()=> {
            getSession().then((session)=> {
                if(!session) return false
                const {id} = session.user
                chrome.runtime.sendMessage(extensionId(),{ type:"browser", data:id})
                router.replace('/dashboard')
                
            })
    }, [router])

}









