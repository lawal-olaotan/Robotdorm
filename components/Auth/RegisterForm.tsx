import { InputCom } from '@components/Auth/InputCom';
import { signIn } from 'next-auth/react';
import { EmailMes } from "@components/Auth/Emailsent";
import { useState, useRef,SetStateAction } from 'react'
import { SessionItems } from '../../interface/index'
import { useRouter } from 'next/router';
import { NextPage } from 'next';

interface formResults {
  setEmailSent:React.Dispatch<SetStateAction<boolean>>
  setUserEmail:React.Dispatch<SetStateAction<string>>
}

export const RegisterForm:NextPage<formResults> = (formResults) => {

  const router = useRouter(); 
  const {setEmailSent, setUserEmail} = formResults


  const submitForm = async (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    const formData = new FormData(event?.currentTarget)

    const email = formData.get('email') as string; 
    const name = formData.get('name') as string;

    const hasSignedUp = await isUserRegistered(email); 

    if(!hasSignedUp.ok){
      setUserEmail(email as string); 
      setEmailSent(true)
      await createUser(email,name);
      return await signIn("email", {
        redirect: false,
        email,
        name,
        callbackUrl:'/dashboard',
      });
      

      
    } 

    if(hasSignedUp.ok)router.push('/login')
  };

  const isUserRegistered = async(email:string) => {
    const userInformation  = await fetch(`/api/getInfo?email=${email}`); 
    const userInfo = await userInformation.json(); 
    return userInfo;
  }

  const createUser = async(email:string,name:string) => {
    const userCreationResponse  = await fetch(`/api/create-contact`, {
      body:JSON.stringify({email,name}),
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
    }); 
    const userRegistrationStatus = await userCreationResponse.json(); 
    return userRegistrationStatus;
  }

  return (
          <>
            <form onSubmit={submitForm}>
                    <div>
                        <InputCom labelName='Full name' id="name" type="name" placeholder="Janny Smith" />
                        <InputCom labelName='Email address' id="email" type="email" placeholder="janny@example.com"/>
                    </div>
                    <button className="rounded-lg mt-8 bg-secondary p-3.5 w-full text-white">Create an Account</button>
              </form>
          </>
            
  )
}


