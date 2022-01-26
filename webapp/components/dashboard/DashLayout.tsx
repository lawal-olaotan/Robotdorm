import {DashNav} from '@components/dashboard/DashNav'
import {DashSide} from '@components/dashboard/DashSide'; 

export const DashLayout = ({children} : {children:React.ReactNode}) => {
      
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