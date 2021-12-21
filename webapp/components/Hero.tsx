import { Navbar } from "./Navbar"
import { Section }from './Section'
import { SecondSection } from "./SecondSection"
import {Footer} from './Footer';

 const  Hero = () => {
    return (
        <div>
            <Section sectionSubTitle="Start or scale your jumia business with accurate market insight in minutes." sectionTitle="Free access to best-selling products in a click." imgTitle="/firstpic.png"/>
            <SecondSection/>
            <Section sectionSubTitle="Robotdorm chrome extensions gives you the strength to make important business decisions faster." sectionTitle="Available for free..." imgTitle="/secondpic.png"/>
        </div>
    )
}

export default Hero; 