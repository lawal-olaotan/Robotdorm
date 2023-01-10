
import type { NextPage } from 'next';
import { Layouts01 } from "@components/Layouts01"
import type { ReactElement } from 'react'
import  Head  from 'next/head';

export default function about(){
    return (
        <div>
            <Head>
                <title>About Us| RobotDorm</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                
            </main>
        </div>
    )
}

about.getLayout = function getLayout(page:ReactElement){

    return (
        <Layouts01>
        {page}
        </Layouts01>

    )
   
} 