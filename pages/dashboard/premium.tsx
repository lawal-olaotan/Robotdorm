import { DashLayout } from '@components/dashboard/DashLayout';
import { DashHead } from '@components/dashboard/DashHead';
import { DashTitle } from '@components/dashboard/DashTitle';
import React,{ useEffect} from 'react';
import Lottie from "lottie-react";
import AnimationData from "../../lottie/success.json";
import Link from 'next/link';

export default function Account(){

    return (
        <>
        <DashHead PageName="Success"/> 
        <div className='flex items-center justify-center'>
            <div className="mt-8 text-center bg-[#FAFAFA] w-fit p-8 rounded-md shadow-md">
                <h2 className="font-black text-2xl">Thank you!</h2>
                <div className="w-[400px] flex items-center justify-center mb-4 m-auto">
                    <Lottie animationData={AnimationData} />
                </div>
                <p className='w-3/5 m-auto text-sm my-8 font-medium'>You can now unleash the power of robotdorm to grow your ecommerce business.</p>

                <Link href="/dashboard"><a className='px-8 py-3 bg-[#307AD1] text-white rounded-md'>Get started now</a></Link>
            </div>
        </div>
        </>
    )    
}

Account.getLayout = function getLayout(page:React.ReactElement){
    return(
        <DashLayout>
            {page}
        </DashLayout>
    )
}