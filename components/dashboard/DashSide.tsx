import { DashItems } from '@components/dashboard/DashItems';



export const DashSide = () => {

    return (

        <div className='h-screen lg:w-[70px] 2xl:hover:w-[15%] hover:w-1/5 hover:transition-[width] hover:ease-out duration-300 bg-secondary flex flex-col overflow-hidden text-white fixed top-0 left-0 pt-[4.1rem] z-10'>
                    <DashItems dashLink="/Dashboard" dashSrc="/home.svg" dashText="Home"/>
                    <DashItems dashLink="/Dashboard/Insights" dashSrc="/analytics.png" dashText="Market Insights" />
                    <DashItems dashLink="/Dashboard/Lists" dashSrc="/search.png" dashText="Products Vault" />
                    <DashItems dashLink="/Dashboard/Account" dashSrc="/settings.png" dashText="Account Settings" />
                    <DashItems dashLink="/Dashboard/billing" dashSrc="/settings.png" dashText="Billing"/>
        </div>
         )



}
