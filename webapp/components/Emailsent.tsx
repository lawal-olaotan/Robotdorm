import { Lheader } from '@components/Lheader';
import {NextPage} from 'next'; 
import  Head  from 'next/head'


interface Props{
    email:string
}


export const EmailMes : NextPage<Props> = (Props) => {
    const {email} = Props
    return (
        <div>
            <Head>
                <title> Email Sent | RobotDorm</title>
            </Head> 
            <main className='flex items-center justify-center py-20'>

            <div className='w-[28%]'> 

                <Lheader Title="Check Your Email"/>
                <p>Click on the login button that was sent to {email} to login</p>

                <p>Check Spam box too if email is not in your inbox</p>

                <span>You agree to RobotDorm Privacy Policy</span>
            </div>
            </main>
        </div>
        



    )


}


