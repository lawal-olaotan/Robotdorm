import React from 'react';
import Navbar  from './LandingPage/Navbar';
import { Footer } from './LandingPage/Footer';



 export const Layouts01 = ({ children } : {children: React.ReactNode}) => {
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

