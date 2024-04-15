import { Section }from './Section'
import { Second } from './Second'
import {DynamicSection} from './DynamicSection'

export const Hero = () => {
    return (
        <div>
            <DynamicSection sectionSubTitle="Jumia, Africa largest ecommerce business generated $186 Million in 2023. Find bestselling products and grow your ecommerce businesses using robotdorm" sectionTitle={`Become a Jumia best seller`} imgTitle="/firstpic.png"/>
            <Second/>
            <Section sectionSubTitle="Robotdorm chrome extension gives you the right data to make important business decisions faster. find best selling products using robotdorm" sectionTitle="Outclass your competitors" imgTitle="/secondpic.png"/>
        </div>
    )
}


