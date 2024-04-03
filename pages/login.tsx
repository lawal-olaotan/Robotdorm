import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import AuthForm from "@components/Auth/AuthForm";
import { Loader } from "@components/dashboard/Loader";
import { useSession, getSession } from "next-auth/react";
import { extensionId } from "../extension"

export default function Login(){
  const { data: session, status } = useSession();
  const [loading, SetLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then(async(session) => {
      if (session) {
        // TODO: this is a temporary fix, looking for a roboust approach to sending message to the Extension
          chrome.runtime.sendMessage(extensionId,{ type: "browser", data: session.user.id })
          router.push("/Dashboard");
      } else {
        SetLoading(false);
      }
    });
  }, [router]);

  if (loading) {
    return <Loader />;
  }

  return (<AuthForm />)
};

