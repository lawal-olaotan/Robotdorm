import type { NextPage } from 'next';
import  Head  from 'next/head'



const List: NextPage = () => {

    const extensionId: string = 'llneclmbomnmhcgbaacmjdloencbfahj'; 

//    const loadingEvent = () => {
//     chrome.runtime.sendMessage(extensionId,{type:'getInfo',data:'sendloginData'})
//    }

  return (
        <div>
            <Head>
                <title>Your List | RobotDorm</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <h1>Hello</h1>
            </main>
        </div>
  )
}

export default List