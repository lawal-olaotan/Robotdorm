import {DashNav} from '@components/dashboard/DashNav'
import {DashSide} from '@components/dashboard/DashSide'; 
import {useSession} from 'next-auth/react';
import { useRouter } from 'next/router';

export const DashLayout = ({children} : {children:React.ReactNode}) => {
  
      const router = useRouter();
      const {data: session,status} = useSession({
        required:true,
        onUnauthenticated(){
          router.push('/Login')
        },
      });
      if(status === 'loading'){
        return <div>Loading</div>; 
      }
    return (
        <>
          <DashNav/>
          <main className="flex pt-[4.1rem] bg-dashbg h-screen">
            <DashSide/>
            <div className="ml-32 mt-6 w-full">
              {children}
            </div>
          </main>
        </>

    )

}

DashLayout.auth = true 
