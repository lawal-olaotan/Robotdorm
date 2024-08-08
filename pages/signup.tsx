import type { NextPage } from 'next';
import  Head  from 'next/head'; 
import { Lheader } from '@components/Lheader';
import { InputCom } from '@components/Auth/InputCom';
import { FormFooters } from '@components/FormFooters';
import {useRef} from 'react'; 
import { useRouter} from 'next/router';
import {userInfo} from '../interface/userSes'
import { extensionId } from "../util/extension"
import { GetServerSidePropsContext } from "next";
import {authOptions}  from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";


export default function Signup({userInfo}){

    const user = JSON.parse(userInfo)
    const router = useRouter();
    const nameInputRef = useRef<HTMLInputElement>(null);
  
    // event hook to update user information
    const submitName = (event: React.SyntheticEvent) => {
        const name:string = nameInputRef.current.value;
        event.preventDefault();
        const email:string = user.email
        const userData:userInfo = {name,email}
        const updatedData = fetchData(userData);
        if(updatedData){router.replace('/dashboard')}
    }

    const fetchData = async (userData:userInfo) => {
        try{
            const updateurl = await fetch('/api/update', {
                method:'POST', 
                body:JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json',
                }, 
            })
            const dataJson = await updateurl.json();
            var userKey = dataJson._id
            chrome?.runtime?.sendMessage(extensionId(), {type:'browser',data:userKey})
            return true;
        }catch(error){
            console.log(error)
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
                            <FormFooters question="Problems or Questions?" link="Contact Us" url="https://api.whatsapp.com/send?phone=+447546979379&text=I%20think%20I%20need%20your%20attention"
                            />
                    </div>

                </div>  

            </main>
        </div>
  )
}

export async function getServerSideProps(context:GetServerSidePropsContext){

    const session = await getServerSession(context.req,context.res,authOptions);
    if(!session) return{
        redirect:{
            destination:'/login',
            permanent:false
        }
    }
    const { user} = session
    const userInfo =JSON.stringify(user)
    return {
        props: {
          userInfo
        },
    };
}
