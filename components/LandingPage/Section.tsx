import Link from 'next/link';
import { NextPage } from 'next'; 


interface Props{
    sectionTitle:string;
    sectionSubTitle:string;
    imgTitle:string;
}

export const Section:NextPage<Props> = (Props)=> {

    const {sectionTitle,sectionSubTitle,imgTitle} = Props
    
    return (
        <div className='bg-gradient-to-tl from-sky-100 to-blue-500 lg:flex-row sm:flex-col  items-center justify-center xl:h-[60vh] lg:h-[50vh]'>
            <div className='lg:flex justify-between items-center lg:py-12 2xl:py-20  xl:px-24 sm:px-6 sm:py-16  lg:px-12 2xl:w-[1440px] m-auto'>
            <div className="text-white lg:w-[46%] 2xl:w-1/2 sm:text-center lg:text-left">

                <h3 className="xl:text-4xl text-black sm:text-4xl xl:leading-normal font-semibold mb-8 2xl:mb-10">
                    {sectionTitle}
                </h3>

                <p className="text-sm mb-12 text-black"> {sectionSubTitle}</p>

            <Link href="https://chromewebstore.google.com/detail/iebnenlmoeolohhmbjilijlgpjbjljhm?hl=en-GB">
                <a className="px-8 py-4 bg-secondary rounded-lg sm:hidden lg:inline-block">Install Chrome Extension</a>
            </Link>

            <Link href="/dashboard">
                <a className="px-8 py-4 bg-secondary  rounded-lg lg:hidden">Start a free trial</a>
            </Link>
            </div>
            <div className="w-[33%] shadow-lg shadow-primary sm:hidden lg:inline">
                <img className="w-100 rounded-lg" src={imgTitle} alt="extensionpic" />
            </div>
        </div>

        </div>
        


        )

}