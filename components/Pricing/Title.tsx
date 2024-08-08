import Image from 'next/image'
import { NextPage } from 'next'
interface TitleProps {
    subTextPos:string,
    logoSize:number
}

export const Title:NextPage<TitleProps> = (TitleProps)=> {

    const { subTextPos,logoSize}=TitleProps;

    const supportedCountries = ['dz','ng','ke','ug','tn','ma','eg','za','sn','ci','gh']

    return (
        <div className="my-12 p-4 sm:text-center">
                        <h2 className="lg:text-3xl sm:text-xl font-bold">Trusted by 600+ Sellers.</h2>
                    <div className={`my-4 ${subTextPos}`}>
                        <h2 className="text-gray-700">LIVE IN 11 COUNTRIES</h2>
                        <div className="overflow-hidden flex items-center justify-center my-4">
                            {  supportedCountries.map((country,index)=> (
                                <div key={index} className='mx-1'>
                                     <Image  className="rounded-full" height={logoSize} width={logoSize} src={`https://flagcdn.com/h120/${country}.png`} alt="robotdorm-logo" />
                                </div>
                           
                            ))
                            }
                        </div>
                    </div>
        </div>
    )
}