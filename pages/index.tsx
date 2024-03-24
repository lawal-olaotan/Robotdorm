
import { Hero }from  '@components/LandingPage/Hero';
import  Head  from 'next/head';
import { Layouts01 } from "@components/Layouts01"
import type { ReactElement } from 'react'



export default function Home(){
  return (
        <div>
            <Head>
                <title>Welcome | RobotDorm</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Hero/>
            </main>
           
        </div>
    
  )
}



Home.getLayout = function getLayout(page:ReactElement){

    return (
        <Layouts01>
        {page}
        </Layouts01>

    )
   
}   


