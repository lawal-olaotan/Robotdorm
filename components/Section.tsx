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
        <div className='bg-primary sm:hidden lg:flex items-center justify-center xl:h-[60vh] lg:h-[50vh]'>
            <div className='lg:flex justify-between items-center lg:py-12 2xl:py-20  xl:px-24 sm:p-4  lg:px-12 2xl:w-[1440px] m-auto'>
            <div className="text-white lg:w-[46%] 2xl:w-1/2">

                <h3 className="xl:text-4xl lg:text-4xl xl:leading-normal font-semibold mb-8 2xl:mb-10">
                    {sectionTitle}
                </h3>

            <p className="text-xl mb-12"> {sectionSubTitle}</p>

            <Link href="https://chrome.google.com/webstore/detail/robotdorm-chrome-extensio/iebnenlmoeolohhmbjilijlgpjbjljhm/related?hl=en-GB&authuser=0">
                <a className="px-8 py-4 bg-white text-primary rounded-lg">Install Chrome Extension</a>
            </Link>
            </div>
            <div className="w-[33%]">
                <img className="w-100 rounded-lg" src={imgTitle} alt="extensionpic" />
            </div>
        </div>

        </div>
        


        )

}