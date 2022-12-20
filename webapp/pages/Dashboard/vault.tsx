import React, {useState,useEffect, useContext} from 'react'; 
import {useSession, getSession} from 'next-auth/react'
import useSWR from 'swr'; 
import {Tab, Tabs, TabList, TabPanel } from 'react-tabs'; 
import {getCoreRowModel, useReactTable} from '@tanstack/react-table';

import { PageContext } from 'lib/PageProvider';
import { DashLayout } from '@components/dashboard/DashLayout';
import { DashHead } from '@components/dashboard/DashHead';
import { DashTitle } from '@components/dashboard/DashTitle';
import { EmptySection } from '@components/dashboard/EmptySection';
import { DashPagination } from '@components/dashboard/DashPagination';
import { columns } from '@components/dashboard/TableUtils'


export default function Lists(){
    const fetcher = (url) => fetch(url).then((res)=> res.json() ); 
     const {data:session,status} = useSession();
     const [postById,SetpostId] = useState<string>(); 
     const [itemCount, setItemCount] = useState(0);
     const [rowSelection, setCheckedRow] = useState({});
     const {pageNumber} = useContext(PageContext); 

     useEffect(() => {
        getSession()
        .then((session)=>{
            SetpostId(session.user.id)
        })
    },[session]);

    const url = `/api/getSummary?query=${postById}&page=${pageNumber}&collection=lists`;
    const { data, error } = useSWR(url, fetcher);  
    if(data === undefined){
        return <span>loading</span>
    }

    const table = useReactTable({
        data,
        columns,
        state: {
            rowSelection,
        },
        onRowSelectionChange: setCheckedRow,
        getCoreRowModel: getCoreRowModel(),
        debugTable: true,
    })


    return (
    <>
      <DashHead PageName="Vault"/> 
      <div>
          <DashTitle DashTitle="Products Vault"/>

          <div className="flex flex-wrap mt-8">
            <Tabs className="w-full">
                <TabList className="flex">
                    <Tab className="pb-4 mr-4 ">Products</Tab>
                    <Tab className="pb-4 mr-4 ">Quotes</Tab>
                    <Tab className="pb-4 mr-4 ">Orders</Tab>
                </TabList>
                {/* product section */}
                <TabPanel>
                    <div>
                        { data.data.length !== 0 ? 
                        <table>
                            <thead>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map(header=>{
                                            return (
                                                <th key={header.id} colSpan={header.colSpan}>

                                                </th>
                                            )
                                        })}
                                    </tr>
                                ))}
                            </thead>
                        </table>

                         :
                            <EmptySection title="Add your Desired Products" text="Take your product research to the next level by saving products you're interested in"/>
                        }
                    </div>
                </TabPanel>
                {/* sourced section */}
                <TabPanel></TabPanel>
                {/* status section */}
                <TabPanel></TabPanel>
            </Tabs>
            
          </div>

          <DashPagination itemCount={itemCount}/> 
      </div>         
    </>)
}

Lists.getLayout = function getLayout(page:React.ReactElement){
    return(
        <DashLayout>
            {page}
        </DashLayout>
    )
}