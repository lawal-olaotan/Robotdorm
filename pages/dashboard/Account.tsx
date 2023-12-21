import { DashLayout } from '@components/dashboard/DashLayout';
import { DashHead } from '@components/dashboard/DashHead';
import { DashTitle } from '@components/dashboard/DashTitle';
import Image from 'next/image'
import React from 'react'

export default function Account(){
    return (
        <>
        <DashHead PageName="Account"/> 
        <div>
        <DashTitle DashTitle="Account"/>
        <div className="mt-8">
            <h1 className='text-4xl font-bold mb-4'>Launching Soon</h1>
            <p>We are working on creating a robust account settings feature that makes your account more secure</p>

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