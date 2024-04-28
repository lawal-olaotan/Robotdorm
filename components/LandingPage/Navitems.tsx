import Link from 'next/link';
import { NextPage } from 'next'; 

interface Props{
    routeName:string;
    routeLink:string;
}

export const Navitems:NextPage<Props> = (Props) => {
    const {routeName,routeLink} = Props
    return (
        <Link href={routeLink} ><a className="px-6 py-2 hover:bg-white hover:text-primary sm:mb-8 lg:mb-0" > 
        <span className='mb-0'>{routeName}</span>
        </a></Link>

    )
}