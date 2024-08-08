import React, {FC, useState, useRef, createContext} from 'react';
import { ProductDetails } from 'interface/userSes'; 

 type VaultProps = {
    listData:null| ProductDetails[];
    setListData: React.Dispatch<React.SetStateAction<ProductDetails[]>>;
    nameInputRef: React.MutableRefObject<HTMLTableElement>;
    setCheckedRow:(value: React.SetStateAction<{}>) => void;
    rowSelection:{};
    selectedProduct:ProductDetails[];
    setSelectedProduct: React.Dispatch<React.SetStateAction<ProductDetails[]>>;
    quoteStatus:boolean;
    setQuoteStatus:React.Dispatch<React.SetStateAction<boolean>>;

}

const VaultContext = createContext< null| VaultProps>(null); 

const VaultProvider:FC = ({children})=> {

    const [listData, setListData] = useState();
    const [selectedProduct, setSelectedProduct] = useState();
    const [quoteStatus, setQuoteStatus] = useState();
    const [rowSelection, setCheckedRow] = useState({});
    const nameInputRef = useRef<HTMLTableElement>(null);

    return(
    <VaultContext.Provider value={{listData, setListData,setCheckedRow,rowSelection, nameInputRef, selectedProduct, setSelectedProduct,quoteStatus,setQuoteStatus}}>
        {children}
    </VaultContext.Provider>); 
}

export {VaultProvider,VaultContext}


