import {Column, ColumnDef,Table, getCoreRowModel, useReactTable} from '@tanstack/react-table';
import { ProductDetails } from 'interface/userSes';
import React, {useState,useEffect, useContext,useMemo, HTMLProps} from 'react'; 





export const columns = useMemo<ColumnDef<ProductDetails>[]>(
    ()=>[
        {
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

        }, 
        {
        header: 'Product Details',
        footer: props => props.column.id,
        columns: [
            {
            header: () => <span>Product</span>,
            cell: ({ row }) =>  {
                <a href={row.original.link}>
                    <img src={row.original.img}/>
                    <div>{row.original.title} {row.original.keyWord}</div>
                </a>
            },
            footer: props => props.column.id,
            id: 'link',
            },
            {
                accessorKey: 'price',
                cell: info => info.getValue(),
                footer: props => props.column.id,
                id: 'price',
            },
            {
                header: () => <span>Est. Sales</span>,
                accessorKey: 'sales',
                cell: info => info.getValue(),
                footer: props => props.column.id,
                id: 'sales',
            },
            {
                header: () => <span>Est. Revenue</span>,
                accessorKey: 'revenue',
                cell: info => info.getValue(),
                footer: props => props.column.id,
                id: 'revenue',
            }

        ]
        }
    ],[]
);

function IndeterminateCheckbox({
    indeterminate,
    className = '',
    ...rest
  }: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
    const ref = React.useRef<HTMLInputElement>(null!)
  
    React.useEffect(() => {
      if (typeof indeterminate === 'boolean') {
        ref.current.indeterminate = !rest.checked && indeterminate
      }
    }, [ref, indeterminate])
  
    return (
      <input
        type="checkbox"
        ref={ref}
        className={className + ' cursor-pointer'}
        {...rest}
      />
    )
  }