import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import AuthForm from "@components/Auth/AuthForm";
import { Loader } from "@components/dashboard/Loader";
import { getSession } from "next-auth/react";
import { extensionId } from "../extension"


export default function Login(){
  const [loading, SetLoading] = useState(true);
  const router = useRouter();

  // TODO: turn to custom hook
  // TODO: try using browser cookies to login users
  // TODO: 
  const loginStatus = (user,router) => {
    if(!user.isPremium) return router.push('/pricing')
      router.push("/dashboard");
  }
  useEffect(() => {
    getSession().then(async(session) => {
      if (!session) return  SetLoading(false);
      try{
        chrome.runtime.sendMessage(extensionId,{ type:"browser", data: session.user.id })
        loginStatus (session.user,router)
      }catch(error){
        loginStatus (session.user,router)
      }
    
    });
  }, [router]);



  if (loading) {
    return <Loader />;
  }

  return (<AuthForm />)
};

