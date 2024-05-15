import Link from 'next/link'
import FeatherIcons from 'feather-icons-react'
import { NextPage } from 'next';


interface Props{
    title:string;
    description?: string,
    links:{
        title:string,
        url:string
    }[],
    logo:string;
}


export const Solution:NextPage<Props> = (Props) => {
    const { title, description, links,logo} = Props
    return (
        <div className={`sm:w-full lg:w-[45%]`}>
            <div className='flex items-center space-x-2 font-bold my-2'>
                <FeatherIcons icon={logo}/>
                <h2>{title}</h2>
            </div>
            <p className='lg:text-xs sm:text-base'>{description}</p>
             <div className='my-4 flex flex-col lg:text-sm sm:text-lg space-y-3'>
                {
                    links.map((item:any,index:number)=> (
                        <Link key={index} href={item.url}><a className='hover:text-blue hover:font-bold'>{item.title}</a></Link>
                    ))
                }
             </div>
        </div>
    )
}


interface SolutionsProps{
    isActive?:boolean
    customStyle?:string
}


export const Solutions:NextPage<SolutionsProps> = ({isActive,customStyle}) => {


    const sellersSolutions = [
        {title:"Sell on Jumia",
            url:"https://calendly.com/robotdorm/30min"
        },
        {title:"Setup TikTok Shop",
            url:"https://calendly.com/robotdorm/30min"
        }
    ]

    const brandSolutions = [
        {title:"API Access",
        url:"https://calendly.com/robotdorm/30min"
    },
    {title:"Storage and Fulfilment",
        url:"https://calendly.com/robotdorm/30min"
    }
    ]

    return (
        <div className={`${isActive ? 'flex': ' hidden' } ${customStyle} lg:bg-white sm:h-screen lg:h-fit lg:shadow-md sm:shadow-none  lg:flex-row lg:justify-between sm:flex-col lg:absolute sm:relative  lg:top-11 sm:top-0 text-black m-auto xl:right-[10rem] desktop:right-[21rem] lg:w-[35%]  desktop:w-[25%] sm:w-full sm:space-y-4 lg:space-y-0 sm:px-4 sm:py-0 lg:p-6 lg:rounded-lg z-20`}>
            <Solution logo='package' links={sellersSolutions} title='New Sellers' description='Start and grow your ecommerce business with RobotDorm.'/>
            <Solution logo='award' links={brandSolutions} title='Enterprise customers' description='Empower business decisions with market intelligence for leading global brands.'/>
        </div>
    )
}