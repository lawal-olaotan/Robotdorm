import { Navbar } from "./Navbar"
import { Section }from './Section'

 const  Hero = () => {
    return (
        <div className="bg-primary  xl:px-24 sm:p-4  lg:px-12 2xl:px-72">
            <Navbar/>
            <Section/>
            <div className="bg-transparent lg:hidden sm:flex text-center text-white h-[80vh] items-center justify-center flex-col">
                <h3 className="text-3xl mb-8 font-semibold">Sorry web version not currently available</h3>
                <p className="text-2xl"> Launching soon</p>
            </div>
        </div>
    )
}

export default Hero; 