
import React, {useEffect} from 'react';
import { GetServerSidePropsContext } from "next";
import {authOptions}  from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { useRouter } from 'next/router';
import { extensionId } from "util/extension";

// components 
import { DashLayout } from '@components/dashboard/DashLayout';
import { DashPage } from '@components/dashboard/DashPage';

export default function Dashboard({name,id}){

    const router = useRouter();

    useEffect(()=> {
        if(id !== 'no_user'){
          chrome.runtime.sendMessage(extensionId(),{ type:"browser", data:id})
          router.push('/dashboard')
        }
}, [id,router])

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
    console.log(session.user)
    const {name, id} = session.user

  return {
      props: {
        name,
        id
      },
  };
}

