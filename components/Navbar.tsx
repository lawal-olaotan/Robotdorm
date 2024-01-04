
import Link from 'next/link';
import { Navitems } from './Navitems';
import { useState, useEffect } from 'react'; 
import Image from 'next/image'
import { useRouter } from 'next/router';

export const Navbar = () => {
    const [active, setActive] = useState(false);
    const router = useRouter()
    const handleButton = () => {
        setActive(!active);
    }

    useEffect(() =>{
        handleButton()      
    },[router.asPath])

    return (
        <>
        <nav className=" w-100 bg-primary sticky top-0 left-0 z-10">
            <div className='2xl:w-[1440px] m-auto flex items-center justify-between py-2 xl:px-24 lg:px-12 sm:p-4'>
            <Link  href="/">
                <a className="inline-flex"> 
                        <Image height='50px' width='160px' src="/logo.png" alt="robotdorm-logo" />
                </a>
            </Link>
            <div className= { `${active? 'flex' : 'hidden'} z-0 lg:flex 2xl:w-3/5 xl:w-1/2 lg:w-8/12 lg:justify-between lg:flex-row items-center lg:p-0 lg:h-auto lg:bg-transparent lg:relative lg:text-base text-white sm:absolute sm:flex-col sm:w-full sm:top-0 sm:left-0 sm:pt-20 sm:bg-primary sm:h-screen sm:self-start sm:flex-start sm:text-2xl sm:z-10`}   >

            <button className=" lg:hidden absolute top-6 right-6" onClick={handleButton}>
                         <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>




                <Navitems routeName="About Us" routeLink="/about" />
                <Navitems routeName="Contact Us" routeLink="/contact" />
                <Navitems routeName="Privacy policy" routeLink="https://www.freeprivacypolicy.com/live/2b77386d-c86d-4d5c-a9ae-9379b8825ba4"/>
                <Link href="https://chromewebstore.google.com/detail/iebnenlmoeolohhmbjilijlgpjbjljhm?hl=en-GB"><a className="sm:hidden lg:flex items-center bg-white text-primary px-6 py-2">Add Extension</a></Link>
            </div>
            
            <button className="lg:hidden inline-flex outline-none" onClick={handleButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu text-white"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            </div>
            


        </nav>
        </>
    )
}
