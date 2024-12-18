import FeatherIcon from 'feather-icons-react'
import { useRouter } from 'next/router'
import { checkout } from 'util/payment'
import { UserSession } from 'interface/userSes'
import { NextPage } from 'next'
import  { useState } from 'react'


export const PriceList:NextPage<UserSession> = (UserSession)=> {


    const BEEID = process.env.NEXT_PUBLIC_BEEID
    const ATLASID = process.env.NEXT_PUBLIC_ATLASID

    // TODO: Transfer as a JSON to S3 
    const pricingdescriptions = [

        {
            title:'Bee',
            subtitle:"For short-term product research",
            priceTitle:"£5/week",
            priceSubTitle:"Billed Weekly",
            priceId:BEEID,
            isDemo:false,
            trialDays:1,
            features:['Unlimited search Access', '7 day access']
        },
        {
            title:'Atlas',
            subtitle:"For professional sellers",
            priceTitle:"£12/month",
            priceSubTitle:"billed Monthtly",
            priceId:ATLASID,
            isDemo:false,
            trialDays:7,
            features:['Everything in Bee plan','Monthly access',]
        },
        {
            title:'Enterprise',
            subtitle:"For brands looking to dominate ecommerce segment",
            priceTitle:"",
            priceSubTitle:"Contact sales for pricing",
            priceId:'',
            isDemo:true,
            trialDays:0,
            features:['API access','Everything in Bee plan', 'custom solutions']
        }
    ]
    const router = useRouter()
    const [priceLists,setPriceList] = useState(pricingdescriptions)
    const {user} = UserSession


    
    const routePaymentButtons = async(event:React.SyntheticEvent)=> {
        event.preventDefault();

        if(user === null) return router.replace('/login')

        const  button = event.target as HTMLButtonElement;
        const priceId = button.getAttribute('data-priceid');
        const trialDays = button.getAttribute('data-free');
        if(!priceId) router.push('https://us12.list-manage.com/contact-form?u=2fb544e735311cbddb1b13831&form_id=77652526220b2b199c0794a74dbfbe86'); 
    
        const return_url = window.location.href
        const success_link = process.env.NEXT_PUBLIC_SUCCESS_URL as string
        const checkoutInformation = {priceId,return_url,email:user?.email,userId:user?.id,trialDays,success_link}

        // TODO get user section and 
        const checkoutSession = await checkout('POST',checkoutInformation);
        router.replace(checkoutSession.session.url)

    }




    return (
        <div  className="flex justify-center lg:flex-row sm:flex-col lg:space-y-0 lg:space-x-8 sm:space-y-6 sm:space-x-0">

        {pricingdescriptions.map((pricing,index)=>(
            <div key={index} className="bg-white p-6 2xl:w-1/4 sm:w-full">
                <div className="my-3">
                    <h3 className="text-2xl font-medium">{pricing.title}</h3>
                    <span className="text-sm">{pricing.subtitle}</span>
                </div>
                <div className="my-6">
                    <h3 className="text-3xl font-black">{pricing.priceTitle}</h3>
                    <span className="text-xs">{pricing.priceSubTitle}</span>
                </div>
                
                <button onClick={routePaymentButtons} data-priceid={pricing.priceId} data-free={pricing.trialDays} className="my-3 px-10 py-2 bg-sky-600 text-white">
                    
                    { !pricing.isDemo ? "Get started" : "Request Demo"}</button>

                <div className="my-4">
                    {pricing.features.map((feature,index)=>(
                        <div key={index} className="flex items-center">
                        <FeatherIcon icon="check"/>
                        <span className="mx-2">{feature}</span>
                    </div>

                    ))}
                </div>
            </div>
        ))}

    </div>
    )
}