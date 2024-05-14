import React from 'react';
import { Layouts01 } from "@components/Layouts01"



export default function Terms(){

    const terms = [
        {
            title:'Introduction to Services',
            term:'RobotDorm, referred to as "RobotDorm," provides educational services to support Amazon merchants. owned by RobotDorm UK LTD, a limited partnership.'
        },
        {
            title:'Membership Requirements',
            term:'The member who creates the account and provides payment information ("Account Owner") controls the account and is responsible for its activity. Sharing login credentials is prohibited, and account owners must update their information promptly. RobotDorm may terminate accounts to protect users'
        },
        {
            title:'Payment Policies',
            term:'RobotDorm offers various subscription plans, billing users according to their chosen plan. Users must provide valid payment methods, and fees are billed on the subscription date. Cancellation is allowed at any time, with access until the end of the billing cycle.'
        },
        {
            title:'Refund Policy',
            term:'RobotDorm offers a Money Back Guarantee if users contact Customer Support within 7 days of their original sign-up. The guarantee is applicable only to the first purchase, and requests made after the 7-day period are not eligible. Renewal orders are not covered under the Money Back Guarantee.'
        },
        {
            title:'Privacy and Data Handling',
            term:'RobotDorm prioritizes data security and uses precautions to protect personal information. Data is stored on US servers, and retention complies with legal requirements. Users rights regarding data usage are outlined in the Privacy Policy.'
        },
        {
            title:'Legal Disclaimers and Limitations:',
            term:'RobotDorm disclaims warranties regarding service interruptions and data accuracy. It limits liability for damages arising from service use and does not guarantee specific outcomes. Users agree to indemnify RobotDorm for any breach of terms.'
        },
        {
            title:'Account Ownership and Security:',
            term:'The member who creates the account and provides payment information ("Account Owner") controls the account and is responsible for its activity. Sharing login credentials is prohibited, and account owners must update their information promptly. RobotDorm may terminate accounts to protect users.'
        },
        {
            title:'Miscellaneous',
            term:' Intellectual property rights, international user compliance, and dispute resolution are addressed. The agreement survivability post-termination, non-assignment clause, and communication methods are also detailed. Users are provided with contact information for support and copyright infringement claims.'
        }
    ]

    return(
        <Layouts01>
            <div className='bg-gradient-to-bl from-sky-100 to-blue-500 2xl:w-[1440px] m-auto  pt-2 xl:px-24 lg:px-12 sm:py-4 sm:px-8 space-y-8'>
                <div className='font-bold'>
                    <h1 className='text-4xl mb-6'>RobotDorm Terms of Service</h1>
                    <span>Last Updated May 01, 2024</span>
                </div>
                <p className='font-bold'>
                    Please read these Terms of Service (“Terms”) carefully. BY USING THE SERVICES AND THE SITE, YOU AGREE TO THESE TERMS. IF YOU DO NOT AGREE, DO NOT USE THE SERVICES.
                </p>
                <ol className='list-decimal space-y-6'>
                    {
                    terms.map((term,index)=> (
                        <li key={index}>
                              <h5 className='font-semibold'>{term.title}</h5>
                              <p>{term.term}</p>
                        </li>
                    ))
                    }
                   
                </ol>
               

            </div>
        </Layouts01>
    )
}