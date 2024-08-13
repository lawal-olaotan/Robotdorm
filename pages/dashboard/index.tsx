
import React from 'react';
import { GetServerSidePropsContext } from "next";
import {authOptions}  from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Tiktok from 'components/Analytics/tiktok';

// components 
import { DashLayout } from '@components/dashboard/DashLayout';
import { DashPage } from '@components/dashboard/DashPage';

export default function Dashboard({name}){

    return (<DashPage name={name}/>)
}

 Dashboard.getLayout = function getLayout(page:React.ReactElement){
        return (
            <DashLayout>
                {page}
            </DashLayout>
        )
 }

export async function getServerSideProps(context:GetServerSidePropsContext){

    const session = await getServerSession(context.req,context.res,authOptions);

    if(!session) return{
        redirect:{
            destination:'/login',
            permanent:false
        }
    }

    const {req} = context
    const { email,id} = session.user
     const trackableInfo = {email,id}
     
    

    const tiktokTrackingData = {req,user:trackableInfo,view:'Dashboard View'}
    const tiktok = Tiktok()
    await tiktok.track(tiktokTrackingData)

    const userInfo =JSON.parse(JSON.stringify(session.user))
    const name = userInfo.name.split(' ')[0]
  return {
      props: {
        name
      },
  };
}

