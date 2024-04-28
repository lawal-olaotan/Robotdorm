import { Section }from './Section'
import { Second } from './Second'
import {DynamicSection} from './DynamicSection'
import { Review } from '@components/Pricing/Review'
import { Title } from '@components/Pricing/Title'

export const Hero = () => {
    return (
        <div>
            <DynamicSection sectionSubTitle="Jumia generated $186 Million in 2023 with 2.3 million active users. Find best selling product to scale your jumia business using RobotDorm." sectionTitle={`Become a Jumia best seller`} imgTitle="/firstpic.png"/>
            <Second/>
            <div className='flex flex-col items-center justify-center py-4 px-20 bg-gradient-to-bl from-sky-100 to-blue-500'>
                <Title logoSize={50} subTextPos='text-center font-bold'/>
            </div>
            <Section sectionSubTitle="Robotdorm chrome extension gives you the right data to make important business decisions faster. find best selling products using robotdorm" sectionTitle="Outclass your competitors" imgTitle="/secondpic.png"/>
        </div>
    )
}


