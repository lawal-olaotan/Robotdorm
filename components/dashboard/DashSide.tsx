import { DashItems } from '@components/dashboard/DashItems';



export const DashSide = () => {

    return (

        <div className='h-screen lg:w-[70px] 2xl:hover:w-[15%] hover:w-1/5 hover:transition-[width] hover:ease-out duration-300 bg-secondary flex flex-col overflow-hidden text-white fixed top-0 left-0 pt-[4.1rem] z-10'>
                    <DashItems dashLink="/dashboard" dashSrc="/home.svg" dashText="Home"/>
                    <DashItems dashLink="/dashboard/insights" dashSrc="/analytics.png" dashText="Market Insights" />
                    <DashItems dashLink="/dashboard/lists" dashSrc="/search.png" dashText="Products Vault" />
                    <DashItems dashLink="/dashboard/settings" dashSrc="/settings.png" dashText="Settings"/>
        </div>
         )



}
