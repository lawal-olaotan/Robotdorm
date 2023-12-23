import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';



 export const Layouts01 = ({ children } : {children: React.ReactNode}) => {
    return(
        < >
        <Navbar/>
        <main>
            {children}
        </main>
        <Footer/>
        </>
        )
}