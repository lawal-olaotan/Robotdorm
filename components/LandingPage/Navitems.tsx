import Link from 'next/link';
import { NextPage } from 'next';
import FeatherIcons from 'feather-icons-react'
import { useState } from 'react';

interface Props{
    routeName:string;
    routeLink?:string;
    isLink?:boolean
    isArrow?:boolean
    customStyle?:string
}

export const Navitems:NextPage<Props> = (Props) => {
    const {routeName,routeLink,isLink, isArrow, customStyle } = Props
    const [hover,setHoverState] = useState<boolean>(false)
    return (

        <div className={`${customStyle} text-center rounded-2xl px-6 py-2 lg:hover:font-bold  sm:hover:bg-sky-100 hover:text-primary sm:mb-8 lg:mb-0`} onMouseLeave={()=> {setHoverState(false )}} onMouseEnter={()=> {setHoverState(true )}}>
            {
                isLink ? (<Link  href={routeLink} ><a className='flex items-center justify-between'><span className='text-base sm:font-bold lg:font-normal'>{routeName}</span> <FeatherIcons className='lg:hidden'icon={`${!hover ? 'chevron-right' : 'arrow-right'}`} />
                    </a></Link>) : 
                    
                    (
                        <div className='items-center justify-between text-base sm:font-bold lg:font-normal flex items-between w-full'>
                                <span>{routeName}</span>
                                <FeatherIcons className='sm:hidden lg:flex'  icon={`${!hover ? 'chevron-down' : 'chevron-up'}`} />
                                <FeatherIcons className='lg:hidden'icon={`${!hover ? 'chevron-right' : 'arrow-right'}`} />
                        </div>
                    )
               
            
            }
        </div>

        

    )
}