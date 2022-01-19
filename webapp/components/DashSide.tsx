import { DashItems } from '@components/DashItems'; 


export const DashSide = () => {

    return (

        <div className='h-screen w-[5.5%] hover:w-1/5 hover:transition-[width] hover:ease-out duration-300 bg-secondary relative flex flex-col overflow-hidden text-white'>
                    <DashItems dashLink="/Dashboard" dashSrc="/home.svg" dashText="Home" />
                    <DashItems dashLink="/Dashboard" dashSrc="/analytics.png" dashText="Market Insights" />
                    <DashItems dashLink="/Dashboard" dashSrc="/search.png" dashText="Products Vault" />
                    <DashItems dashLink="/Dashboard" dashSrc="/status.png" dashText="Sourcing Status" />
                    <DashItems dashLink="/Dashboard" dashSrc="/settings.png" dashText="Account Settings" />
        </div>
         )



}


