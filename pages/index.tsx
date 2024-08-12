
import { Hero }from  '@components/LandingPage/Hero';
import  Head  from 'next/head';
import { Layouts01 } from "@components/Layouts01"
import { GetServerSidePropsContext } from "next";
import {authOptions}  from "@api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { useEffect } from 'react';
import useAuthContext from "@context/AuthContext"
export default function Home({url}){

    const { setUrl} = useAuthContext()

    useEffect(()=> {
        setUrl(url)
    }, [url,setUrl])

// track page for google analytics
  return (
    <Layouts01>
        <div>
            <Head>
                <title>Welcome | RobotDorm</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Hero/>
            </main>
           
        </div>
        </Layouts01>
  )
}

export async function getServerSideProps(context:GetServerSidePropsContext){

    const session = await getServerSession(context.req,context.res,authOptions);
   const url = !session ? '/login' : '/dashboard'
  return {
      props: {
        url
      },
  };
}

