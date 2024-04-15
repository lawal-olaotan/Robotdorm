import FeatherIcon from 'feather-icons-react'
import { useRouter } from 'next/router'
import { checkout } from 'lib/payment'


export const PriceList = ()=> {
    const router = useRouter()
    //TODO: create a currency conversion based on users ip address

    const pricingdescriptions = [

        {
            title:'Bee',
            subtitle:"For short-term product research",
            priceTitle:"£5/week",
            priceSubTitle:"Unlimited access to product research tool.",
            priceId: "price_1P54Q1AvIJrXKY258zAoNyIg",
            isDemo:false,
            trialDays:1,
            features:['Weekly access','30 min expert session']
        },
        {
            title:'Atlas',
            subtitle:"For professional sellers",
            priceTitle:"£12/month",
            priceSubTitle:"£12 billed monthtly",
            priceId:"price_1P54QMAvIJrXKY25O0u9fpqR",
            isDemo:false,
            trialDays:7,
            features:['7 day free trial','Cancel anytime']
        },
        {
            title:'Enterprise',
            subtitle:"For brands looking to dominate ecommerce segment",
            priceTitle:"",
            priceSubTitle:"Contact sales for pricing",
            priceId:'',
            isDemo:true,
            trialDays:0,
            features:['API access','customer success manager']
        }
    ]

    const routePaymentButtons = async(event:React.SyntheticEvent)=> {
        event.preventDefault();
        const  button = event.target as HTMLButtonElement;
        const priceId = button.getAttribute( 'data-priceId');

        if(!priceId) router.push('https://us12.list-manage.com/contact-form?u=2fb544e735311cbddb1b13831&form_id=77652526220b2b199c0794a74dbfbe86')
        
        const trialDays = button.getAttribute('data-free');
        const checkoutInformation = {priceId,referer:"http://localhost:3000/pricing",email:"leo@robotdorm.com",trialDays,userId:'olaotan72635353'}

        // TODO get user section and 

        const {session }= await checkout('POST',checkoutInformation)
        router.replace(session.url)

    }

    return (
        <div  className="flex lg:flex-row sm:flex-col lg:space-y-0 lg:space-x-8 sm:space-y-6 sm:space-x-0">

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
                
                <button onClick={routePaymentButtons} data-priceId={pricing.priceId} data-free={pricing.trialDays} className="my-3 px-10 py-2 bg-sky-600 text-white">{!pricing.isDemo ? "Get started" : "Request Demo"}</button>

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