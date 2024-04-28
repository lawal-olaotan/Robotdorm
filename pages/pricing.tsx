import { Layouts01 } from "@components/Layouts01"
import type { ReactElement } from 'react'
import  Head  from 'next/head';
import { PriceList } from "../components/Pricing/PriceList"
import { Title } from "@components/Pricing/Title";
import { Review } from "@components/Pricing/Review";
import {useSession} from 'next-auth/react'; 


export default function Pricing(){

    

    return (

        <div>
            <Head>
                <title>Pricing</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="bg-gradient-to-b from-sky-50 to-sky-100 px-40 py-12 sm:p-8 lg:px-24 overflow-hidden">
                <Title subTextPos="" logoSize={30}/>
                <PriceList/>
                <Review/>
            </div>
        </div>

        )
}

Pricing.getLayout = function getLayout(page:ReactElement){
    return (
        <Layouts01>
        {page}
        </Layouts01>

    )
} 