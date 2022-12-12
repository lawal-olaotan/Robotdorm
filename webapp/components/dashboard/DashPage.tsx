
import {getSession} from 'next-auth/react'; 
import React,{useEffect,useState,useContext} from 'react';
import {faSearch,faPager,faDownload,faSave,faStoreAlt} from '@fortawesome/free-solid-svg-icons';
import { MyContext } from 'lib/UserContext';
import { useRouter } from 'next/router';

// components 
import { Todo } from '@components/dashboard/Todo';
import {DashHead} from '@components/dashboard/DashHead'; 
import { DashTitle } from './DashTitle';




export const DashPage =() => {
    const router = useRouter(); 
    const {myId} = useContext(MyContext); 
    const [userName, setUserName] = useState<string>()
    useEffect(()=>{
        getSession()
        .then((session)=>{
            if(session){
                if(session.user.name === undefined){
                    console.log(myId)
                    cutName(myId.name)
                }else{
                    cutName(session.user.name)
                }
            }else{
                router.replace('/Login')
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
                    <div className="mt-8 flex justify-between shadow-6xl bg-white w-[90%] 2xl:w-9/12 rounded-lg p-8">
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