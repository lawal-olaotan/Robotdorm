import Link from 'next/link';
import {NextPage} from 'next'
import Image from 'next/image';

interface Props {
    Title: string;
}

export const Lheader: NextPage<Props> = (Props) => {
    const{Title} = Props
    return (
        
        <div className="flex flex-col items-center mb-8">
            <Link  href="/"><a className="inline-flex lg:w-52 sm:w-48 mb-5"> 
                        <Image width={200} height={60} className="w-100" src="/logo2.png" alt="robotdorm-logo" />
                </a></Link>
            <p className='text-base text-primary text-center'>{Title}</p>
        </div>
        
        )
}