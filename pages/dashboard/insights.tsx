
import React, {useState,useEffect, useContext} from 'react'; 
import { DashLayout } from '@components/dashboard/DashLayout';
import { DashHead } from '@components/dashboard/DashHead';
import { DashTitle } from '@components/dashboard/DashTitle';
import { Summary } from '@components/dashboard/Summary';
import { EmptySection } from '@components/dashboard/EmptySection';
import { DashPagination } from '@components/dashboard/DashPagination';
import { getServerSession } from "next-auth";
import { PageContext } from 'context/PageProvider';
import useSWR from 'swr'; 
import { Loader } from '@components/dashboard/Loader';
import { GetServerSidePropsContext } from "next";
import {authOptions}  from "../api/auth/[...nextauth]";

export default function Insights({user}){
    const {id} = JSON.parse(user)
    const fetcher = (url) => fetch(url).then((res)=> res.json() ); 
    const {pageNumber} = useContext(PageContext); 



    const url = `/api/getSummary?query=${id}&page=${pageNumber}&collection=summaries`;
    const { data, error } = useSWR(url, fetcher);  
    if(data === undefined){
        return <Loader/>
    }
    return (
        <DashLayout>
            <DashHead PageName="Market Insights"/> 
            <div className='lg:ml-20 sm:ml-5 lg:mt-10 sm:mt-5'>
                <DashTitle DashTitle="Search Insights"/>

                <div className="flex lg:flex-row flex-wrap mt-8 sm:flex-col">
                    { data.data.length !== 0 ?
                        data.data.map((summary:any)=> ( 
                            <Summary keyWord={summary.keyWord} key={summary._id.toString()} EstTotalRevenue={summary.EstTotalRevenue} EstAverageRevenue={summary.EstAverageRevenue} EstTotalUnitsSold={summary.EstTotalUnitsSold} AveragePrice={summary.AveragePrice} /> 
                        )): <EmptySection title="Try your first Search" text="Keep track of your search keywords and metrics to make informed business decisions with up-to-date market insights."/>
                    }
                </div>
                <DashPagination itemCount={data.count}/> 
            </div>         
      </DashLayout>
)}

export async function getServerSideProps(context:GetServerSidePropsContext){


    const session = await getServerSession(context.req,context.res,authOptions);
    if(!session) return{
        redirect:{
            destination:'/login',
            permanent:false
        }
    }

    const { user} = session
    return {
        props: {
          user:JSON.stringify(user)
        },
    };
}
