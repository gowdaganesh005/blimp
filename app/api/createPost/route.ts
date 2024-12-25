import { getServerSession } from "next-auth"
import NextAuth from "../../lib/NextAuth"
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/prisma/db"

export const POST=async (req:any,res:any)=>{
    const session=await getServerSession(NextAuth)
    const content=await req.json()
    try {
        const res=await prisma.post.create({
            data:{
                
                userId:session.user.userId,
                content:content.data
            }
        })
        if(res){
            return NextResponse.json({message:"Post Created Successfully"},{status:200})
        }
    } catch (error:any) {
        console.log(error?.message)
        return NextResponse.json({message:"Error creating the Post"},{status:500})
        
    }

}