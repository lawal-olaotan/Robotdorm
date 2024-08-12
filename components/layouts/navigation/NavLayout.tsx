
import Link from 'next/link';
import { useState, useEffect } from 'react'; 
import Image from 'next/image'
import { useRouter } from 'next/router';
import FeatherIcons from 'feather-icons-react'
import { NextPage } from 'next';
import useAuthContext from "@context/AuthContext"


interface NavLayoutProps{
    children:React.ReactNode
    navigation?:React.Dispatch<React.SetStateAction<boolean>>
    isNavigation?:boolean
}

export const NavLayout:NextPage<NavLayoutProps> = ({children,navigation,isNavigation}) => {
    const [active, setActive] = useState(false);
    const router = useRouter(); 
    const {url} = useAuthContext()


    useEffect(() =>{
        setActive(false)
    },[router?.asPath])

    return (
        <>
            <div className='2xl:w-[1440px] m-auto flex items-center justify-between pt-2 xl:px-24 lg:px-12 sm:p-4'>
                <Link  href="/">
                    <a className="inline-flex lg:w-1/4 sm:w-full"> 
                            <Image height={50} width={160} src="/logo2.png" alt="robotdorm-logo" />
                    </a>
                </Link>

                <div className='flex items-center space-x-6 w-fit'>

                    <div className= { `${active ? 'flex' : 'hidden'} z-0 lg:flex w-auto lg:flex-row items-center lg:space-x-6 sm:justify-start lg:p-0 sm:p-4 lg:h-fit sm:h-screen lg:bg-transparent lg:relative lg:text-base lg:text-sky-600 sm:absolute sm:flex-col sm:w-full sm:top-0 sm:left-0 sm:py-20 sm:bg-white sm:text-black sm:text-2xl sm:z-10`}>
                        <div>
                                    <div className='lg:hidden flex items-center'>
                                        <button className='absolute top-6 right-6 text-base' onClick={()=> {setActive(!active);}}>
                                                    <FeatherIcons icon='x'/>
                                        </button>
                                        
                                        {isNavigation && (<button onClick={()=> navigation(false)} className='flex items-center w-1/4 absolute top-6 left-6'>
                                            <FeatherIcons  icon='chevron-left'/>
                                            <span className='text-sm'>Back</span>
                                        </button>)}
                                    </div>
                    
                        </div>
                        {children}
                        <Link href={url}><a className="mt-20 lg:hidden px-12 py-2 text-white bg-secondary ">Login</a></Link>
                    </div>

                    <Link href={url}><a className="px-6 py-2 text-sm text-white bg-secondary sm:mr-3">Login</a></Link>

                </div>

                
                <button className="lg:hidden inline-flex outline-none text-secondary ml-6" onClick={()=> {setActive(!active);}}>
                        <FeatherIcons icon='menu' size={34}/>
                </button>
                
            </div>
        </>
    )
}



