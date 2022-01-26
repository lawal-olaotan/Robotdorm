import {useState,useRef,useEffect} from 'react';
import {signIn,getSession} from 'next-auth/react'
import  Head  from 'next/head'
import { Lheader } from '@components/Lheader';
import { InputCom } from '@components/InputCom';
import { FormFooters } from '@components/FormFooters';
import { EmailMes } from '@components/Emailsent';

interface IUsers {
    email:string
}


const AuthForm = ()=> {

    const emailInputRef = useRef<HTMLInputElement>(null);

    const [Emailsent,setEmailSent] = useState(false);
    const [userInfo, setUserInfo] = useState<IUsers>({email:""}); 

    
    const submitForm = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const InputEmail = emailInputRef.current.value

        const userdetails = {
            email: InputEmail
        };
        setUserInfo(userdetails)
    

        const result = await signIn('email', {
            redirect:false,
            email: InputEmail
        });
        

        if(result.ok){
            setEmailSent(true)
        }

    }

    

       
    return (
        Emailsent? (
            <EmailMes email={userInfo.email} />

        ): (
            <div>
            <Head>
                <title> Login | RobotDorm</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
        <main className="flex items-center justify-center py-20">

            <div className="w-[28%]">

                <Lheader Title="Login In / Register to RobotDorm"/>

                <form onSubmit={submitForm}>

                    <InputCom labelName='Email' id="email" type="email" placeholder="Please enter your email" refName={emailInputRef} />

                    <button className="rounded-lg mt-8 bg-secondary p-3.5 w-full text-white">Send Verification Link</button>
                </form>

                <div className="mt-9 flex flex-col items-center">
                        {/* <FormFooters question="New to Robotdorm?" link="Sign Up Now" url="/Signup"/> */}
                        <FormFooters question="Problems or Questions?" link="Contact Us" url="/Signup"/>
                </div>

            </div>  

        </main>
      </div>)
    )
}

export default AuthForm; 