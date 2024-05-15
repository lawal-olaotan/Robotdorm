import { DashLayout } from '@components/dashboard/DashLayout';
import { DashHead } from '@components/dashboard/DashHead';
import { DashTitle } from '@components/dashboard/DashTitle';
import React from "react";
import {authOptions}  from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { paymentEngine } from "../../lib/payment";
import { GetServerSidePropsContext } from "next";
import Link from 'next/link';
import FeatherIcon from 'feather-icons-react';
import {logout} from '../../lib/AuthFunc'

export default function Billing({userInfo}){

    const {user,portal}= JSON.parse(userInfo)

    return (
        <DashLayout>
            <DashHead PageName='Acccount'/>
            <div>
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
                                <Link href='https://wa.link/7mqehr'><a className='px-2 py-1 bg-red-500 text-xs flex items-center space-x-2'><FeatherIcon size={14} icon='trash'/> Delete Account</a></Link>
                            </div>
                        </div>
                
                        <div className='border-y border-slate-300 w-[95%] py-10'> 

                            <div>
                                <h4 className='font-semibold'>Membership</h4>
                                <span className='text-sm'>This is your robotdom membership section, where you can control your subscription</span>
                            </div> 
                            <div className='my-4 flex flex-col justify-start w-fit items-start space-y-2 text-white '>
                                <Link href={portal}><a className='px-4 py-2 bg-secondary rounded-md mb-4'>Manage Subscription</a></Link>
    
                            </div>
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
    const portal = await stripe.portalUrl(user.email);
   
    if(!portal) return{
        redirect:{
            destination:'/billing',
            permanent:false
        }
    }
    const userInfo =JSON.stringify({user,portal})
    return {
        props: {
          userInfo
        },
    };
}






