import type { NextPage } from 'next';
import Hero from  '@components/Hero';
import  Head  from 'next/head'


const Home: NextPage = () => {

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

export default Home
