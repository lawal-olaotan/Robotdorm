import Image from "next/image"
import Link from "next/link"





export const Second = () => {
    return (
        <div className="bg-white lg:py-16 lg:px-24 sm:p-4 my-4 flex items-center justify-center flex-col">
            <div className="text-center sm:mb-12 2xl:mb-20">
                <h2 className="lg:text-4xl sm:text-2xl font-semibold sm:mb-5 2xl:mb-8">Discover the products winning in the market</h2>
                <h4 className="xl:text-xl xl:px-60 lg:px-24 lg:text-base 2xl:px-[30rem] lg:block  sm:hidden">With RobotDorm chrome extension you can use the best data available on jumia to make informed decision to grow your online business.</h4>
                <h4 className="lg:hidden">Be the first to know when we launch our mobile app</h4>
            </div>
            <div className="xl:w-[55%] lg:w-3/5 2xl:w-2/5 md:w-[80%]">
                <img className="drop-shadow-lg rounded-xl" src="/screens.png" alt="screenshot" />
            </div>
                <Link  href="https://dmr4lc06ats.typeform.com/to/HMgznGGN"><a className="lg:hidden sm:flex bg-primary text-white mt-6 text-base p-4">Join waiting list</a></Link>
        </div>
    )
}

