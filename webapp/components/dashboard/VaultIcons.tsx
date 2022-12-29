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
    const {listData,rowSelection,nameInputRef,setQuoteStatus, setSelectedProduct}= useContext(VaultContext);

    const handleVaultIcons = (e)=> {
        const currentIcon = e.target.getAttribute("alt")
        const ProductTable = nameInputRef.current;
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
                // get selected products
                // remove from list Db
                break;

            case 'close':
                // remove checked boxes 

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