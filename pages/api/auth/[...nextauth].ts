import NextAuth from 'next-auth'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import ClientPromise from '../../../lib/mongoDb'; 
import  EmailProvider from 'next-auth/providers/email';
import GoogleProvider from "next-auth/providers/google";
import {createTransport} from 'nodemailer'; 
import type { NextAuthOptions } from 'next-auth';
import { db, User , UserResponse } from 'util/db';
import crypto from "node:crypto"; 
import { returninUserTemplate } from 'template/returningUser';
import { newUserTemplate } from 'template/newUser';



interface userInfo {
  name:string,
  email:string,
  id:string,
  emailVerified:string,
  isPremium:boolean,
  service?:{
    used:number,
    total:number
  }
}
export const authOptions : NextAuthOptions = {
  secret: process.env.NEXT_SECRET,

  adapter:MongoDBAdapter(ClientPromise),
  session:{
     strategy:'database',
     maxAge: 7776000,
     updateAge: 7776000, 
  },
  providers:[
     EmailProvider({
      generateVerificationToken() {
        const random = crypto.randomBytes(8);
        return Buffer.from(random as any).toString("hex").slice(0,8)
      },
        server: {
           host: process.env.SMTP_SERVER,
           port: 587,
           auth:{
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_SECRET
           }
        },
        from:process.env.SMTP_EMAIL, 
        async sendVerificationRequest(params){
          const{ identifier:email, url, provider:{server,from}, token,theme} = params
           const transport = createTransport(server); 
          // check if user exists on db
          const dbClient = db();
          const user = await dbClient.getUserByEmail(email) as UserResponse ;
          if(!user){
            console.log('user not found')
          }

          let userObject = user as User;
          const isUserReturning = userObject.emailVerified !== 'not-verified'
    
          const subject = isUserReturning ? `Log in to RobotDorm ❤️` : `Sign up to RobotDorm ❤️`;
          const html = isUserReturning ? returninUserTemplate : newUserTemplate;
           await transport.sendMail({
              to:email,
              from,
              subject,
              html: html({url,email,token}) 
           })
        }
     }),
     GoogleProvider({
      clientId: process.env.G_CLIENT_ID,
      clientSecret: process.env.G_CLIENT_SECRET,
    }),
  ], 
  pages:{
     signIn:'/login',
     newUser: '/signup',
  },
  callbacks:{
    async session ({session}){
      let dbClient = db(); 
      const userDetails = await dbClient.getUserByEmail(session.user.email);
      if(!userDetails) return session
   
       const { _id,emailVerified,name,email,isPremium} =  userDetails as User;
       let userAccess = await dbClient.getAccessbyId(_id.toString()); 
       let service = !userAccess ? {total:5,used:0} : userAccess.services;

       if(!userAccess){
         //add default access for a new user
         const accessObject = {userId:_id.toString(),service}
         await dbClient.saveUserAccess(accessObject)
       }

        let user:userInfo = {
            id:_id.toString(),
           emailVerified:emailVerified as string,
           name,
           email,
           isPremium,
           service
        }
        session.user = user;
      return session
    },
    async signIn({user, account}){

      console.log(account.provi);
      return true
    }
 }
  
}

export default NextAuth(authOptions);

