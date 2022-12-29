import Image from 'next/image'
import { useContext, useRef} from 'react'
import { VaultContext} from 'lib/VaultProvider';
import { ProductDetails,quoteDetails } from 'interface/userSes';
import {getCoreRowModel, useReactTable, flexRender,createColumnHelper} from '@tanstack/react-table';
import { NextPage } from 'next';

interface quoteRequesterId {
    postedBy: string;
}

export const DashQuote:NextPage<quoteRequesterId> = (quoteRequesterId)=> {
    const {postedBy} = quoteRequesterId
    const {setQuoteStatus,quoteStatus,selectedProduct} = useContext(VaultContext);
    const wsRef = useRef<HTMLInputElement>(null);
    const quoteTable = useRef<HTMLTableElement>(null);
    const data = selectedProduct
    const columnHelper = createColumnHelper<ProductDetails>(); 
    const columns = [
        {
               header: () => <span>Product</span>,
               cell: ({ row }) =>  (
                   <a href={row.original.link} target="_blank" rel="noreferrer" className='flex items-center'>
                       <img className='w-[40px] h-[40px] mr-3' src={row.original.img}/>
                       <div className='flex flex-col text-sm'>{row.original.title}</div>
                   </a>
    ),
               footer: props => props.column.id,
               id: 'link',
         },
         columnHelper.display( {
           id:'quantity',
           header:()=> <span>Quantity</span>,
           cell: ({ row }) => (
            <input
            type="number"
            min='25'
            max='200'
            defaultValue=''
            className={row.original.title}
        required/>)}),
         columnHelper.display( {
           id:'color',
           header:()=> <span>Colors</span>,
           cell: ({ row }) => (
            <textarea
            defaultValue=''
            className={row.original.title}
        />)}),
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        debugTable: true,
    })

    const handleQuote = (event: React.SyntheticEvent) =>{
        event.preventDefault();
        const   quoteRequester =  wsRef.current.value; 
        const quoteContent = quoteTable.current;
        const quote = retrieveQuote(quoteContent);
        const data = {
            quote: quote,
            quoteContact:quoteRequester,
            postedBy:postedBy
        }
        fetchData(data)
    
    }

    const fetchData = (data) => {
        fetch('/api/quote', {
           method:'POST', 
           body:JSON.stringify(data),
           headers: {
               'Content-Type': 'application/json',
           }, 
       })
       .then((response)=> response.json())
       .then((res)=> 
    //    chrome.runtime.sendMessage('ocphbhklbogjbkomckglmbcfldamdcbi', {type:'browser',data:data.data._id})
        console.log(res)
       ) 
   }

    const retrieveQuote = (quoteContent:HTMLTableElement) => {
        const quoteKeys = Array.from(quoteContent.querySelectorAll('th')).map(header => header.textContent)
        const quoteItemsElement = quoteContent.querySelectorAll('tbody > tr')
        const quoteItems = Array.from(quoteItemsElement).map(quoteItem => {
            const cellItem = Array.from(quoteItem.querySelectorAll('td'))
            return quoteKeys.reduce((obj,col,idx) => {
                obj[col] = cellItem[idx].textContent || (cellItem[idx].firstElementChild as HTMLInputElement).value
                return obj
            }, {})
        })
        return quoteItems;
    }

    return(
        <div className={`${quoteStatus ? 'flex' : 'hidden'} h-full w-full z-30 bg-black absolute top-0 right-0 opacity-100`}>

            <div className='absolute top-[5pc] right-[4pc]' onClick={()=> {setQuoteStatus(false)}}>
                <Image  height='30px' width='30px' src='/close-white.svg' alt='close-quote' />
            </div>

            <form onSubmit={handleQuote} className='m-auto flex flex-col justify-between max-h-[480px] w-1/2 bg-white opacity-100 z-50 p-4'>

                <div className='max-h-[400px] overflow-y-scroll'>
                <table ref={quoteTable} className='w-full bg-white'>
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
                                <tbody className='quoteTable'>
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
                </table> 
                </div>

                <div className='mt-4'>
                    <label className='mr-2 whatsapp' htmlFor="whatsapp-no"> Whatsapp Number</label>
                    <input ref={wsRef} className='border border-solid border-black p-1' type='tel' id='whatsapp-no'name='whatsapp-no' required/>
                </div>
              
                <input className='mt-4 self-end  w-fit py-2.5 px-5 bg-primary text-white' type='submit' value='Request Quote'/>
            </form>
      
      </div>


    )
}