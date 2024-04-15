import { DashLayout } from '@components/dashboard/DashLayout';
import type { ReactElement } from 'react'
import { DashHead } from '@components/dashboard/DashHead';
import { DashTitle } from '@components/dashboard/DashTitle';
import React,{useRef} from "react";
import {toast, ToastContainer} from 'react-toastify'
import {authOptions}  from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { paymentEngine } from "../../lib/payment";


export async function getServerSideProps(context:any){

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
   
    if(!portal) return{props:{}}

    return {
        redirect: {
          destination: portal,
          permanent: false,
        },
    };
}

export default function Billing(){

    <>
            <DashHead PageName='Billing'/>
            <div>
                <DashTitle DashTitle="Billing"/>
                <div className="mt-8">
                    <h1 className='text-4xl font-bold mb-4'>Launching Soon</h1>
                    <p>We are working on creating a robust account settings feature that makes your account more secure</p>
                </div>
            </div>
    </>
}


Billing.getLayout = function getLayout(page:ReactElement){

    return (
        <DashLayout>
            {page}
        </DashLayout>

    )
}




