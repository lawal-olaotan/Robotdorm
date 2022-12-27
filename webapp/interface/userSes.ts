import {ObjectId} from 'mongodb'

export type userInfo = {
    name?:string,
    email?:string,
}

export type userDetails ={
     name:string,
    email:string,
    _id:string,
    emailVerified:string
}

export type summmaryDetails = {
    EstTotalRevenue: string,
    EstTotalUnitsSold: string,
    EstAverageRevenue: string,
    AveragePrice: string,
    AverageRating: string,
    keyWord: string,
    _id:ObjectId
}

export interface ProductDetails{
    title:string,
    img:string,
    link:string,
    keyWord:string 
    price:string,
    sales:number,
    revenue:string
}

