
import React, {useState,useEffect, useContext} from 'react'; 
import { DashLayout } from '@components/dashboard/DashLayout';
import { DashHead } from '@components/dashboard/DashHead';
import { DashTitle } from '@components/dashboard/DashTitle';
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import {authOptions}  from "../api/auth/[...nextauth]";
import AnimationData from "../../lottie/mobile.json";
import Lottie from "lottie-react";
import Link from 'next/link'

export default function Research(){

    return (
        <DashLayout>
            <DashHead PageName="Opportunity Finder"/> 
            <div className='ml-5 mt-5 overflow-hidden relative'>
                <DashTitle DashTitle="Opportunity Finder"/>
                <div className="w-[300px] my-8 flex items-center justify-center mb-4 m-auto">
                        <Lottie animationData={AnimationData} />
                </div>
                <div className='m-auto text-center my-8 px-6'>
                      <h3 className='text-2xl font-semibold '>Uh-oh! we are currently working to deliver this feature</h3>
                      <p className='my-6'>Submit your contact information so we can let you know once ready.</p>
                      <Link href="https://lodq9254x9n.typeform.com/to/oC2EKHPj"><a className='bg-secondary px-10 py-4 text-white rounded-md'>Submit Information</a></Link>
                </div>
            </div>         
      </DashLayout>
)}

export async function getServerSideProps(context:GetServerSidePropsContext){


    const session = await getServerSession(context.req,context.res,authOptions);
    if(!session) return{
        redirect:{
            destination:'/login',
            permanent:false
        }
    }

    const { user} = session
    return {
        props: {
          user:JSON.stringify(user)
        },
    };
}
