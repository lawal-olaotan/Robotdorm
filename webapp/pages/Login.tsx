import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import AuthForm from "@components/AuthForm";
import { Loader } from "@components/dashboard/Loader";
import { useSession, getSession } from "next-auth/react";

const Login: NextPage = () => {
  const { data: session, status } = useSession();
  const [loading, SetLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        // TODO: this is a temporary fix, looking for a roboust approach to sending message to the Extension
        if (typeof chrome?.runtime?.sendMessage === "function") {
          chrome?.runtime?.sendMessage(
            process.env.NEXT_PUBLIC_EXTENTION_ID ??
              "iebnenlmoeolohhmbjilijlgpjbjljhm",
            { type: "browser", data: session.user.id },
            () => {
              router.push("/Dashboard");
            }
          );
        } else {
          router.push("/Dashboard");
        }
      } else {
        SetLoading(false);
      }
    });
  }, [status]);

  if (loading) {
    return <Loader />;
  }
  return <AuthForm />;
};

export default Login;
