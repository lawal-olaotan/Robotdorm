
import Link from 'next/link'; 
import {useState,useEffect} from 'react'; 
import { Navitems } from '@components/Navitems';
import { DashIcons } from '@components/dashboard/DashIcons';
import {useSession} from 'next-auth/react';


export const DashNav = ()=> {
    const [active,setActive] = useState(false);
    const {data:session,status} = useSession(); 

    useEffect(()=> {
        if(active){
            window.addEventListener('click', function(){
                setActive(false);
            });
        }else{
            window.removeEventListener('click', function(){setActive(false);});
        }
        return ()=> window.removeEventListener('click', function(){setActive(false);});
    }, [active])

    return (
            <nav className="flex items-center justify-between py-4 pr-12 pl-6 fixed left-0 right-0 top-0 z-[1] h-[68px] shadow-5xl bg-white">
                <div className="w-[42%] flex items-center justify-between">
                        <Link href="/Dashboard"><a className="inline-flex lg:w-48 sm:w-48"> 
                            <img className="w-100" src="/logo2.png" alt="robotdorm-logo" />
                        </a></Link>
                        <div className="flex items-center">
                            <Navitems routeName="Sell on Jumia" routeLink="https://www.youtube.com/results?search_query=selling+on+jumia"/>
                            <Navitems routeName='Chrome Extension' routeLink="https://chrome.google.com/webstore/detail/robotdorm-chrome-extensio/iebnenlmoeolohhmbjilijlgpjbjljhm/related?hl=en-GB&authuser=0"/>
                        </div>
                </div>
            <div className="flex items-center justify-between w-48">
                <div className='flex items-center justify-between'>
                    <DashIcons imgsrc="/fb.png" soLink="https://www.facebook.com/robotdorm"/>
                    <DashIcons imgsrc="/ig.png" soLink="https://www.instagram.com/robotdorm/"/>
                    <DashIcons imgsrc="/ws.png" soLink="https://api.whatsapp.com/send?phone=447546979379&text=checking%20out%20your%20extension"/>
                </div>
                <div>
                    <div className="flex items-center justify-center bg-black rounded-full p-1 w-[45px] h-[45px]" onMouseEnter={()=> setActive(!active)}>
                            <img src="/icons.png" alt="profile-pic" />
                    </div>
                    <div>
                        <div className={ `${active ? 'flex' : 'hidden'} p-5 absolute top-[4.5pc] right-[3pc] w-[220px] h-[200px] z-[1] items-center bg-dashpop shadow-6xl text-black flex-col rounded-sm`}>

                            <div className="flex items-center justify-center bg-black rounded-full p-1 w-[40px] h-[40px] mb-4">
                                <img src="/icons.png" alt="profile-pic" />
                            </div>
                            { status ===  'authenticated' ? <div className='text-center'>
                                <p className="text-sm font-medium mb-2"><span>{session.user.email}</span></p>
                                <p className="text-sm mb-2"><span>{session.user.name}</span></p>
                                <Link href="/"><a className="text-sm font-semibold text-blue">Settings</a>
                                </Link>
                            </div>: <div>loading</div> } 
                        </div>
                    </div>
                </div>
            </div>
            </nav>
    )
}
