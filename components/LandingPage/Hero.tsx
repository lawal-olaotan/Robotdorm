import { Second } from './Second'
import {DynamicSection} from './DynamicSection'
import { Title } from '@components/Pricing/Title'

export const Hero = () => {
    return (
        <div className='lg:mt-20 sm:mt-20'>
            <DynamicSection sectionTitle={`Find winning products in minutes.`} sectionSubTitle="We've removed the guesswork so you can find validated products idea on African's largest ecommerce database." imgTitle="/firstpic.png"/>
            <Second/>
            <div className='flex flex-col items-center justify-center lg:py-4 lg:px-20 bg-gradient-to-bl from-sky-100 to-blue-500'>
                <Title logoSize={60} subTextPos='text-center font-bold'/>
            </div>
            <DynamicSection sectionSubTitle="Robotdorm provides you the tools to find best selling products on Jumia, so you can boost your ecommerce sales and profits." sectionTitle="Outclass your competitors" imgTitle="/secondpic.png"/>
        </div>
    )
}


