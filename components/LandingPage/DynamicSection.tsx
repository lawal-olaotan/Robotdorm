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
        <div className=' sm:hidden lg:flex bg-gradient-to-bl from-sky-100 to-blue-500 sm:flex-col lg:flex-row items-center justify-center sm:h-auto xl:h-[60vh] lg:h-[50vh]'>
            <div className='lg:flex justify-between items-center py-12 2xl:py-20  xl:px-24 sm:p-10  lg:px-12 2xl:w-[1440px] m-auto'>

                <div className="text-black sm:w-full lg:w-[40%] 2xl:w-1/2">

                    <h3 className=" sm:text-3xl xl:text-5xl  leading-normal font-bold  mb-8 2xl:mb-10">{sectionTitle}</h3>

                    <p className="lg:text-base sm:text-sm mb-12">{sectionSubTitle}</p>

                    <Link href="/pricing" ><a className="px-12 py-4 bg-sky-600 text-white rounded-md">Get started</a>
                    </Link>
                </div>

                <div className="lg:w-[33%] sm:w-full sm:mt-20 lg:m-0 h-fit shadow-md">
                    <img className="w-100 rounded-lg" src={imgTitle} alt="extensionpic" />
                </div>
         </div>

        </div>
        


        )

}