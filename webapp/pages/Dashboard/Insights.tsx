
import React, {useState,useEffect, useContext} from 'react'; 
import { DashLayout } from '@components/dashboard/DashLayout';
import { DashHead } from '@components/dashboard/DashHead';
import { DashTitle } from '@components/dashboard/DashTitle';
import { Summary } from '@components/dashboard/Summary';
import { EmptySection } from '@components/dashboard/EmptySection';
import { DashPagination } from '@components/dashboard/DashPagination';
import {useSession,getSession} from 'next-auth/react'
import { PageContext } from 'lib/PageProvider';
import { summmaryDetails } from 'interface/userSes';
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
                    <Summary key={summary._id} keyWord={summary.keyWord} EstTotalRevenue={summary.EstTotalRevenue} EstAverageRevenue={summary.EstAverageRevenue} EstTotalUnitsSold={summary.EstTotalUnitsSold} AveragePrice={summary.AveragePrice} /> 
                )): <EmptySection title="Try your first Search" text="Keep track of your search keywords and metrics to make informed business decisions with up-to-date market insights."/>
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
