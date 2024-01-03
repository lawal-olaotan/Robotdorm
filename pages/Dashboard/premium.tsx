import { DashLayout } from '@components/dashboard/DashLayout';
import { DashHead } from '@components/dashboard/DashHead';
import { DashTitle } from '@components/dashboard/DashTitle';
import Image from 'next/image'
import React,{ useEffect} from 'react';
import { extensionId } from "../../extension"
import Lottie from "lottie-react";
import AnimationData from "../../lottie/premium.json";

export default function Account(){
    useEffect(()=> {
        setTimeout(() => {
            chrome.runtime.sendMessage('eekndbllknniickgmngbbalepibpkfff',{type:"premium", data:''})
        }, 3000);
        
    },[])
    return (
        <>
        <DashHead PageName="Payment confirmed"/> 
        <div>
        <DashTitle DashTitle="Payment successful"/>
        <div className="mt-8 flex flex-col items-center">
            <div className="h-[400px] w-[400px] flex mb-4">
                <Lottie animationData={AnimationData} />
            </div>
            <div className='w-1/2 font-bold'>Redirecting you back to your keyword search to enjoy unlimited search</div>
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