import { Lheader } from '@components/Lheader';
import {NextPage} from 'next'; 
import  Head  from 'next/head';
import FeatherIcon from 'feather-icons-react';
import { Dispatch, SetStateAction, useRef} from 'react';
import { useRouter } from 'next/router';



interface Props{
    email:string,
    pageToggle:Dispatch<SetStateAction<boolean>>
}


export const EmailMes : NextPage<Props> = (Props) => {
    const {email,pageToggle} = Props
    const tokenRef = useRef<HTMLInputElement>(null);
    const router = useRouter()


    const verifyToken = async(event:React.SyntheticEvent) => {
        event.preventDefault()
        const token = (tokenRef.current.value).toLowerCase()
        const response = await fetch(`/api/auth/callback/email?email=${email}&token=${token}`);
        router.replace(response.url);
    }

    return (
        <div>
            <Head>
                <title> Email Sent | RobotDorm</title>
            </Head> 
            
            <main className='flex items-center justify-center py-20'>
                <div className='xl:w-[25%] lg:w-3/6 sm:w-4/5'> 
                    <div>
                        <span onClick={()=> {pageToggle(false)}}><FeatherIcon size={32} icon='x' /></span>
                        <Lheader Title={`Please enter the OTP sent to ${email}`}/>
                    </div>

                    <form onSubmit={verifyToken}>
                        <input ref={tokenRef} className='rounded-lg p-3.5 w-full py-4 border border-grey my-4 text-center' type="text"  placeholder="One time password" required/>
                        <input className='p-3.5 rounded-lg bg-secondary text-white w-full' type='submit' value="Continue"/>
                    </form>
            
                </div>
            </main>
        </div>
        



    )


}


