
import  Head  from 'next/head';
import { useRouter} from 'next/router';
import { getSession } from 'next-auth/react'; 
import React,{useEffect} from 'react';
import type { ReactElement } from 'react'; 
import {faCheck,faDownload} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'; 

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
        <div className="ml-32 mt-6 w-full">
            <Head>
                <title>Dashboard | RobotDorm</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>

                <h1 className="text-2xl font-semibold text-secondary">Welcome, Lawal!</h1>

                <div className="mt-8 flex justify-between shadow-6xl bg-white w-[90%] p-8">
                    <div>
                        <div className="mb-4">
                            <h2 className="mb-2 text-xl">Getting started with RobotDorm Jumia Tools</h2>
                            <p><span>Following the tips below would get you set up</span></p>
                        </div>

                        <ul className="flex flex-col h-1/2 justify-around">
                            <div className="flex items-center"> 
                                <FontAwesomeIcon icon={faDownload}/>
                                <p className="ml-4">Download our chrome extension and register an account</p> 
                            </div>

                            <div className="flex items-center"> 
                                <FontAwesomeIcon icon={faCheck}/>
                                <p>Search our desired keyword/products on Jumia Nigeria </p> 
                            </div>

                            <div className="flex items-center"> 
                                <FontAwesomeIcon icon={faCheck}/>
                                <p>Use our chrome extension to get the best sellers for product/Keyword</p> 
                            </div>

                            <div className="flex items-center"> 
                                <FontAwesomeIcon icon={faCheck}/>
                                <p>save your desired products to your list</p> 
                            </div>

                            <div className="flex items-center"> 
                                <FontAwesomeIcon icon={faCheck}/>
                                <p>Download products to csv or let us source for you</p> 
                            </div>
                            
                        </ul>
                        
                    </div>

                    <div>
                        <div>
                        <img src="/success.png" alt="welcomepic" />
                        </div>
                        

                        <p> <span>"Our Goal is to create equal market opportunities for everyone"</span></p>
                    </div>
                </div>

            </div>
        </div>
  )
}

 Dashboard.getLayout = function getLayout(page:React.ReactElement){
        return (

            <DashLayout>
                {page}
            </DashLayout>

        )
 }



