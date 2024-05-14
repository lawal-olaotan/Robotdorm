import { Section }from './Section'
import { Second } from './Second'
import {DynamicSection} from './DynamicSection'
import { Review } from '@components/Pricing/Review'
import { Title } from '@components/Pricing/Title'

export const Hero = () => {
    return (
        <div>
            <DynamicSection sectionSubTitle="By 2025 half a billion people in Africa will be e-commerce users. Find best selling products and start selling on Africa's biggest marketplace." sectionTitle={`Start and run your Jumia business from anywhere`} imgTitle="/firstpic.png"/>
            <Second/>
            <div className='flex flex-col items-center justify-center py-4 px-20 bg-gradient-to-bl from-sky-100 to-blue-500'>
                <Title logoSize={50} subTextPos='text-center font-bold'/>
            </div>
            <Section sectionSubTitle="Robotdorm provides you the right data to find best selling products on Jumia, that can boost your sales and boost profits" sectionTitle="Outclass your competitors" imgTitle="/secondpic.png"/>
        </div>
    )
}


