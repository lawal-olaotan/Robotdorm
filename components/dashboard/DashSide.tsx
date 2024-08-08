import { DashItems } from '@components/dashboard/DashItems';
import { NextPage } from 'next';


interface DashSideProps {
    state:boolean
    stateTrigger: ()=> void
}

export const DashSide:NextPage<DashSideProps> = ({state,stateTrigger}) => {

    const navigations = [
        {
            pathName: 'Dashboard',
            path:"/dashboard",
            Hidden:false,
            icon:"/home.svg",
        },
        {
            pathName: 'Opportunity Finder',
            path:"/dashboard/research",
            Hidden:true,
            icon:"/research.png",
        },
        {
            pathName: 'Search Insights',
            path:"/dashboard/insights",
            Hidden:false,
            icon:"/analytics.png",
        },
        {
            pathName: 'Product Vault',
            path:"/dashboard/lists",
            Hidden:false,
            icon:"/search.png",
        },
        {
            pathName: 'Settings',
            path:"/dashboard/settings",
            Hidden:false,
            icon:"/settings.png",
        },
    ]


    return (
        <div className={` ${state ? 'sm:flex' : 'sm:hidden'} sm:w-full lg:flex h-screen lg:w-[70px] 2xl:hover:w-[15%] lg:hover:w-1/5 lg:hover:transition-[width] lg:hover:ease-out lg:duration-300 bg-secondary flex-col overflow-hidden text-white fixed lg:top-0 sm:top-10 left-0 pt-[4.1rem] z-10 sm:px-8 md:px-0`}>
                    {
                        navigations.map((navigation,index)=> (
                            <DashItems key={index} trigger={stateTrigger} dashLink={navigation.path} dashSrc={navigation.icon}dashText={navigation.pathName} isHidden={navigation.Hidden}/>
                        ))
                    }
                    
                    
        </div>
        )



}
