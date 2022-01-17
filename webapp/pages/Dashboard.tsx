import type { NextPage, GetStaticProps } from 'next';
import  Head  from 'next/head'; 
import { useRouter} from 'next/router';
import { getSession,useSession } from 'next-auth/react'; 
import React,{useEffect} from 'react'

const Dashboard: NextPage = () => {

    // const extensionId: string = 'llneclmbomnmhcgbaacmjdloencbfahj'; 
    const myRoute = useRouter(); 


    useEffect(()=> {
        getSession()
        .then((session) => {
            if(!session){
                myRoute.replace('/Login')
            }else{
                //send message to chrome extension
                console.log(session); 
            }
        })
    },[myRoute])
    
    
  return (
        <div>
            <Head>
                <title>Dashboard | RobotDorm</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <h1>DashBoard</h1>
            </main>
        </div>
  )
}

export default Dashboard;



