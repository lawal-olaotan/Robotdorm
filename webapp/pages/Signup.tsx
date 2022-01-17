import type { NextPage } from 'next';
import  Head  from 'next/head'; 
import { Lheader } from '@components/Lheader';
import { InputCom } from '@components/InputCom';
import { FormFooters } from '@components/FormFooters';
import {useRef} from 'react'; 
import { getSession } from 'next-auth/react'; 
import { useRouter} from 'next/router';

interface Users {
    name:string,
    email:string
}


const Signup: NextPage = () => {
    const router = useRouter(); 

    // const extensionId: string = 'llneclmbomnmhcgbaacmjdloencbfahj';

   let email:string = '';
    getSession()
    .then((session)=> {
        if(session !== null){
            email = session.user.email
        }
    }); 
    const nameInputRef = useRef<HTMLInputElement>(null);

    // event hook to update user information
    const submitName = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const name:string = nameInputRef.current.value;
        const userData = {name,email}
        await fetch('/api/update', {
            method:'POST', 
            body:JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json',
            }, 
        })
        .then((response)=> response.json())
        .then((data)=> {
            localStorage.setItem('userInfo', JSON.stringify(data)); 
            router.push('/Dashboard');
        })
    }


  return (
        <div>
            <Head>
                <title> Register | RobotDorm</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex items-center justify-center py-20">

                <div className="w-[28%]">

                    <Lheader Title="Register to RobotDorm"/>

                    <form onSubmit={submitName}>

                        <InputCom labelName='Full Name' id="name" type="name" placeholder="Please enter your Full Name" refName={nameInputRef} />

                        <button className="rounded-lg mt-8 bg-secondary p-3.5 w-full text-white">Update Details</button>
                    </form>

                    <div className="mt-9 flex flex-col items-center">
                            <FormFooters question="Problems or Questions?" link="Contact Us" url="/Signup"/>
                    </div>

                </div>  

            </main>
        </div>
  )
}

export default Signup;