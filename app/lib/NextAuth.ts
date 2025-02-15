import prisma from "@/prisma/db"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcryptjs"
import { User } from "next-auth"
import { pages } from "next/dist/build/templates/app-page"
import { signIn } from "next-auth/react"



interface AuthUser extends User{
    id:string
    userId:string
    fullName:string
    username:string
    
}
const NextAuth={
    
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        }),
        
    ],
    secret:process.env.NEXTAUTH_SECRET,
    callbacks:{
        
        async jwt({token,user}:any){
            if(user){
                token.userId=user.userId,
                token.username=user.username,
                token.fullName=user.fullName,
                token.email = user.email
                token.onboarded = user.onboarded
            }
            return token
        },
        async session({session,token,user}:any){
            if(token){
                session.user.userId=token.userId,
                session.user.username=token.username,
                session.user.fullName=token.fullName,
                session.user.email = token.email
                session.user.onboarded = token.onboarded
            }
            return session
        },
        async signIn({user,profile}:any){
            if(!profile?.email){
                
                console.log("Error logging in ");

            }
            const dbuser =await prisma.user.upsert({
                where:{
                    email:profile.email
                },
                create:{
                    email: profile.email,
                    fullName: profile.name,
                    googleId: profile.sub,


                },
                update:{
                    
                    fullName:profile.name,
                },
                select:{
                    userId:true,
                    username:true,
                    email:true,
                    fullName:true,
                    onboarded:true,

                }
            })
            console.log(dbuser)
            user.userId = dbuser.userId
            user.fullName = dbuser.fullName
            user.username = dbuser.username
            user.onboarded = dbuser.onboarded
            return true;
        }
    },
    
    
    
    
}


export default NextAuth