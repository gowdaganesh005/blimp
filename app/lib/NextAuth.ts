import prisma from "@/prisma/db"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { User } from "next-auth"



interface AuthUser extends User{
    id:string
    userId:string
    fullName:string
    username:string
    
}
const NextAuth={
    providers:[
        CredentialsProvider({
            name:'Credentials',
            credentials:{
                username:{ label: "Username", type:"text",placeholder:"username"},
                password:{ label:"Password" ,type:"password" }
            },
            async authorize(credentials:any){
                if(credentials){
                try {
                    const user=await prisma.user.findFirst({
                        where:{
                            username:credentials?.username,  
                        },
                        select:{
                            fullName:true,
                            userId:true,
                            username:true,
                            password:true
                        }
                        
                    })
                    if(user){
                        const isValid=await bcrypt.compare(credentials?.password,user.password)
                        
                        if(isValid ){
                            const authUser:AuthUser={
                                id:user.userId,
                                userId:user.userId,
                                username:user.username,
                                fullName:user.fullName,
                                
                            }
                            
                            return authUser
                        }
                        else{
                            return null
                        }
                    }
                    else{
                        return null
                    }
                } catch (error) {
                    throw new Error("Error Validating the User")
                }
            }
            else{
                return null
            }

            }
        })
    ],
    secret:process.env.NEXTAUTH_SECRET,
    callbacks:{
        async jwt({token,user}:any){
            if(user){
                token.userId=user.userId,
                token.username=user.username,
                token.fullName=user.fullName
            }
            return token
        },
        async session({session,token,user}:any){
            if(token){
                session.user.userId=token.userId,
                session.user.username=token.username,
                session.user.fullName=token.fullName
            }
            return session
        }
    }
    
    
}


export default NextAuth