
import  Head  from 'next/head';
import { useRouter} from 'next/router';
import { getSession } from 'next-auth/react'; 
import React,{useEffect} from 'react';
import type { ReactElement } from 'react'; 

// components 
import { DashLayout } from '@components/DashLayout';





export default function Dashboard(){

    const myRoute = useRouter(); 

    useEffect(()=> {
        getSession()
        .then((session) => {
            if(!session){
                myRoute.replace('/Login')
            }
        })
    },[myRoute])

    
  return (
        <>
            <Head>
                <title>Dashboard | RobotDorm</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div></div>
        </>
  )
}

 Dashboard.getLayout = function getLayout(page:React.ReactElement){
        return (

            <DashLayout>
                {page}
            </DashLayout>

        )
 }



