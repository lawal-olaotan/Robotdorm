import { Layouts01 } from "@components/Layouts01"
import type { ReactElement } from 'react'
import  Head  from 'next/head';
import { AboutSec } from '@components/AboutSec';

export default function About(){
    return (
        <div>
            <Head>
                <title>About Us | RobotDorm</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>

                <div className='sm:p-4 lg:py-10 xl:px-24 lg:px-12 2xl:w-[1440px] m-auto flex flex-col text-center'>
                    <h2 className="text-xl font-bold mb-4">Who We Are</h2>
                        <p className='sm:w-full lg:w-[80ch] m-auto'>Robotdorm is an ecommerce company focused in creating marketplace commerce business in Africa with huge presence in Lagos,Nigeria and Nairobi,Kenya. Founded in 2018, Robotdorm has sold and shipped thousands of products on ecommerce platforms like Jumia and through it's independent stores built on Shopify and Woo-commerce.</p>
                </div> 

                <AboutSec 
                secBgColor='bg-primary'
                secTextColor='text-white'
                orderContent='order-2'
                orderImg='order-1'
                secImage='/working-culture.jpeg'
                secTitle='Work Culture'
                secContent='As a small yet growing company, we credit our success to our employees whom, without, we would not exist. We value creativity and reward our people for it. Because we are building a company for the future, we welcome everyone regardless of who they are.'
                />
                <AboutSec 
                secBgColor='bg-white'
                secTextColor='text-primary'
                orderContent='order-1'
                orderImg='order-2'
                secImage='/data-analysis.jpeg'
                secTitle='Data Driven'
                secContent='As a frontline business, our primary purpose is to satisfy the growing needs of our customers and business clients. At robot dorm, we treat data as a strategic asset and build infrastructures to make it available to everyone within our ecosystem.'
                />
            </main>
        </div>
    )
}

About.getLayout = function getLayout(page:ReactElement){

    return (
        <Layouts01>
        {page}
        </Layouts01>

    )
   
} 