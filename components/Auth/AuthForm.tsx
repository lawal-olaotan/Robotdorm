import {useState,useRef } from 'react';
import { signIn } from 'next-auth/react'
import  Head  from 'next/head'
import { Lheader } from '@components/Lheader';
import { InputCom } from '@components/Auth/InputCom';
import { FormFooters } from '@components/FormFooters';
import { EmailMes } from '@components/Auth/Emailsent';
import {  SignupLoader } from '@components/dashboard/Loader';
import { redirect } from 'next/dist/server/api-utils';

interface IUsers {
    email:string
}


const AuthForm = ()=> {

    const emailInputRef = useRef<HTMLInputElement>(null);

    const [Emailsent,setEmailSent] = useState(false);
    const [buttonPushed, setButtonPushed] = useState(false);
    const [userInfo, setUserInfo] = useState<IUsers>({email:""}); 


    // TODO: Move to service layer
    const submitForm = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        setButtonPushed(true)

        const InputEmail = emailInputRef.current.value

        const userStatus = await fetch(`/api/getInfo?email=${InputEmail}`).then((response) => response.json());
        const callbackUrl = userStatus.ok ? '/dashboard' : '/signup'

        const userdetails = {
            email: InputEmail
        };

        setUserInfo(userdetails)
    
        const result = await signIn('email', {
            redirect:false,
            email: InputEmail,
            callbackUrl
        });
        

        if(result.ok){
            setEmailSent(true)
            setButtonPushed(false)
        }

    }

    

       
    return (
        Emailsent? (
            <EmailMes email={userInfo.email} pageToggle={setEmailSent} />

        ): (
            <div>
            <Head>
                <title> Login | RobotDorm</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
        <main className="flex items-center justify-center py-20">

            <div className="xl:w-[25%] lg:w-2/6 sm:w-4/5">

                <Lheader Title="Login In / Register to RobotDorm"/>

                <form onSubmit={submitForm}>

                    <InputCom labelName='Email' id="email" type="email" placeholder="Please enter your email" refName={emailInputRef} />

                    <button className="rounded-lg mt-8 bg-secondary p-3.5 w-full text-white flex items-center justify-center">
                        { buttonPushed ? <SignupLoader/> :'Send Verification Token' }
                        </button>
                </form>

                <div className="mt-9 flex flex-col items-center">
                        <FormFooters question="Problems or Questions?" link="Contact Us" url="https://us12.list-manage.com/contact-form?u=2fb544e735311cbddb1b13831&form_id=77652526220b2b199c0794a74dbfbe86"/>
                </div>

            </div>  

        </main>
      </div>)
    )
}

export default AuthForm; 