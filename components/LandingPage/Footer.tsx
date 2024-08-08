import Link from 'next/link';
import Image from 'next/image'
import FeatherIcon from 'feather-icons-react';

interface Icons {icon: string,link:string}

export const Footer = () => {

    const Myicons: Icons [] = [

        { 
            icon:"facebook",
            link:"https://www.facebook.com/robotdorm"
        },
       {
            icon:"instagram",
            link:"https://www.instagram.com/robotdorm/?hl=en"
        },{
            icon:"linkedin",
            link:"https://www.linkedin.com/company/robot-dorm/"
        }
        ,{
            icon:"twitter",
            link:"https://twitter.com/robotdorm"
        }
    ]
    
    return(
        <div className="bg-secondary from-sky-100 to-blue-500 text-white  space-y-6 mt-8">

            <div className='2xl:w-[1440px] m-auto w-full grid items-center xl:px-24 lg:px-12 sm:py-8 sm:px-6 space-y-6'>

                    <div className='flex sm:flex-col lg:flex-row lg:items-center justify-between border-b border-sky-200 my-6 pb-4'>
                            <Link href="/"><a><Image src='/logo.png' alt='logo' width={180} height={60} /></a></Link>
                        <div className="flex items-center  space-x-6 my-6">
                                { Myicons.map((icons: Icons)=> (
                                    <Link key={icons.link} href={icons.link}><a className='hover:text-black'><FeatherIcon size={22} icon={icons.icon} /></a></Link>
                                ))}
                        </div>
                    </div>

                    <div className='flex sm:flex-col lg:flex-row lg:items-center lg:justify-between space-y-4'>
                        <div className='text-base flex items-center space-x-6'>
                            <Link href='/privacy'><a>Privacy</a></Link>
                            <Link href='/terms'><a>Terms of Use</a></Link>
                            <Link href='https://us12.list-manage.com/contact-form?u=2fb544e735311cbddb1b13831&form_id=77652526220b2b199c0794a74dbfbe86https://us12.list-manage.com/contact-form?u=2fb544e735311cbddb1b13831&form_id=77652526220b2b199c0794a74dbfbe86'><a>Contact</a></Link>
                        </div>
                        <span className="text-base">© 2024 Robot Dorm</span>
                    </div>

            </div>

            
            
        </div>
        )

}