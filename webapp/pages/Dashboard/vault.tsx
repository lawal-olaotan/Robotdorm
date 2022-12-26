
import {useSession, getSession} from 'next-auth/react'
import useSWR from 'swr'; 
import {Tab, Tabs, TabList, TabPanel } from 'react-tabs'; 
import {getCoreRowModel, useReactTable, flexRender} from '@tanstack/react-table';

import { PageContext } from 'lib/PageProvider';
import { DashLayout } from '@components/dashboard/DashLayout';
import { DashHead } from '@components/dashboard/DashHead';
import { DashTitle } from '@components/dashboard/DashTitle';
import { EmptySection } from '@components/dashboard/EmptySection';
import {IndeterminateCheckbox} from '@components/dashboard/IndeterminateCheckbox';
import { VaultIcons } from '@components/dashboard/VaultIcons'


import { createColumnHelper} from '@tanstack/react-table';
import { ProductDetails } from 'interface/userSes';
import React, {useEffect, useContext, useState} from 'react'; 

export default function Lists(){
    const fetcher = (url) => fetch(url).then((res)=> res.json() ); 
     const {data:session,status} = useSession();
     const [postById,SetpostId] = useState<string>(); 
     const [rowSelection, setCheckedRow] = useState({});
     const {pageNumber} = useContext(PageContext); 

     const columnHelper = createColumnHelper<ProductDetails>();
     const columns = [
         {
                header: () => <span>Product</span>,
                cell: ({ row }) =>  (
                    <a href={row.original.link} target="_blank" rel="noreferrer" className='flex items-center'>
                        <img className='w-[50px] h-[50px] mr-3' src={row.original.img}/>
                        <div className='flex flex-col'> <span>{row.original.title}</span> <span>{row.original.keyWord}</span></div>
                    </a>
     ),
                footer: props => props.column.id,
                id: 'link',
          },
          columnHelper.accessor('price', {
            cell: info => info.getValue(),
            footer: info => info.column.id,
          }),
          columnHelper.accessor('sales', {
            header: () => <span>Est. Sales</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
            id: 'sales',
          }),
          columnHelper.accessor('revenue', {
            header: () => <span>Est. Revenue</span>,
            cell: info => info.getValue(),
            footer: props => props.column.id,
            id: 'revenue',
          }),
          columnHelper.display( {
            id:'select',
            header:({ table }) => (
                <IndeterminateCheckbox {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
                    }}
                />
            ),
            cell:({ row }) => (
                <div className='px-1'>
                    <IndeterminateCheckbox
                    {...{
                        checked: row.getIsSelected(),
                        indeterminate: row.getIsSomeSelected(),
                        onChange: row.getToggleSelectedHandler(),
                    }}
                    />
                </div>
            ), 
    
            }),

     ]
   

     useEffect(() => {
        getSession()
        .then((session)=>{
            SetpostId(session.user.id)
        })
       
    },[]);

    const url = `/api/getSummary?query=${postById}&page=${pageNumber}&collection=lists`;
    const { data, error } = useSWR(url, fetcher);  
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

    if(data === undefined){
        return <span>loading</span>
    } 

    return (
    <>
      <DashHead PageName="Vault"/> 
      <div>
          <DashTitle DashTitle="Products Vault"/>

          <div className="flex flex-wrap mt-8 relative w-4/5 xl:w-[95%]">
            <Tabs className="w-full">
                <TabList className="flex">
                    <Tab className="pb-4 mr-4 ">Products</Tab>
                    <Tab className="pb-4 mr-4 ">Quotes</Tab>
                    <Tab className="pb-4 mr-4 ">Orders</Tab>
                </TabList>
           
                <TabPanel>
                    <div className='mt-8  h-[640px] xl:h-[520px] overflow-y-scroll'>
                        { data.length !== 0 ? 
                    
                        <table className='w-full'>
                            <thead>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map(header=>{
                                            return (
                                                <th key={header.id} colSpan={header.colSpan}>
                                                    {header.isPlaceholder ? null : (
                                                        <>
                                                          {flexRender(header.column.columnDef.header,header.getContext())}
                                                        </>
                                                    )}
                                                </th>
                                            )
                                        })}
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                            {table.getRowModel().rows.map(row => {
                                    return (
                                    <tr key={row.id}>
                                        {row.getVisibleCells().map(cell => {
                                        return (
                                            <td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                            </td>
                                        )
                                        })}
                                    </tr>
                                    )
                                })}
                            </tbody>
                        </table> :
                            <EmptySection title="Add your Desired Products" text="Take your product research to the next level by saving products you're interested in"/>
                        }
                    </div>
                </TabPanel>
                {/* sourced section */}
                <TabPanel></TabPanel>
                {/* status section */}
                <TabPanel></TabPanel>
            </Tabs>

            <div className={`${Object.keys(rowSelection).length === 0 ? 'hidden':'flex'} absolute right-4`}>
                <VaultIcons imgStyle='mr-4 flex items-center' imgsrc='/source.svg' imgAlt='source'/>
                <VaultIcons imgStyle='mr-4 flex items-center'imgsrc='/delete.svg' imgAlt='delete'/>
                <VaultIcons imgStyle='flex items-center' imgsrc='/close.svg' imgAlt='close'/>
          </div>
            
          </div>
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