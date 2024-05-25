
import React from 'react'; 
import { DashLayout } from '@components/dashboard/DashLayout';
import { DashHead } from '@components/dashboard/DashHead';
import { DashTitle } from '@components/dashboard/DashTitle';
import { MarketPlaceCard } from '@components/dashboard/MarketPlaceCard';

export default function MarketPlace(){
    const supportedWebsites = [
        {
            name:'ghana',
            url:'https://www.jumia.com.gh/',
            countryName:'Ghana'
        },
        {
            name:'nigeria',
            url:'https://www.jumia.com.ng/',
            countryName:'Nigeria'
        },
        {
            name:'morocco',
            url:'https://www.jumia.ma/',
            countryName:'Morocco'
        },
        {
            name:'kenya',
            url:'https://www.jumia.co.ke/',
            countryName:'Kenya'
        },
        {
            name:'uganda',
            url:'https://www.jumia.ug/',
            countryName:'Uganda'
        },
    ]

    return (
        <DashLayout>
            <DashHead PageName="MarketPlace"/> 
            <div>
                <DashTitle DashTitle="Marketplaces"/>
                    <div className='mt-8 flex items-center space-x-6 flex-wrap'>
                    { supportedWebsites.map((marketplace,index)=> ( 
                            <MarketPlaceCard url={marketplace.url} countryName={marketplace.countryName} key={index} name={marketplace.name} /> 
                        ))}

                    </div>
                    
            </div>   
      </DashLayout>
)}
