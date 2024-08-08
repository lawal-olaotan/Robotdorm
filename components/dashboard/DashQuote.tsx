import Image from 'next/image'
import { useContext, useRef, useState} from 'react'
import { VaultContext} from 'context/VaultProvider';
import { ProductDetails,quoteDetails} from 'interface/userSes';
import {getCoreRowModel, useReactTable, flexRender,createColumnHelper} from '@tanstack/react-table';
import { NextPage } from 'next';
import {toast} from 'react-toastify'

interface quoteRequesterId {
    postedBy: string;
}

export const DashQuote:NextPage<quoteRequesterId> = (quoteRequesterId)=> {
    const {postedBy} = quoteRequesterId
    const [quoteData, setQuoteData] = useState<quoteDetails>()
    const {setQuoteStatus,quoteStatus,selectedProduct,setCheckedRow} = useContext(VaultContext);
    const wsRef = useRef<HTMLInputElement>(null);
    const quoteTable = useRef<HTMLTableElement>(null);
    const data = selectedProduct
    const columnHelper = createColumnHelper<ProductDetails>(); 
    const columns = [
        {
               header: () => <span>Product</span>,
               cell: ({ row }) =>  (
                   <a href={row.original.link} target="_blank" rel="noreferrer" className='flex items-center'>
                       <img alt={row.original.title} className='w-[40px] h-[40px] mr-3' src={row.original.img}/>
                       <div className='lg:flex sm:hidden flex-col text-sm'>{row.original.title}</div>
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
            min='50'
            max='20000'
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

    const successMsg = () => {
        return (<div>
        <h4 className='font-semibold mb-2 text-primary'>Quote Request Confirmed</h4>
        <p className='text-xs'>Thanks for your order, our quote specialist will reach out on the progress of sourcing your items</p>
        </div>)
    }


    const handleQuote = async(event: React.SyntheticEvent) =>{
        event.preventDefault();
        const   quoteRequester =  wsRef.current.value; 
        const quoteContent = quoteTable.current;
        const quoteProduct = retrieveQuote(quoteContent);
        setQuoteData({
            quote: quoteProduct,
            quoteContact:quoteRequester,
            postedBy:postedBy
        })
        setQuoteStatus(false)
        await fetchData(quoteData)
    }

    const fetchData = async (data:quoteDetails) => {
        fetch('/api/quote', {
           method:'POST', 
           body:JSON.stringify(data),
           headers: {
               'Content-Type': 'application/json',
           }, 
       })
       .then((response)=> response.json())
       .then((res)=>{
            console.log(res)
            if(res.message === 'success')
            {   
                toast.success(successMsg, {
                    position:"top-right",
                  });
                setCheckedRow({}) 
            }
       }) 
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
        <div className={`${quoteStatus ? 'flex absolute' : 'hidden'} justify-center h-screen w-full z-30 bg-black  top-0 right-0 opacity-100`}>

            <div className='absolute top-[2pc] right-[4pc]' onClick={()=> {setQuoteStatus(false)}}>
                <Image  height={30} width={30} src='/close-white.svg' alt='close-quote' />
            </div>

            <form onSubmit={handleQuote} className='mt-16 flex flex-col max-h-[520px] lg:w-1/2 sm:w-[95%] bg-white opacity-100 z-50 lg:p-4 sm:p-2'>
                    <div className='text-center mb-3'>
                        <h3 className='font-bold lg:text-xl'>Save time and get the best pricing quote within 24 hours</h3>
                        <p className='text-red-800'>Note: we only source minimum of 50 units upwards</p>
                    </div>
              
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

                <div className='my-8'>
                    <label className='mr-2 whatsapp' htmlFor="whatsapp-no"> Whatsapp Number</label>
                    <input ref={wsRef} className='border border-solid border-black p-1' type='tel' id='whatsapp-no'name='whatsapp-no' required/>
                </div>

                <button className='w-fit py-2 px-6 bg-primary text-white mb-2' type='submit'>{`Request Quote`}</button>                     
                
            </form>
      
      </div>
    )
}