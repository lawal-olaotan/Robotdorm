import type { NextPage } from 'next';
import  Head  from 'next/head'



const Dashboard: NextPage = () => {

    const extensionId: string = 'llneclmbomnmhcgbaacmjdloencbfahj'; 

  

  return (
        <div>
            <Head>
                <title> Login | RobotDorm</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <h1>Login</h1>
            </main>
        </div>
  )
}

export default Dashboard;