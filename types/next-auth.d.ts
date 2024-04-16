import NextAuth from 'next-auth'; 
import {ObjectId} from 'mongodb'

declare module 'next-auth' {

    interface Session {
        user:{
            email:string,
            name:string,
            id:string,
            emailVerified:string
            isPremium:boolean,
            services?:{
                used:number,
                total:number
            }
        }
    }
}