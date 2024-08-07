
import { Hero }from  '@components/LandingPage/Hero';
import  Head  from 'next/head';
import { Layouts01 } from "@components/Layouts01"

export default function Home(){

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



