import {DashNav} from '@components/dashboard/DashNav'
import {DashSide} from '@components/dashboard/DashSide'; 
import { useEffect } from 'react'; 
import { useRouter } from 'next/router';
import {useSession, getSession} from 'next-auth/react'

export const DashLayout = ({children} : {children:React.ReactNode}) => {
  const {data:session,status} = useSession();
  const router = useRouter();

    useEffect(() =>{
        if(status == 'unauthenticated'){
            router.replace('/Login')
        }
    },[router,status])

      
          return (
            <>
              <DashNav/>
              <main className="flex pt-[4.1rem] bg-dashbg h-screen">
                <DashSide/>
                <div className="ml-32 mt-6 w-full">
                  {children}
                </div>
              </main>
            </>)

}