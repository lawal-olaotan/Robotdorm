
import Link from 'next/link';
import { Navitems } from './Navitems';
import { useState } from 'react'; 

export const Navbar = () => {
    const [active, setActive] = useState(false);
    const handleButton = () => {
        setActive(!active);
    }
    return (
        <>
        <nav className="flex w-100 items-center justify-between bg-transparent xl:py-8 lg:py-4 2xl:py-16  sm:p-0">
            <Link  href="/">
                <a className="inline-flex lg:w-52 sm:w-48"> 
                        <img className="w-100" src="/logo.png" alt="robotdorm-logo" />
                </a>
            </Link>
            <div className= { `${active? 'flex' : 'hidden'} lg:flex xl:w-2/5 lg:w-2/4 lg:justify-between lg:flex-row items-center lg:p-0 lg:h-auto lg:bg-transparent lg:relative lg:text-base text-white sm:absolute sm:flex-col sm:w-full sm:top-0 sm:left-0 sm:pt-20 sm:bg-primary sm:h-screen  sm:self-start sm:flex-start sm:text-2xl `}   >

                <button className=" lg:hidden absolute top-6 right-6" onClick={handleButton}>
                         <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                <Navitems routeName="Sell on jumia" routeLink="https://www.youtube.com/results?search_query=selling+on+jumia" />
                <Navitems routeName="Privacy policy" routeLink="/" />
                <Navitems routeName="Contact us" routeLink="/" />

            </div>
            <button className="lg:hidden inline-flex outline-none" onClick={handleButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-menu text-white"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>

        </nav>
        </>
    )
}
