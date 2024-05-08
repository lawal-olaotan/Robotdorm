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
  useEffect(() => {
    getSession().then(async(session) => {
      if (!session) return  SetLoading(false);
        // TODO: this is a temporary fix, looking for a roboust approach to sending message to the Extension
          chrome.runtime.sendMessage(extensionId,{ type:"browser", data: session.user.id })
          router.push("/dashboard");
    });
  }, [router]);



  if (loading) {
    return <Loader />;
  }

  return (<AuthForm />)
};

