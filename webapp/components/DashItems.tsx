import {NextPage} from 'next';
import Link from 'next/link'; 

interface Props{
    dashLink:string,
    dashSrc: string,
    dashText:string
}

export const DashItems: NextPage<Props> = (Props) => {

    const {dashLink, dashSrc, dashText} = Props

    return (

        <Link href={dashLink}><a className="flex items-center px-6 py-4 w-[288px] hover:bg-primary">
                        <img className="w-[30px] mr-6" src={dashSrc} alt={dashText} />
                        <span>{dashText}</span>
            </a></Link>

    )
}