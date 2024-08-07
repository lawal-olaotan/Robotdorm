
import {NextPage} from 'next'
import React,{useEffect,useState,useContext} from 'react';
import {Card } from 'antd'
import FeatherIcons from 'feather-icons-react'
import { useRouter } from 'next/router';
import {getSession} from 'next-auth/react'; 

// components 
import {DashHead} from '@components/dashboard/DashHead'; 
import { DashTitle } from './DashTitle';
import Link from 'next/link';

interface UserName {
    name: string;
}

export const DashPage= () => {
    const router = useRouter()
    const [userName, setUserName] = useState<string>('')

    useEffect(()=>{
        getSession()
        .then((session)=>{
            if(!session) return router.replace('/login')
                const name = session.user.name.split(' ')[0]
                setUserName(name)
        })
    },[router])

    // resources for cards 
      const instructions = [
        {
            title:"Install Chrome Extension",
            icon:'download',
            description:"Get access to our exclusive Chrome extension that helps you find profitable products on Jumia."
        },
        {
            title:"Perform a search",
            icon:'search',
            description:"Search your desired keywords or choose your desired category on any jumia website."
        },
        {
            title:"Find Validated Products",
            icon:'layout',
            description:"Search your desired keywords or choose your desired category on any jumia website"
        },
        {
            title:"Save and Export",
            icon:'database',
            description:"Save your desired products to your list for reference and share with your suppliers as CSV (Coming soon)."
        },
    ]

    const actions = [
        {
            title:"Turn Selling on Jumia to your 9-5!",
            hidden:false,
            description:"Created by an elite team of Jumia sellers, teaching you everything you need to create a sustainable Jumia business.",
            path:"https://robotdorm.teachable.com/p/jumia-six-figure",
            cta:'Enroll Now'
        },
        {
            title:"Install Robotdorm Chrome Extension",
            hidden:false,
            description:"Get inspired and start finding your next winning product and carrying out extensive competitors analysis from our Jumia database.",
            path:"https://chromewebstore.google.com/detail/robotdorm-jumia-keyword-t/iebnenlmoeolohhmbjilijlgpjbjljhm?hl=en-GB",
            cta:'Install Now'
        },
        {
            title:"Generate product ideas",
            hidden:true,
            description:"We are bringing product research to your mobile soon so you can your next while you're on the go.",
            path:"/dashboard/research",
            cta:'Coming soon'
        },
    ]

    return (
            <>
                <DashHead PageName="Dashboard"/>
                
                <div className="flex lg:flex-row sm: flex-col items-center justify-center space-x-4 shadow-6xl bg-sky-100 rounded-lg sm:p-2 lg:py-1 lg:px-0 text-center mb-4">
                        <h6 className="text-center font-medium">Uncover the secret to build a six-figure business on Jumia</h6>
                        <Link href='https://robotdorm.teachable.com/p/jumia-six-figure'><a className='px-6 py-3 bg-secondary text-white my-4 rounded-md'>Explore Jumia Secret</a></Link>
                </div>

                <div className='px-6 py-4 lg:ml-20 sm:ml-0'>
                    <DashTitle DashTitle={` Welcome ${userName ? userName : ''}`} />

                    <div className='flex lg:flex-row lg:items-center sm:flex-col items-center sm:space-y-4  lg:space-y-0 lg:flex-wrap sm:flex-nowrap my-6 lg:gap-x-4 sm:gap-x-0'>
                        {
                           actions.map((action,index) => (
                            
                            <div key={index} className={`${action.hidden ? 'lg:hidden sm:w-full' : 'lg:w-2/6 2xl:w-1/4 sm:w-full'}  my-4  border border-gray-400`}><Card>
                            <h2 className='font-bold text-xl my-2'>{action.title}</h2>
                            <p className='text-base'>{action.description}
                            </p>
                            <button onClick={()=> {router.push(action.path)}} className='px-6 py-3 bg-secondary text-white my-4 rounded-md'>{action.cta}</button>
                            </Card></div>
                            )) 
                        }

                    </div>

                    <div className='mt-12 sm:hidden lg:block'>

                        <h2 className='font-bold text-2xl text-secondary my-2'>How to Get started</h2>

                        <div className='flex items-center'>
                            {
                                instructions.map((instruction:any, index:number) => (
                                    <Card key={index} className='bg-transparent lg:w-1/4 2xl:w-1/6 p-0'>
                                        <div className='flex items-center gap-x-2 my-3'>
                                            <FeatherIcons icon={instruction.icon} size={30} />
                                            <h3 className='font-medium text-lg my-2'>{instruction.title}</h3>
                                        </div>
                                        <p className='text-sm'>{instruction.description}</p>
                                    </Card>
                                    
                                ))
                            }
                        </div>
                        
                    </div>
                </div>
            </>
        
    )
}