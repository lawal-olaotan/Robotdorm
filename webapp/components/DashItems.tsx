import {NextPage} from 'next';
import Link from 'next/link'; 
import {useState} from 'react'; 
import { useRouter } from 'next/router'; 

interface Props{
    dashLink:string,
    dashSrc: string,
    dashText:string,
    dashBg?: string
}

export const DashItems: NextPage<Props> = (Props) => {

    const {dashLink, dashSrc, dashText,dashBg} = Props; 
    const router = useRouter(); 


    return (
        <Link href={dashLink}><a className={`${router.pathname == dashLink ? "bg-primary" : "bg-transparent" } ${dashBg}  flex items-center px-6 py-4 w-[288px] hover:bg-primary`}>
                        <img className="w-[30px] mr-6" src={dashSrc} alt={dashText} />
                        <span>{dashText}</span>
            </a></Link>

    )
}