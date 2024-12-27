
import { pushComment } from "@/app/lib/bullMQ";
import NextAuth from "@/app/lib/NextAuth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {postId,comment}=await req.json()
    const {user}=await getServerSession(NextAuth)
    
    try {
        await pushComment({postId,userId:user.userId,comment})
        return NextResponse.json({message:"comment request sent"})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"failed"},{status:500})
        
    }
}