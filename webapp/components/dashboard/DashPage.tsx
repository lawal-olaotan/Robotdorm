
import { useSession} from 'next-auth/react'; 
import React from 'react';
import {faSearch,faPager,faDownload,faSave,faStoreAlt} from '@fortawesome/free-solid-svg-icons';

// components 
import { Todo } from '@components/dashboard/Todo';
import {DashHead} from '@components/dashboard/DashHead'; 
import { DashTitle } from './DashTitle';


export const DashPage =() => {

    const {data:session,status} = useSession(); 

   function cutName(myName:string):string{
       let newName = myName.split(' ')[0]
     return newName
   }
    
    return (
        <>
            { status === "authenticated" ? 
            <>
                <DashHead PageName="Dashboard"/>
                <div>
                    <DashTitle DashTitle={`Welcome ${cutName(session.user.name)}`} />
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

        : <div></div>}  
        </>
        
    )

}