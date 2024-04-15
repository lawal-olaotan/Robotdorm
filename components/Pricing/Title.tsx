import Image from 'next/image'

export const Title = ()=> {

    const supportedCountries = ['dz','ng','ke','ug','tn','ma','eg','za','sn','ci','gh']

    return (
        <div className="my-12">
                        <h2 className="text-3xl font-bold ">The tool trusted by 500+ Jumia Sellers.</h2>
                    <div className='my-4'>
                        <h2 className="text-gray-700">LIVE IN 11 COUNTRIES</h2>
                        <div className="overflow-hidden flex items-center justify-left my-4">

                            {  supportedCountries.map((country,index)=> (
                                <div key={index} className='mx-1'>
                                     <Image  className="rounded-full" height={30} width={30} src={`https://flagcdn.com/h120/${country}.png`} alt="robotdorm-logo" />
                                </div>
                           
                            ))
                            }
                        </div>
                    </div>
        </div>
    )
}