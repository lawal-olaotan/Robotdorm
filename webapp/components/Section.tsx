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
        <div className='lg:flex justify-between items-center lg:py-12 2xl:py-20 sm:hidden bg-primary  xl:px-24 sm:p-4  lg:px-12 2xl:px-72'>
        <div className="text-white lg:w-[46%] 2xl:w-1/2">

            <h3 className="xl:text-5xl 2xl:text-8xl lg:text-4xl xl:leading-normal font-semibold mb-8 2xl:mb-16">
                {sectionTitle}
            </h3>

           <p className="text-xl 2xl:text-4xl mb-12 2xl:mb-16"> {sectionSubTitle}</p>

           <Link href="/">
               <a className="px-8 py-4 bg-white text-primary rounded-lg">Add Chrome Extension</a>
           </Link>
        </div>
        <div className="w-[33%]">
            <img className="w-100 rounded-lg" src={imgTitle} alt="extensionpic" />
        </div>

    </div>


        )

}