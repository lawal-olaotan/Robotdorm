

import {NextPage} from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface Props{
    dashLink:string,
    dashSrc: string,
    dashText:string,
    dashBg?: string,
    trigger: ()=> void
    isHidden:boolean
}

export const DashItems: NextPage<Props> = (Props) => {
    const {dashLink, dashSrc, dashText,dashBg,trigger,isHidden} = Props; 
    const router = useRouter();

    const dashEvent = () => {
        trigger()
        router.push(dashLink)
    }


    return (
        <button onClick={dashEvent} className={`${router.pathname == dashLink ? "bg-primary" : "bg-transparent" } ${dashBg} ${isHidden ? 'sm:flex lg:hidden' : 'flex'}   items-center m-0 px-6 py-4 w-[288px] lg:hover:bg-primary`}>
                            <Image width={30} height={30} src={dashSrc} alt={dashText} />
                            <span className='ml-6 lg:text-base sm:text-xl'>{dashText}</span>
        </button>
    )
}