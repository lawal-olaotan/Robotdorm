
import React, {useState,useEffect,useContext} from 'react'; 
import { DashLayout } from '@components/dashboard/DashLayout';
import { DashHead } from '@components/dashboard/DashHead';
import { DashTitle } from '@components/dashboard/DashTitle';
import {useSession,getSession} from 'next-auth/react'
import useSWR from 'swr'; 
import { MyContext } from 'lib/UserContext';



  const fetcher = (myvalue:any) => {fetch(myvalue).then((res)=> res.json() )}
 



export default function Insights(){

    const {data:session,status} = useSession();
    const [myname,SetName] = useState<string>(); 


    useEffect(() => {
        getSession()
        .then((session)=>{
            console.log(session)
        })
    },[session]);


    

//    const url = `/api/getSummary?query=${myname}`; 

//     const {data:result,error} = useSWR(url,fetcher); 

    // console.log(result); 
   

    return (
    <>
      <DashHead PageName="Market Insights"/> 
      <div>
          <DashTitle DashTitle="Search Insights"/>

          <div className="flex flex-wrap mt-8">
            <div className="flex flex-col p-8 bg-white mr-8 rounded-lg mb-8 shadow-6xl">
                <p className="mb-6 font-semibold"> <span>Keyword:</span> <span className="text-secondary">mens sneakers</span> </p>
                <div className="flex">
                    <p className="flex flex-col text-center mr-6">
                        <span className="text-xs mb-2 text-gray-600">Est. Total Revenue</span>
                        <span className="text-secondary font-semibold">₦30M+</span>
                    </p>
                    <p className="flex flex-col text-center mr-6">
                        <span className="text-xs mb-2 text-gray-600">Est. Avg Revenue</span>
                        <span className="text-secondary font-semibold">₦2M+</span>
                    </p>
                    <p className="flex flex-col text-center mr-6">
                        <span className="text-xs mb-2 text-gray-600">Est. Total Units Sold</span>
                        <span className="text-secondary font-semibold">367K+</span>
                    </p>
                    <p className="flex flex-col text-center mr-6">
                        <span className="text-xs mb-2 text-gray-600">Average Price</span>
                        <span className="text-secondary font-semibold">3k</span>
                    </p>
                </div>
            </div>

            <div className="flex flex-col p-8 bg-white mr-8 rounded-lg mb-8">
                <p className="mb-6 font-semibold"> <span>Keyword:</span> <span className="text-secondary">mens sneakers</span> </p>
                <div className="flex">
                    <p className="flex flex-col text-center mr-6">
                        <span className="text-xs mb-2 text-gray-600">Est. Total Revenue</span>
                        <span className="text-secondary font-semibold">₦30M+</span>
                    </p>
                    <p className="flex flex-col text-center mr-6">
                        <span className="text-xs mb-2 text-gray-600">Est. Avg Revenue</span>
                        <span className="text-secondary font-semibold">₦2M+</span>
                    </p>
                    <p className="flex flex-col text-center mr-6">
                        <span className="text-xs mb-2 text-gray-600">Est. Total Units Sold</span>
                        <span className="text-secondary font-semibold">367K+</span>
                    </p>
                    <p className="flex flex-col text-center mr-6">
                        <span className="text-xs mb-2 text-gray-600">Average Price</span>
                        <span className="text-secondary font-semibold">3k</span>
                    </p>
                </div>
            </div>

            <div className="flex flex-col p-8 bg-white mr-8 rounded-lg mb-8">
                <p className="mb-6 font-semibold"> <span>Keyword:</span> <span className="text-secondary">mens sneakers</span> </p>
                <div className="flex">
                    <p className="flex flex-col text-center mr-6">
                        <span className="text-xs mb-2 text-gray-600">Est. Total Revenue</span>
                        <span className="text-secondary font-semibold">₦30M+</span>
                    </p>
                    <p className="flex flex-col text-center mr-6">
                        <span className="text-xs mb-2 text-gray-600">Est. Avg Revenue</span>
                        <span className="text-secondary font-semibold">₦2M+</span>
                    </p>
                    <p className="flex flex-col text-center mr-6">
                        <span className="text-xs mb-2 text-gray-600">Est. Total Units Sold</span>
                        <span className="text-secondary font-semibold">367K+</span>
                    </p>
                    <p className="flex flex-col text-center mr-6">
                        <span className="text-xs mb-2 text-gray-600">Average Price</span>
                        <span className="text-secondary font-semibold">3k</span>
                    </p>
                </div>
            </div>

            <div className="flex flex-col p-8 bg-white mr-8 rounded-lg mb-8">
                <p className="mb-6 font-semibold"> <span>Keyword:</span> <span className="text-secondary">mens sneakers</span> </p>
                <div className="flex">
                    <p className="flex flex-col text-center mr-6">
                        <span className="text-xs mb-2 text-gray-600">Est. Total Revenue</span>
                        <span className="text-secondary font-semibold">₦30M+</span>
                    </p>
                    <p className="flex flex-col text-center mr-6">
                        <span className="text-xs mb-2 text-gray-600">Est. Avg Revenue</span>
                        <span className="text-secondary font-semibold">₦2M+</span>
                    </p>
                    <p className="flex flex-col text-center mr-6">
                        <span className="text-xs mb-2 text-gray-600">Est. Total Units Sold</span>
                        <span className="text-secondary font-semibold">367K+</span>
                    </p>
                    <p className="flex flex-col text-center mr-6">
                        <span className="text-xs mb-2 text-gray-600">Average Price</span>
                        <span className="text-secondary font-semibold">3k</span>
                    </p>
                </div>
            </div>

            <div className="flex flex-col p-8 bg-white mr-8 rounded-lg mb-8">
                <p className="mb-6 font-semibold"> <span>Keyword:</span> <span className="text-secondary">mens sneakers</span> </p>
                <div className="flex">
                    <p className="flex flex-col text-center mr-6">
                        <span className="text-xs mb-2 text-gray-600">Est. Total Revenue</span>
                        <span className="text-secondary font-semibold">₦30M+</span>
                    </p>
                    <p className="flex flex-col text-center mr-6">
                        <span className="text-xs mb-2 text-gray-600">Est. Avg Revenue</span>
                        <span className="text-secondary font-semibold">₦2M+</span>
                    </p>
                    <p className="flex flex-col text-center mr-6">
                        <span className="text-xs mb-2 text-gray-600">Est. Total Units Sold</span>
                        <span className="text-secondary font-semibold">367K+</span>
                    </p>
                    <p className="flex flex-col text-center mr-6">
                        <span className="text-xs mb-2 text-gray-600">Average Price</span>
                        <span className="text-secondary font-semibold">3k</span>
                    </p>
                </div>
            </div>
            <div className="flex flex-col p-8 bg-white mr-8 rounded-lg mb-8">
                <p className="mb-6 font-semibold"> <span>Keyword:</span> <span className="text-secondary">mens sneakers</span> </p>
                <div className="flex">
                    <p className="flex flex-col text-center mr-6">
                        <span className="text-xs mb-2 text-gray-600">Est. Total Revenue</span>
                        <span className="text-secondary font-semibold">₦30M+</span>
                    </p>
                    <p className="flex flex-col text-center mr-6">
                        <span className="text-xs mb-2 text-gray-600">Est. Avg Revenue</span>
                        <span className="text-secondary font-semibold">₦2M+</span>
                    </p>
                    <p className="flex flex-col text-center mr-6">
                        <span className="text-xs mb-2 text-gray-600">Est. Total Units Sold</span>
                        <span className="text-secondary font-semibold">367K+</span>
                    </p>
                    <p className="flex flex-col text-center mr-6">
                        <span className="text-xs mb-2 text-gray-600">Average Price</span>
                        <span className="text-secondary font-semibold">3k</span>
                    </p>
                </div>
            </div>

          </div>

          <div className="mt-8 flex ">
              <button className="mr-4 px-8 py-2 bg-primary text-white rounded-md">Prev</button>
              <button className="mr-4 px-8 py-2 bg-primary text-white rounded-md">Next</button>
          </div>

      </div>         
    </>)
}
Insights.getLayout = function getLayout(page:React.ReactElement){
    return(
        <DashLayout>
            {page}
        </DashLayout>
    )
}
