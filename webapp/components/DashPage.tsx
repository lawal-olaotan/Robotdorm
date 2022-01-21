
import  Head  from 'next/head';
import { useRouter} from 'next/router';
import { getSession} from 'next-auth/react'; 
import React,{useEffect,useState} from 'react';
import {faSearch,faPager,faDownload,faSave,faStoreAlt} from '@fortawesome/free-solid-svg-icons';


// components 
import { Todo } from '@components/Todo';


export const DashPage =() => {

    const myRoute = useRouter();  
    const [userInfo, setUserInfo] = useState<string>(); 

    useEffect(()=> {
        getSession()
        .then((session) => {
            if(!session){
                myRoute.replace('/Login')
            }else{
                const userName:any= session.user.name.split(' '); 
                setUserInfo(userName[0]);
            }
        })
    },[myRoute])


    return (
        <>
            { userInfo !== undefined ? 
            
            <>
                <Head>
                    <title>Dashboard | RobotDorm</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div>
                     <h1 className="text-2xl font-semibold text-secondary">Welcome {userInfo}</h1>
                    <div className="mt-8 flex justify-between shadow-6xl bg-white w-[90%] rounded-lg p-8">
                        <div>
                            <div className="mb-8">
                                <h2 className="mb-2 text-xl font-semibold ">Getting started with RobotDorm Jumia Tools</h2>
                                <p className="text-secondary"><span>Following the tips below would get you set up</span></p>
                            </div>
    
                            <ul className="flex flex-col h-3/5 justify-around">
                                    <Todo iconTypes={faDownload} iconText="Download our chrome extension and register an account" />
                                    <Todo iconTypes={faSearch} iconText="Search our desired keyword/products on Jumia Nigeria" />
                                    <Todo iconTypes={faPager} iconText="Use our chrome extension to get the best sellers" />
                                    <Todo iconTypes={faSave} iconText="Save your desired products to your list" />
                                    <Todo iconTypes={faStoreAlt} iconText="Download products to csv or let us source for you" />
                            </ul>
                            
                        </div>
    
                        <div>
                    <div className='flex items-center justify-center'>
                            <img src="/Success.png" alt="welcomepic" />
                    </div>
                        </div>
                    </div>
    
                </div>
            </>

        : <div>loading</div>}  
        </>
        
    )

}