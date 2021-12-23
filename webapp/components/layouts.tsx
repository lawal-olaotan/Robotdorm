import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';



 export const Layouts = ({ children } : {children: React.ReactNode}) => {
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