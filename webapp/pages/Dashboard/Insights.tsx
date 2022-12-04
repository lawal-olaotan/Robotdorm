
import React, {useState,useEffect,useContext} from 'react'; 
import { DashLayout } from '@components/dashboard/DashLayout';
import { DashHead } from '@components/dashboard/DashHead';
import { DashTitle } from '@components/dashboard/DashTitle';
import {useSession,getSession} from 'next-auth/react'
import useSWR from 'swr'; 


export default function Insights(){
    const fetcher = (url) => fetch(url).then((res)=> res.json() ); 
    const {data:session,status} = useSession();
     const [myname,SetName] = useState<string>(); 
     const [pageNumber,SetPageNumber] = useState(0); 
     const [itemCount, setItemCount] = useState(0)

     useEffect(() => {
        getSession()
        .then((session)=>{
            SetName(session.user.id)
        })
    },[session]);

    const url = `/api/getSummary?query=${myname}&page=${pageNumber}`;
    const { data, error } = useSWR(url, fetcher);  
    if(data === undefined){
        return <span>loading</span>
    }else if(data.count !== undefined){setItemCount(data.count)}



    const nextBtnHandler = ()=>{
        SetPageNumber(pageNumber + 1)  
    }


    return (
    <>
      <DashHead PageName="Market Insights"/> 
      <div>
          <DashTitle DashTitle="Search Insights"/>

          <div className="flex flex-wrap mt-8">
            {
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
                ))
            }
            
          </div>

          <div className="mt-32 flex ">
              <button onClick={()=> SetPageNumber(pageNumber - 1)} className={`mr-4 px-8 py-2  text-white rounded-md ${pageNumber === 0 ? 'bg-disabledprimary' : 'bg-primary'}`} disabled={pageNumber === 0 ? true : false} >Prev</button>
              <button disabled={((pageNumber*6) > itemCount) ? true  : false} onClick={nextBtnHandler} className={`mr-4 px-8 py-2 bg-primary text-white rounded-md ${((pageNumber*6) > itemCount) ? 'bg-disabledprimary'  : 'bg-primary'}`}>Next</button>
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
