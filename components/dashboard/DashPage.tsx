import React from 'react';
import {NextPage} from 'next'
import FeatherIcons from 'feather-icons-react'

// components 
import {DashHead} from '@components/dashboard/DashHead'; 
import { DashTitle } from './DashTitle';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface UserName {
    name: string;
}

export const DashPage:NextPage<UserName> = (UserName) => {
    const {name} = UserName
    const router = useRouter()

    // resources for cards 
      const instructions = [
        {
            title:"Install Extension",
            icon:'download',
            description:"Get access to our exclusive Chrome extension that helps you find profitable products on Jumia."
        },
        {
            title:"Perform a search",
            icon:'search',
            description:"Search your desired keywords or choose your desired category on any jumia website."
        },
        {
            title:"Find Products",
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
                    <DashTitle DashTitle={` Welcome ${name}`} />

                    <div className='flex lg:flex-row lg:items-center sm:flex-col items-center sm:space-y-2  lg:space-y-0 lg:flex-wrap sm:flex-nowrap my-6 lg:gap-x-4 sm:gap-x-0'>
                        {
                           actions.map((action:any,index:number) => (
                            <div key={index} className={`${action.hidden ? 'lg:hidden sm:w-full' : 'lg:w-2/6 2xl:w-1/4 sm:w-full'}  my-4  border border-gray-400 p-4 bg-white`}>
                            <h2 className='font-bold lg:text-xl my-2'>{action.title}</h2>
                            <p className='lg:text-base sm:text-sm'>{action.description}
                            </p>
                            <button onClick={()=> {router.push(action.path)}} className='px-6 py-3 bg-secondary text-white my-4 rounded-md'>{action.cta}</button>
                            </div>
                            )) 
                        }

                    </div>

                    <div className='mt-8 sm:hidden lg:block'>

                        <h2 className='font-bold text-2xl text-secondary my-2'>How to Get started</h2>

                        <div className='flex items-center space-x-2'>
                            {
                                instructions.map((instruction:any, index:number) => (
                                    <div key={index} className='bg-transparent lg:w-1/5 2xl:w-1/6 p-4'>
                                        <div className='flex items-center gap-x-2 my-2'>
                                            <FeatherIcons icon={instruction.icon} size={30} />
                                            <h3 className='font-medium text-lg my-2'>{instruction.title}</h3>
                                        </div>
                                        <p className='text-sm'>{instruction.description}</p>
                                    </div>
                                ))
                            }
                        </div>
                        
                    </div>
                </div>
            </>
        
    )
}