
import React, {useState,useEffect, useContext} from 'react'; 
import { DashLayout } from '@components/dashboard/DashLayout';
import { DashHead } from '@components/dashboard/DashHead';
import { DashTitle } from '@components/dashboard/DashTitle';
import { DashPagination } from '@components/dashboard/DashPagination';
import {useSession,getSession} from 'next-auth/react'
import { PageContext } from 'lib/PageProvider';
import useSWR from 'swr'; 


export default function Insights(){
    const fetcher = (url) => fetch(url).then((res)=> res.json() ); 
    const {data:session,status} = useSession();
    const [myname,SetName] = useState<string>(); 
    const [itemCount, setItemCount] = useState(0);
    const {pageNumber} = useContext(PageContext); 

     useEffect(() => {
        getSession()
        .then((session)=>{
            if(session){
                SetName(session.user.id)
            }
            
        })
    },[session]);

    const url = `/api/getSummary?query=${myname}&page=${pageNumber}&collection=summaries`;
    const { data, error } = useSWR(url, fetcher);  
    if(data === undefined){
        return <span>loading</span>
    }else if(data.count !== undefined){
        setItemCount(data.data.length)
    }



   

    return (
    <>
      <DashHead PageName="Market Insights"/> 
      <div>
          <DashTitle DashTitle="Search Insights"/>

          <div className="flex flex-wrap mt-8">
            { data.data.length !== 0 ?
                data.data.map((summary:any)=> ( 
                    <div key={summary._id} className="flex flex-col p-8 bg-white mr-8 rounded-lg mb-8 shadow-6xl w-[32%]">
                        <p className="mb-6 font-semibold"> <span>Keyword:</span> <span className="text-secondary">{summary.keyWord}</span> </p>
                        <div className="flex">
                            <p className="flex flex-col text-center mr-6">
                                <span  className="text-xs mb-2 text-gray-600">Est. Total Revenue</span>
                                <span className="text-secondary font-semibold">{summary.EstTotalRevenue}</span>
                            </p>
                            <p className="flex flex-col text-center mr-6">
                                <span className="text-xs mb-2 text-gray-600">Est. Avg Revenue</span>
                                <span className="text-secondary font-semibold">{summary.EstAverageRevenue}</span>
                            </p>
                            <p className="flex flex-col text-center mr-6">
                                <span className="text-xs mb-2 text-gray-600">Est. Total Units Sold</span>
                                <span className="text-secondary font-semibold">{summary.EstTotalUnitsSold}</span>
                            </p>
                            <p className="flex flex-col text-center mr-6">
                                <span className="text-xs mb-2 text-gray-600">Average Price</span>
                                <span className="text-secondary font-semibold">{summary.AveragePrice}</span>
                            </p>
                        </div>
                    </div>
                )): <div> Error page </div>
            }
          </div>

          <DashPagination itemCount={itemCount}/> 

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
