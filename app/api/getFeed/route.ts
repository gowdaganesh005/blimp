import prisma from "@/prisma/db" 
import { NextRequest, NextResponse } from "next/server"

export async function POST(req:NextRequest){
    const  {userId}=await req.json()
    
    
    try{
        
        
        const post =await prisma.post.findMany({
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
                userId:userId
            },
            select:{
                postId:true
            }
            
        })
        const LikedPost=userLikedPost.map((obj)=>(obj.postId))
        // console.log(userLikedPost)
        const finalPosts=post.map(ele=>({...ele,isLiked:LikedPost.includes(ele.postId)}))
        // console.log(finalPosts)
        return NextResponse.json(finalPosts)

    }catch(error:any){
        console.log(error?.message)
        return NextResponse.json({
            data:error
        },{status:500})
    }
     
}



export async function GET(){
    
    
    
    try{
        
        
        const posts =await prisma.post.findMany({
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
        
        
        return NextResponse.json(posts)

    }catch(error:any){
        console.log(error?.message)
        return NextResponse.json({
            data:error
        })
    }
     
}