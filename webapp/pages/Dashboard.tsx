import type { NextPage, GetStaticProps } from 'next';
import  Head  from 'next/head'; 
import { useRouter} from 'next/router';
import { getSession,useSession } from 'next-auth/react'; 
import React,{useEffect} from 'react'

const Dashboard: NextPage = () => {


    const myRoute = useRouter(); 


    useEffect(()=> {
        getSession()
        .then((session) => {
            if(!session){
                myRoute.replace('/Login')
            }else{
                const extensionId: string = 'llneclmbomnmhcgbaacmjdloencbfahj'; 
                const userId:{} = JSON.parse(localStorage.getItem('userInfo'));
                //send message to chrome extension
                // sendtoExe(extensionId,userId)
            }
        })
    },[myRoute])

    // const sendtoExe = (extension,data)=> {
    //    chrome.runtime.sendMessage(extension, {type:'browser',message:data},function(response){
    //        console.log(response); 
    //    })

    // }
    
    
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



