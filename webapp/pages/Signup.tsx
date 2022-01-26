import type { NextPage } from 'next';
import  Head  from 'next/head'; 
import { Lheader } from '@components/Lheader';
import { InputCom } from '@components/InputCom';
import { FormFooters } from '@components/FormFooters';
import {useRef,useContext} from 'react'; 
import {useSession} from 'next-auth/react'; 
import { useRouter} from 'next/router';
import {MyContext} from '../lib/UserContext'


const Signup: NextPage = () => {

    const{data: session,status} = useSession(); 
    const{SetMyId} = useContext(MyContext)
    const router = useRouter();
 

    const nameInputRef = useRef<HTMLInputElement>(null);

   let email:string = '';

   if(status === 'authenticated'){
        email = session.user.email;
     }

    let exeData; 

    // event hook to update user information
    const submitName = async (event: React.SyntheticEvent) => {

        const extensionId: string = 'llneclmbomnmhcgbaacmjdloencbfahj';

        const name:string = nameInputRef.current.value;
        event.preventDefault();
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
        let userData = data.data
         chrome.runtime.sendMessage(extensionId, {type:'browser',data:userData._id});
        SendMessage(userData); 
        })
    }
    const SendMessage = (userData:any) => {
        if(userData){
            console.log(userData);
            // SetMyId(userData);
            // router.replace('/Dashboard');
        }
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