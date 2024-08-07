import { NextPage } from 'next';
import {useContext} from 'react'
import { PageContext } from 'context/PageProvider';
interface Props{
    itemCount:number
}

export const DashPagination: NextPage<Props> = (Props) => {
    const {itemCount} = Props
    const {pageNumber,SetPageNumber} = useContext(PageContext); 

    const nextBtnHandler = ()=>{
        SetPageNumber(pageNumber + 1)  
    }
    
    return (
        <>
            <div className="absolute bottom-[2pc] lg:flex sm:hidden">
              <button onClick={()=> SetPageNumber(pageNumber - 1)} className={`mr-4 px-8 py-2  text-white rounded-md ${pageNumber === 0 ? 'bg-disabledprimary' : 'bg-primary'}`} disabled={pageNumber === 0 ? true : false} >Prev</button>
              <button disabled={((pageNumber*6) > itemCount || itemCount < 6) ? true  : false} onClick={nextBtnHandler} className={`mr-4 px-8 py-2  text-white rounded-md ${((pageNumber*6) > itemCount || itemCount < 6) ? 'bg-disabledprimary'  : 'bg-primary'}`}>Next</button>
          </div>
        </>
    )
    
}