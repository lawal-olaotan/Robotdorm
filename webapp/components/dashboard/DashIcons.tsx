import {NextPage} from 'next';
import Link from 'next/link';

interface Props {
    imgsrc : string,
    soLink : string,
}

export const DashIcons: NextPage<Props>=(Props) => {
    const {imgsrc,soLink} = Props

    return (
        <Link href={soLink}><a className="w-[24px] mr-4"> 
                <img className="w-100" src={imgsrc} alt="fb" />
        </a></Link>
    )
}