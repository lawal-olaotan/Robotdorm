import Link from 'next/link';
import { NextPage } from 'next'; 


interface Props{
    sectionTitle:string;
    sectionSubTitle:string;
    imgTitle:string;
}

export const DynamicSection:NextPage<Props> = (Props)=> {

    const {sectionTitle,sectionSubTitle,imgTitle} = Props
    
    return (
        <>

            <div className='lg:flex bg-gradient-to-bl from-sky-100 to-blue-500 sm:flex-col lg:flex-row items-center justify-center sm:h-auto'>

            <div className='lg:flex justify-between items-center lg:py-12 2xl:py-20  xl:px-24 sm:px-6 sm:py-12  lg:px-12 2xl:w-[1440px] m-auto'>

                <div className="text-black sm:w-full lg:w-[44%] 2xl:w-1/2 sm:text-center lg:text-left">

                    <h3 className="sm:text-4xl xl:text-5xl font-bold  leading-[80px] mb-8 2xl:mb-10">{sectionTitle}</h3>

                    <p className="lg:text-base mb-12">{sectionSubTitle}</p>

                    <Link href="https://chromewebstore.google.com/detail/robotdorm-jumia-keyword-t/iebnenlmoeolohhmbjilijlgpjbjljhm?hl=en-GB" ><a className=" sm:hidden lg:inline px-12 py-4 bg-secondary text-white rounded-md">Get Started</a>
                    </Link>

                    <Link href="/dashboard" ><a className="lg:hidden px-12 py-4 bg-secondary text-white rounded-md">Get Started</a>
                    </Link>
                </div>

                <div className="lg:w-[33%] sm:hidden lg:block sm:mt-20 lg:m-0 h-fit shadow-md">
                    <img className="w-full rounded-lg" src={imgTitle} alt="extensionpic" />
                </div>
            </div>

            </div>
            

        </>
        
        


        )

}