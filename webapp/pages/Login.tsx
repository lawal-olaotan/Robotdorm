import type { NextPage } from 'next';
import  Head  from 'next/head'
import Link from 'next/link'
import { Lheader } from '@components/Lheader';
import { InputCom } from '@components/InputCom';
import { FormFooters } from '@components/FormFooters';



const Login: NextPage = () => {

    const extensionId: string = 'llneclmbomnmhcgbaacmjdloencbfahj'; 

  

  return (
        <div>
            <Head>
                <title> Login | RobotDorm</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex items-center justify-center py-20">

            <div className="w-[28%]">

                <Lheader Title="Login In to RobotDorm"/>

                <form>

                    <InputCom labelName='Email' id="email" type="email" placeholder="Please enter your email"/>

                    <div>
                        <InputCom labelName='Password' id="password" type="password" placeholder="Please enter your password"/>
                        <div className="mt-4"> <Link href="/"><a className="text-blue flex justify-end">Forget Password?</a></Link> </div>
                    </div>
                    
                    <div className="flex items-center">
                        <input className="" id="remember" name="remember" type="checkbox" defaultChecked/>
                        <label className="ml-2" htmlFor="remember">Remember Me</label>
                    </div>

                    <button className="rounded-lg mt-4 bg-secondary p-3.5 w-full text-white">LOG IN </button>
                </form>

                <div className="mt-9 flex flex-col items-center">
                        <FormFooters question="New to Robotdorm?" link="Sign Up Now" url="/Signup"/>
                        <FormFooters question="Problems or Questions?" link="Contact Us" url="/Signup"/>
                </div>

            </div>  

        </main>
        </div>
  )
}

export default Login;