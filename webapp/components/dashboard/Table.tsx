import { NextPage } from 'next';
import { ProductDetails } from 'interface/userSes';


export const Table: NextPage<ProductDetails> = (SavedList) => {

    const {title,img,link,price,sales,revenue} = SavedList

    return (
        <>
        </>
    )
}