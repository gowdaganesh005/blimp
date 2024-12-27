"use server"

import prisma from "@/prisma/db"
import { getServerSession } from "next-auth"
import NextAuth from "../NextAuth"


export async function fetchUserPosts(userId:string){
    try{
        const {user}=await getServerSession(NextAuth)
        console.log(user)
        const post =await prisma.post.findMany({
            where:{
                userId:userId
            },
            include:{
                user:{
                    select:{
                        userId:true,
                        username:true,
                        fullName:true,
                        
                    }
                }
            }
        })
        
        let userLikedPost=await prisma.likes.findMany({
            where:{
                userId:user.userId
            },
            select:{
                postId:true
            }
            
        })
        const LikedPost=userLikedPost.map((obj)=>(obj.postId))
        // console.log(userLikedPost)
        const finalPosts=post.map(ele=>({...ele,isLiked:LikedPost.includes(ele.postId)}))
        // console.log(finalPosts)
        return finalPosts
    }catch(error:any){
        console.log(error?.message)
        return null

    }

}