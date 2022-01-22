import NextAuth from 'next-auth'; 
import {ObjectId } from 'mongoose'; 

declare module 'next-auth' {

    interface Session {
        user:{
            email:string,
            name:string,
            id:ObjectId,
            emailVerified:string
        }
    }
}