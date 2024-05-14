import {Stripe as _Stripe, loadStripe} from '@stripe/stripe-js'; 
import Stripe from 'stripe';

let stripePromise: Promise<_Stripe | null>;

export const createStripeInstance = ()=>{
    if(!stripePromise){
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC!)
    }
    return stripePromise;
}

export const paymentEngine = ()=>{

    const stripe = ()=> {
        return new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });
    }

    const customerDetails = async(email:string,client:any)=> {
        const customerDetails = await client.customers.list({
            email: email,
            limit: 1
        })
        if(!customerDetails) return false
        return customerDetails
    }

    const portalUrl = async(email:string)=> {
        const client = stripe();
        const {data} = await customerDetails(email,client)
        if(!data.length) return false;

        const session =  await client.billingPortal.sessions.create({
        customer: data?.[0].id,
        return_url: process.env.RETURN_URL as string 
    });
        return session.url;
        
    }


    return {
        portalUrl
    }



    
};


export const checkout = async (method: string, data:any) => {
    const stripeCheckoutRoute = process.env.NEXT_PUBLIC_PAYMENT_SERVICE as string
        try {
          const apicall = await fetch(stripeCheckoutRoute,
            {
              method: method,
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const apifetchResponse = await apicall.json();
          return apifetchResponse;
        } catch (error) {
          console.log(`Error ${error}`);
        }
}
