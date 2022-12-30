import { NextPage } from 'next';


interface Props{
    keyWord:string,
    EstTotalRevenue: string,
    EstAverageRevenue: string,
    EstTotalUnitsSold: string,
    AveragePrice:string
}

export const Summary: NextPage<Props> = (Props) => {

    const { keyWord, EstTotalRevenue,EstAverageRevenue, EstTotalUnitsSold, AveragePrice} = Props

    return (
        <>
        { <div key={EstTotalRevenue} className="flex flex-col p-8 bg-white mr-8 rounded-lg mb-8 shadow-6xl w-1/5 xl:w-1/4">
                        <p className="mb-6 font-semibold"> <span>Keyword:</span> <span className="text-secondary">{keyWord}</span> </p>
                        <div key={keyWord} className="flex flex-col">
                            <div key={EstTotalRevenue} className="flex mb-4">
                                <p className="flex flex-col text-center mr-6">
                                    <span   className="text-xs mb-2 text-gray-600">Est. Total Revenue</span>
                                    <span className="text-secondary font-semibold">{EstTotalRevenue}</span>
                                </p>
                                <p className="flex flex-col text-center mr-6">
                                    <span className="text-xs mb-2 text-gray-600">Est. Avg Revenue</span>
                                    <span className="text-secondary font-semibold">{EstAverageRevenue}</span>
                                </p>
                            </div>
                            <div key={EstTotalUnitsSold} className='flex'>
                                <p className="flex flex-col text-center mr-6">
                                    <span className="text-xs mb-2 text-gray-600">Est. Total Units Sold</span>
                                    <span className="text-secondary font-semibold">{EstTotalUnitsSold}</span>
                                </p>
                                <p className="flex flex-col text-center mr-6">
                                    <span className="text-xs mb-2 text-gray-600">Average Price</span>
                                    <span className="text-secondary font-semibold">{AveragePrice}</span>
                                </p>
                            </div>
                            
                        </div>
        </div>}
        </>
    )
 }