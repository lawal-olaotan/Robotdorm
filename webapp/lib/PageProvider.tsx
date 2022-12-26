import React, {FC,useEffect,useState} from 'react';
interface PageNumber {
    pageNumber: number;
    SetPageNumber: (value: React.SetStateAction<number>) => void,

}
const PageContext = React.createContext<Partial<PageNumber>>({}); 

const PageProvider:FC = ({children})=> {

const [pageNumber,SetPageNumber] = useState(0);
    
    return(
    <PageContext.Provider value={{
        pageNumber,
        SetPageNumber
        }}>
        {children}
    </PageContext.Provider>); 
}

export {PageProvider,PageContext}
