import {NextPage} from 'next';
import {useSession} from 'next-auth/react'
import Image from 'next/image'
import {useContext} from 'react'
import { VaultContext} from 'context/VaultProvider';
import { ProductDetails } from 'interface/userSes';
import {useSWRConfig} from 'swr'; 
import {toast} from 'react-toastify'

interface VaultProps {
    imgsrc : string,
     imgAlt:string,
     imgStyle:string, 
}

export const VaultIcons: NextPage<VaultProps>=(VaultProps) => {
    const {imgsrc,imgAlt,imgStyle} = VaultProps
    const {listData,rowSelection,setQuoteStatus, setSelectedProduct,setCheckedRow}= useContext(VaultContext);
    const {data:session,status} = useSession();
    const {mutate}  = useSWRConfig();

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
                 if(status == 'authenticated'){
                    mutate(`/api/getSummary?query=${session.user.id}&collection=lists`)
                 }
                 toast.success("Product Removed!", {
                    position: toast.POSITION.TOP_RIGHT
                  });
                 
             }
        }) 
    }

    const handleVaultIcons = (e)=> {
        const currentIcon = e.target.getAttribute("data-alt")
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
        <div className='flex flex-col items-center relative' >
            <div onClick={handleVaultIcons} className={`${imgStyle} cursor-pointer`}>
                {imgAlt === 'source' ? <div data-alt={imgAlt} className="w-fit px-4 py-2 rounded-lg bg-primary text-white">Request Quote</div> : <Image height={20} width={20} src={imgsrc} alt={imgAlt} />}
            </div>
        </div>
        
    )
}