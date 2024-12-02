import React from 'react';
import Navbar  from './LandingPage/Navbar';
import { Footer } from './LandingPage/Footer';
import { usePageTracking} from '../hooks/tracking'



 export const Layouts01 = ({ children } : {children: React.ReactNode}) => {
    usePageTracking(); 
    
    return(
        <div className='overflow-x-hidden'>
            <Navbar/>
            <main>
                {children}
            </main>
            <Footer/>
        </div>
        )
}

