import Image from 'next/image'
import { useContext, useRef, useState} from 'react'
import { VaultContext} from 'lib/VaultProvider';
import { ProductDetails,quoteDetails} from 'interface/userSes';
import {getCoreRowModel, useReactTable, flexRender,createColumnHelper} from '@tanstack/react-table';
import { NextPage } from 'next';
import {useSession} from 'next-auth/react'
import { usePaystackPayment } from 'react-paystack';
import {toast} from 'react-toastify'

interface quoteRequesterId {
    postedBy: string;
}

export const DashQuote:NextPage<quoteRequesterId> = (quoteRequesterId)=> {
    const {postedBy} = quoteRequesterId
    const {data:session,status} = useSession();
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
    const config = {
        Reference: session.user.id,
        email:session.user.email,
        amount:107500,
        publicKey:process.env.NEXT_PUBLIC_PAYSTACK
    }

    const initializePayment = usePaystackPayment(config);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        debugTable: true,
    })

    const onSuccess = async () => {
        await fetchData(quoteData)
        
    }

    const successMsg = () => {
        return (<div>
        <h4 className='font-semibold mb-2 text-primary'>Quote Request Confirmed</h4>
        <p className='text-xs'>Thanks for your order, our quote specialist will reach out on the progress of sourcing your items</p>
        </div>)
    }

    const onClose = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
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
        initializePayment(onSuccess, onClose)
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
                    position: toast.POSITION.TOP_RIGHT,
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
        <div className={`${quoteStatus ? 'flex' : 'hidden'} justify-center h-full w-full z-30 bg-black absolute top-0 right-0 opacity-100`}>

            <div className='absolute top-[2pc] right-[4pc]' onClick={()=> {setQuoteStatus(false)}}>
                <Image  height='30px' width='30px' src='/close-white.svg' alt='close-quote' />
            </div>

            <form onSubmit={handleQuote} className='mt-16 flex flex-col max-h-[520px] w-1/2 bg-white opacity-100 z-50 p-4'>
                    <div className='text-center mb-3'>
                        <h3 className='font-bold text-xl'>Save time and get the best pricing quote within 24 hours</h3>
                        <p className='text-red-800'>Note: we only source minimum of 25 units upwards</p>
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

                <div className='mt-4'>
                    <label className='mr-2 whatsapp' htmlFor="whatsapp-no"> Whatsapp Number</label>
                    <input ref={wsRef} className='border border-solid border-black p-1' type='tel' id='whatsapp-no'name='whatsapp-no' required/>
                </div>
              <div className='self-end w-1/3'>
                <div className='flex items-center justify-between text-sm'>
                    <span>Preparation fee</span>
                    <span>{Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(1000)}</span>
                </div>
                <div className='flex items-center justify-between mt-2 text-sm'>
                    <span>VAT(7.5%)</span>
                    <span>{Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(75)}</span>
                </div>
              <input className='mt-4 w-full py-2.5 px-5 bg-primary text-white' type='submit' value={`Request Quote  (${Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(1075)})`}/>
              </div>
                
            </form>
      
      </div>
    )
}