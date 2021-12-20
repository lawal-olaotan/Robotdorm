import Link from 'next/link'

export const Section = ()=> {
    return (
        
        <div className='bg-transparent lg:flex justify-between items-center lg:py-12 2xl:py-20 sm:hidden'>
        <div className="text-white lg:w-[46%] 2xl:w-1/2">

            <h3 className="xl:text-5xl 2xl:text-8xl lg:text-4xl xl:leading-normal font-semibold mb-8 2xl:mb-16">
                Free access to best-selling products in a click.
            </h3>

           <p className="text-xl 2xl:text-4xl mb-12 2xl:mb-16">Start or scale your jumia business with accurate market insight in minutes.</p>

           <Link href="/">
               <a className="px-8 py-4 bg-white text-primary rounded-lg">Add Chrome Extension</a>
           </Link>
        </div>
        <div className="w-[33%]">
            <img className="w-100 rounded-lg" src="/firstpic.png" alt="extensionpic" />
        </div>

    </div>


        )

}