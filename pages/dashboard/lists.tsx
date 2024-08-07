import {getCoreRowModel, useReactTable, flexRender,createColumnHelper} from '@tanstack/react-table';
import React, {useContext } from 'react'; 
import useSWR from 'swr'; 
import {ToastContainer} from 'react-toastify';
import Image from 'next/image';



import { DashLayout } from '@components/dashboard/DashLayout';
import { DashHead } from '@components/dashboard/DashHead';
import { DashTitle } from '@components/dashboard/DashTitle';
import { EmptySection } from '@components/dashboard/EmptySection';
import {IndeterminateCheckbox} from '@components/dashboard/IndeterminateCheckbox';
import { VaultIcons } from '@components/dashboard/VaultIcons'
import { ProductDetails } from 'interface/userSes';
import { VaultContext} from 'context/VaultProvider';
import { DashQuote } from '@components/dashboard/DashQuote';
import { Loader } from '@components/dashboard/Loader';
import { UseAuth } from 'hooks/auth';

export default function Lists(){
    const {setListData,setCheckedRow,rowSelection, nameInputRef,selectedProduct} = useContext(VaultContext); 
    const id = UseAuth()
    const fetcher = (url) => fetch(url).then((res)=> res.json() ); 
     const columnHelper = createColumnHelper<ProductDetails>();
     const columns = [
         {
                header: () => <span>Product</span>,
                cell: ({ row }) =>  (
                    <a href={row.original.link} target="_blank" rel="noreferrer" className='flex items-center'>
                        <Image height={50} width={50} alt={row.original.title} className='lg:mr-3 sm:m-0' src={row.original.img}/>
                        <div className='sm:hidden lg:flex flex-col'> <span>{row.original.title}</span> <span>{row.original.keyWord}</span></div>
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
                <div className='lg:px-1 sm:p-4'>
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
    
    const url = `/api/getSummary?query=${id}&collection=lists`;
    const { data, error } = useSWR(url, fetcher);  
    if(data !== undefined){
        setListData(data);
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

    if(!data){
        return <Loader/>
    } 

    return (
    <div className='lg:ml-20 sm:mx-4 lg:mt-10 sm:mt-5'>
        <div>
            <DashHead PageName="Vault"/> 
            <div className='relative'>
                <DashTitle DashTitle="Products Vault"/>
                <div className="flex flex-col flex-wrap mt-8 relative 2xl:w-full xl:w-[95%]">
                <div className={`${Object.keys(rowSelection).length === 0 ? 'hidden':'flex'} items-center 2xl:w-[27%]`}>
                        <VaultIcons imgStyle='mr-4 flex items-center' imgsrc='/source.svg' imgAlt='source'/>
                        <VaultIcons imgStyle='mr-4 flex items-center'imgsrc='/delete.svg' imgAlt='delete'/>
                        <VaultIcons imgStyle='flex items-center' imgsrc='/close.svg' imgAlt='close'/>
                </div>
                    <div className='mt-12 w-full 2xl:max-h-[700px] xl:max-h-[520px] overflow-y-scroll'>
                                { data.length !== 0 ? 
                                <table  ref={nameInputRef}>
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
                </div>
            </div>   
        </div>
        { selectedProduct !== undefined ? <DashQuote postedBy={id}/> : <div></div>}
        <ToastContainer/>
    </div>
    
)
}



Lists.getLayout = function getLayout(page:React.ReactElement){
    return(
        <DashLayout>
            {page}
        </DashLayout>
    )
}