
import { useRouter } from "next/router";
import AuthForm from "@components/Auth/AuthForm";
import { extensionId } from "util/extension"
import { useEffect } from "react";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import {authOptions}  from "./api/auth/[...nextauth]";
import ReactGA from 'react-ga4';

export default function Login({id}){
    const router = useRouter()

  useEffect(()=> {
        if(id !== 'no_user'){
          chrome.runtime.sendMessage(extensionId(),{ type:"browser", data:id})
          router.push('/dashboard')
        }
}, [router])


ReactGA.send({
  hitType:"pageView",
  page:"/login",
  title:"login"
})

  return (<AuthForm />)
};

export async function getServerSideProps(context:GetServerSidePropsContext){


  const session = await getServerSession(context.req,context.res,authOptions);

  if(!session) return{
      props:{
          id:'no_user',
      }
  }

  const { user} = session
  return {
      props: {
        id:user.id
      },
  };
}


