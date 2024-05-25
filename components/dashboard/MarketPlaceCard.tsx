

import {NextPage} from 'next';
import Link from 'next/link'; 
import { useRouter } from 'next/router'; 
import Image from 'next/image';

interface Props{
    name:string,
    countryName:string,
    url?: string
}

export const MarketPlaceCard: NextPage<Props> = (Props) => {
    const {name, countryName, url} = Props; 
    const router = useRouter(); 

    return (
        <Link href={url}><a className='flex flex-col space-y-2 w-fit text-center font-semibold'>
                        <Image className='rounded-md' height={200} width={200}  src={`/${name}.png`} alt={name} />
                        <span>{countryName}</span>
        </a></Link>

    )
}