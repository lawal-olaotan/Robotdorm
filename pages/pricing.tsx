import { Layouts01 } from "@components/Layouts01"
import type { ReactElement } from 'react'
import  Head  from 'next/head';
import { PriceList } from "../components/Pricing/PriceList"
import { Title } from "@components/Pricing/Title";
import { Review } from "@components/Pricing/Review";
import { GetServerSidePropsContext } from "next";
import {authOptions}  from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { usePageTracking} from '../hooks/tracking'


export default function Pricing({user}){

    usePageTracking()
    const userDetails = JSON.parse(user)

    return (

        <div className="w-full mt-20">
            <Head>
                <title>Pricing</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex items-center justify-center bg-gradient-to-b from-sky-50 to-sky-100 w-full">

                    <div className="px-40 py-12 sm:p-8 lg:px-24 overflow-hidden 2xl:w-[1440px]">
                        <Title subTextPos="text-center" logoSize={30}/>
                        <PriceList user={userDetails}/>
                        <Review/>
                    </div>

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