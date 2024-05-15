import {DashNav} from '@components/dashboard/DashNav'
import {DashSide} from '@components/dashboard/DashSide'; 
import { useEffect } from 'react'; 
import { useRouter } from 'next/router';
import {getSession} from 'next-auth/react'
import Lottie from "lottie-react";
import AnimationData from "../../lottie/mobile.json";
import Link from 'next/link';

export const DashLayout = ({children} : {children:React.ReactNode}) => {
  const router = useRouter();

  useEffect(() => {
    getSession().then(async(session) => {
      if (!session) return router.push('/login')
      const { user } = session
      if(!user.isPremium) return router.push('/pricing')
    });
  }, [router]);

      
          return (
            <>
              <div className="sm:hidden lg:block">
                  <DashNav/>
                  <main className="flex pt-[4.1rem] bg-dashbg h-screen">
                    <DashSide/>
                    <div className="xl:ml-32 lg:ml-28 mt-6 w-full">
                      {children}
                    </div>
                  </main>
              </div>
              <div className='sm:block lg:hidden p-2'>
                    <div className="w-[400px] my-8 flex items-center justify-center mb-4 m-auto">
                        <Lottie animationData={AnimationData} />
                    </div>
                    <div className='m-auto text-center my-8 px-6'>
                      <h3 className='text-2xl font-semibold '>Uh-oh! looks like you are on a mobile device</h3>
                      <p className='my-6'>Robotdorm dashboard can currently be viewed on desktop, so we suggest you join our mobile waiting list.</p>
                      <Link href="https://lodq9254x9n.typeform.com/to/oC2EKHPj"><a className='bg-secondary px-10 py-4 text-white rounded-md'>Join Waitlist</a></Link>
                    </div>
              </div>
              
            </>
            )

}