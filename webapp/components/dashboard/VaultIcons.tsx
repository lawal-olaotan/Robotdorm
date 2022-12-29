import {NextPage} from 'next';
import Image from 'next/image'
import { useState, useContext} from 'react'
import { VaultContext} from 'lib/VaultProvider';
import { ProductDetails } from 'interface/userSes';
interface VaultProps {
    imgsrc : string,
     imgAlt:string,
     imgStyle:string, 
}

export const VaultIcons: NextPage<VaultProps>=(VaultProps) => {
    const {imgsrc,imgAlt,imgStyle} = VaultProps
    const [textState, setTextState] = useState<boolean>(false)
    const {listData,rowSelection,setQuoteStatus, setSelectedProduct,setCheckedRow}= useContext(VaultContext);

    const deleteProduct = async(data:ProductDetails[])=> {
        fetch('/api/delete', {
            method:'POST', 
            body:JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }, 
        })
        .then((response)=> response.json())
        .then((res)=>{
             if(res.message)
             {   
                 setCheckedRow({})
             }
        }) 
    }

    const handleVaultIcons = (e)=> {
        const currentIcon = e.target.getAttribute("alt")
        let newData = []; 

        for (const selectedKeys in rowSelection){
            newData.push(listData[selectedKeys])
        }
        
        switch (currentIcon) {
            case 'source':
                if(newData.length !== 0)
                {
                    setSelectedProduct(newData)
                    setQuoteStatus(true);
                }

                break;
            case 'delete':
                deleteProduct(newData);
                break;

            case 'close':
                setCheckedRow({})

            break;
        
            default:
                break;
        }
    }

    return (
        <div className='flex flex-col relative' >
            <div className={`${ textState == false ? 'hidden':''} px-4 py-2 bg-primary text-white absolute m-auto text-xs top-[-2.5pc] left-[-1.5pc] rounded-lg`}>{imgAlt}</div>
            <div onClick={handleVaultIcons} onMouseEnter={()=> {setTextState(true)}} onMouseLeave={()=> {setTextState(false)}} className={imgStyle}>
                <Image height='20px' width='20px' src={imgsrc} alt={imgAlt} />
            </div>
        </div>
        
    )
}