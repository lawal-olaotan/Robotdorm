import { DashItems } from '@components/dashboard/DashItems';



export const DashSide = () => {

    return (

        <div className='h-screen w-[5.5%] 2xl:w-[4%] 2xl:hover:w-[15%] hover:w-1/5 hover:transition-[width] hover:ease-out duration-300 bg-secondary flex flex-col overflow-hidden text-white fixed top-0 left-0 pt-[4.1rem]'>
                    <DashItems dashLink="/Dashboard" dashSrc="/home.svg" dashText="Home"/>
                    <DashItems dashLink="/Dashboard/Insights" dashSrc="/analytics.png" dashText="Market Insights" />
                    <DashItems dashLink="/Dashboard/vault" dashSrc="/search.png" dashText="Products Vault" />
                    <DashItems dashLink="/" dashSrc="/settings.png" dashText="Account Settings" />
        </div>
         )



}
