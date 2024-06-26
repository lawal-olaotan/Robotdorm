
import {getSession} from 'next-auth/react'; 
import React,{useEffect,useState,useContext} from 'react';
import {faSearch,faPager,faDownload,faSave,faStoreAlt} from '@fortawesome/free-solid-svg-icons';
import { MyContext } from 'lib/UserContext';
import { useRouter } from 'next/router';

// components 
import { Todo } from '@components/dashboard/Todo';
import {DashHead} from '@components/dashboard/DashHead'; 
import { DashTitle } from './DashTitle';
import { Loader } from './Loader';
import Image from 'next/image'




export const DashPage =() => {
    const router = useRouter(); 
    const {myId} = useContext(MyContext); 
    const [userName, setUserName] = useState<string>()
    useEffect(()=>{
        getSession()
        .then((session)=>{
            if(session){
                if(session.user.name === undefined){
                    cutName(myId.name)
                }else{
                    cutName(session.user.name)
                }
            }
            
        })

    },[myId,router])
    
   function cutName(myName:string):void{
       let newName = myName.split(' ')[0]
       setUserName(newName)
   }
   
    return (
        <>
            { userName !== undefined ? 
            <>
                <DashHead PageName="Dashboard"/>
                <div>
                    <DashTitle DashTitle={` Welcome ${userName}`} />
                    <div className="mt-8 flex justify-between shadow-6xl bg-white lg:w-[90%] xl:w-fit rounded-lg p-8">
                        <div>
                            <div className="mb-8">
                                <h2 className="mb-2 text-xl font-semibold ">Getting started with RobotDorm Jumia Tools</h2>
                                <p className="text-secondary"><span>Following the tips below would get you set up</span></p>
                            </div>
    
                            <ul className="flex flex-col h-3/5 justify-around">
                                    <Todo iconTypes='download' iconText="Download our chrome extension and register an account" />
                                    <Todo iconTypes='search' iconText="Search our desired keywords on any jumia website" />
                                    <Todo iconTypes='layout' iconText="Use our chrome extension to get the best sellers" />
                                    <Todo iconTypes='pocket' iconText="Save your desired products to your list" />
                                    <Todo iconTypes='database' iconText="Download products to csv (coming soon)" />
                            </ul>
                        </div>
                        <div>
                    <div className='flex items-center justify-center'>
                            <Image  height={400} width={400} src="/Success.png" alt="welcomepic" />
                    </div>
                        </div>
                    </div>
                </div>
            </>

        : <Loader/>}  
        </>
        
    )

}