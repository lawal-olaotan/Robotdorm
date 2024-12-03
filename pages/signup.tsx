import type { NextPage } from 'next';
import  Head  from 'next/head'; 
import { Lheader } from '@components/Lheader';
import { InputCom } from '@components/Auth/InputCom';
import {useState} from 'react'; 
import { useRouter} from 'next/router';
import {userInfo} from '../interface/userSes'
import { extensionId } from "../util/extension"
import { GetServerSidePropsContext } from "next";
import {authOptions}  from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Link from 'next/link';
import {RegisterForm}  from '@components/Auth/RegisterForm'
import { AuthProvider } from '@components/Auth/AuthProvider';
import { EmailMes } from '@components/Auth/Emailsent';


export default function Signup(){

    const [Emailsent, setEmailSent] = useState<boolean>(false);
    const [userEmail, setUserEmail ] = useState<string>();

  return (
        <div>
            <Head>
                <title> Register | RobotDorm</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className='max-w-[480px] sm:w-4/5 mx-auto my-8'>
            {!Emailsent ? (
                <div className="w-fit">
                    <Lheader Title="Register to RobotDorm"/>
                    <AuthProvider/>
                    <div className='my-8 h-[2px] w-full bg-gray-300'></div>
                    <RegisterForm setUserEmail={setUserEmail} setEmailSent={setEmailSent}   />
                <div className="text-xs mt-8">
                    
                    <span>By signing up, you agree to our</span>
                    <Link href="terms" legacyBehavior>
                        <a className="text-primary font-bold underline-offset-1">
                        {" "}
                        Terms and Conditions
                        </a>
                    </Link>{" "}
                    and
                    <Link href="privacy" legacyBehavior>
                        <a className="text-primary font-bold underline-offset-1">
                        {" "}
                        Privacy Policy
                        </a>
                    </Link>
                </div>
                </div> ) : (<div className='max-w-[450px]'><EmailMes email={userEmail} pageToggle={setEmailSent} /></div>)
                 }

            </main>
        </div>
  )
}

export async function getServerSideProps(context:GetServerSidePropsContext){

    const session = await getServerSession(context.req,context.res,authOptions);
    if(session) return{
        redirect:{
            destination:'/dashboard',
            permanent:false
        }
    }

    return {
        props: {trends:true},
    };
}
