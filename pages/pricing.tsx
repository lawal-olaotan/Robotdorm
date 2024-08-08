import { Layouts01 } from "@components/Layouts01"
import type { ReactElement } from 'react'
import  Head  from 'next/head';
import { PriceList } from "../components/Pricing/PriceList"
import { Title } from "@components/Pricing/Title";
import { Review } from "@components/Pricing/Review";
import { GetServerSidePropsContext } from "next";
import {authOptions}  from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";


export default function Pricing({user}){

    const userDetails = JSON.parse(user)

    return (

        <div>
            <Head>
                <title>Pricing</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="bg-gradient-to-b from-sky-50 to-sky-100 px-40 py-12 sm:p-8 lg:px-24 overflow-hidden">
                <Title subTextPos="text-center" logoSize={30}/>
                <PriceList user={userDetails}/>
                <Review/>
            </div>
        </div>

        )
}


export async function getServerSideProps(context:GetServerSidePropsContext){

    const session = await getServerSession(context.req,context.res,authOptions);

    const user = session ? session.user : null 
    return {
        props: {
          user:JSON.stringify(user)
        },
    };
}

Pricing.getLayout = function getLayout(page:ReactElement){
    return (
        <Layouts01>
        {page}
        </Layouts01>

    )
} 