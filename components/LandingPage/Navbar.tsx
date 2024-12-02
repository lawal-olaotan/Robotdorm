
import { Navitems } from './Navitems';
import { useState} from 'react'; 
import { NavLayout } from '@components/layouts/navigation/NavLayout'
import React from 'react'

export default function Navbar(){


    return (
            <nav className='fixed top-0 w-full bg-white to-blue-500 z-10'>
                        <NavLayout >
                            <div className='flex  sm:flex-col lg:flex-row w-full'>      
                               <Navitems routeName="Pricing" routeLink="/pricing" isLink={true} />
                                <Navitems routeName="Community" routeLink="https://chat.whatsapp.com/Lugl9SwxFhe6hQyJ34lJ6t" isLink={true} />
                            </div>
                        </NavLayout>
            </nav> 
    )
}


