import { DashLayout } from '@components/dashboard/DashLayout';
import { DashHead } from '@components/dashboard/DashHead';
import { DashTitle } from '@components/dashboard/DashTitle';
import React,{useState} from "react";
import {authOptions}  from "@api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { paymentEngine } from "util/payment";
import { GetServerSidePropsContext } from "next";
import Link from 'next/link';
import { logout } from 'lib/events';
import { Button, Modal } from 'antd';
import { useRouter } from 'next/router';

export default function Billing({userInfo}){

    const router = useRouter()
    const {user,portal}= JSON.parse(userInfo)
    const [isModalOpen, setIsModalOpen] = useState(false);


    // TODO 
    // Create isUserPremium hook and check if user has subscribed to activate manage subscription manage


    const deleteAccount = async(event:React.SyntheticEvent)=> {
        event.preventDefault();
        const userId = user.id
        // TODO: clean up API route
        const isResourcesDeleted = await fetch('/api/deleteUser', {
            method:'POST', 
            body:JSON.stringify(userId),
            headers: {
                'Content-Type': 'application/json',
            }, 
        })
        
        if(!isResourcesDeleted.ok) return false;

        logout(event)
        setIsModalOpen(false);
        router.replace('/login');
    }

    return (
        <DashLayout>
            <DashHead PageName='Acccount'/>
            <div className='lg:ml-20 sm:ml-5 lg:mt-10 sm:mt-5'>
                <DashTitle DashTitle="Account"/>
                <div className="my-4">
                        <h4 className='text-lg font-semibold mb-10'>sign in as {user.email}</h4>

                        <div className='border-y border-slate-300 w-[95%] py-10'> 

                            <div>
                                <h4 className='font-semibold'>Your Account</h4>
                                <span className='text-sm'>This is your robotdom account section, where you can control your account settings</span>
                            </div> 
                            <div className='my-4 flex flex-col justify-start w-fit items-start space-y-2 text-white '>
                                <button className='px-4 py-2 bg-secondary rounded-md mb-4' onClick={logout}>Logout</button>
                                <div>   
                                <Button danger type="primary" className='p-2 bg-red-500 text-white' onClick={()=> {setIsModalOpen(true)}}>Delete Account</Button>
                                <Modal className='text-2xl' okType='danger' title="Are you sure you?" open={isModalOpen} onOk={deleteAccount} onCancel={()=> {setIsModalOpen(false)}}>
                                    <p>This will permanently delete all your products saved and your subscription will be cancelled</p>
                                    <p className='text-red-500 font-bold'>This action cannot be undone</p>
                                </Modal>
                                                                
                                </div>
                                
                                
                            </div>
                        </div>
                
                        <div className='border-y border-slate-300 w-[95%] py-10'> 

                            <div>
                                <h4 className='font-semibold'>Membership</h4>
                                <span className='text-sm'>This is your robotdom membership section, where you can control your subscription</span>
                            </div> 
                            {<div className='my-4 flex flex-col justify-start w-fit items-start space-y-2 text-white '>
                                <Link href={portal}><a className='px-4 py-2 bg-secondary rounded-md mb-4'>Manage Subscription</a></Link>
    
                            </div>}
                        </div>
                </div>
            </div>
        </DashLayout>

    )
    
}


export async function getServerSideProps(context:GetServerSidePropsContext){

    const stripe = paymentEngine(); 

    const session = await getServerSession(context.req,context.res,authOptions);
    if(!session) return{
        redirect:{
            destination:'/login',
            permanent:false
        }
    }

    const { user} = session
    let portal = await stripe.portalUrl(user.email);
    if(!portal) portal = ''
   
    const userInfo =JSON.stringify({user,portal})
    return {
        props: {
          userInfo
        },
    };
}






