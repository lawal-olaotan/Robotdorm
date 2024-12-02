import {DashNav} from '@components/dashboard/DashNav'
import {DashSide} from '@components/dashboard/DashSide'; 
import {useState} from 'react'; 
import { useRouter } from 'next/router'
import { usePageTracking} from '../../hooks/tracking'

export const DashLayout = ({children} : {children:React.ReactNode}) => {
  const router = useRouter();

    usePageTracking(); 

  const [toogleState, setToggleState] = useState(true);
  const [toggleMenu, setMenuState] = useState(false);

  const showMobileMenu = () => {
    setToggleState(!toogleState);
    setMenuState(!toggleMenu)
  }


    return (
      <>
        <div className="bg-dashbg">
            <DashNav state={toogleState} stateTrigger={showMobileMenu}/>
            <main className="flex pt-[4.1rem] ">
              <DashSide state={toggleMenu} stateTrigger={showMobileMenu} />
              <div className="xl:ml-10 lg:ml-10 w-full">
                {children}
              </div>
            </main>
        </div>
      </>
      )
}


