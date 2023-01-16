import { Layouts01 } from "@components/Layouts01"
import type { ReactElement} from 'react'
import  Head  from 'next/head';
import React from 'react'; 
import { YoutubeWidgets } from "@components/YoutubeWidget";



export default function Install(){
    return (
        <>
        <Head>
                <title> Thank you | RobotDorm</title>
                <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="h-[83vh] w-full">
            <div className="xl:w-1/2 lg:w-10/12 m-auto"> 
           
            <div className="w-full my-4 text-center">
                <h1 className="font-bold text-2xl mb-2">Thanks you for installing our extension</h1>
                <p className="mb-4">To take full advantage of our Jumia keyword tool. It is highly recommended you check out the two videos below. </p>
                <p className="text-red-900">Note: to expand the videos below, kindly click the youtube link instead of expanding the video here.</p>
            </div>
            <div>
            <YoutubeWidgets title="How to set up your jumia keyword tool" description="This video takes you through how to properly setup your jumia keyword tool."  videoId="_CxA9hneGkg"/>

            <YoutubeWidgets title="Finding validated products on jumia" description="This video takes you through how to find already validated products that you could add to your store and start making profit." videoId="8FEhz2-Hq8A"/>   
            </div>

            </div>
           
        </main>
        </>

    )

}

Install.getLayout = function getLayout(page:ReactElement){
    return (
        <Layouts01>
        {page}
        </Layouts01>

    )
}