
import React from 'react';
import { GetServerSidePropsContext } from "next";
import {authOptions}  from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

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
            destination:'/signup',
            permanent:false
        }
    }
    const name = session.user.name
  return {
      props: {
        name
      },
  };
}

