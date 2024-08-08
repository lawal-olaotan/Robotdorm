
import { Navitems } from './Navitems';
import { useState} from 'react'; 
import { NavLayout } from '@components/layouts/navigation/NavLayout'
import { Solutions } from '@components/layouts/navigation/Solutions';
import React from 'react'

export default function Navbar(){
   const [showSolution,setSolution] = useState<boolean>(false)
   const [showFeatures,setFeatures] = useState<boolean>(false)

    return (
            <nav className='sticky top-0 w-100 bg-gradient-to-tl from-sky-100 to-blue-500'>
                    {showFeatures ? (<NavLayout navigation={setFeatures} isNavigation={showFeatures}> <Solutions isActive={showFeatures}/></NavLayout>) : (
                        <NavLayout >
                            <div className='flex  sm:flex-col lg:flex-row w-full'>      
                               <Navitems routeName="Pricing" routeLink="/pricing" isLink={true} />
                                <Navitems routeName="Community" routeLink="https://chat.whatsapp.com/Lugl9SwxFhe6hQyJ34lJ6t" isLink={true} />
                            </div>
                        </NavLayout>
                    )}

                    {showSolution && (
                        <div onMouseLeave={()=> {setSolution(false)}} className='sm:hidden lg:flex'>
                            <Solutions isActive={showSolution}/>
                        </div>
                    )}

            </nav> 
           
            

    )
}


