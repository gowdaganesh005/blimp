"use server"
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";
import NextAuth from "../NextAuth";

export default async  function fetchPost({postId}:{postId:string}){
    try {
        const {user}=await getServerSession(NextAuth)
        const post=await prisma.post.findUnique({
            where:{
                postId:postId
            },
            include:{
                user:{
                    select:{
                        userId:true,
                        username:true,
                        fullName:true,
                        profilePhoto:true
                        
                    }
                },
                Comments:true
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
        if(post){
            const LikedPost=userLikedPost.map((obj)=>(obj.postId))
        // console.log(userLikedPost)
            const finalPost={...post,isLiked:LikedPost.includes(post?.postId)}
        // console.log(finalPosts)
            return finalPost
    }
    return null
    } catch (error:any) {
        console.log(error?.message)
        return
    }
}