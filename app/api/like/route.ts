import NextAuth from "@/app/lib/NextAuth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "redis";

const client=createClient()
try {
    client.connect()
} catch (error) {
    console.log(error)
}


export async function POST(req:NextRequest){
    try {
        const {user}=await getServerSession(NextAuth)
        const {postId}=await req.json()
        console.log(postId)
        
        const data={
            userId:user.userId,
            postId:postId
        }
        
        await client.lPush("likesQueue",JSON.stringify(data))
        return NextResponse.json({message:"success"})

    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Error"},{status:500})
    }
}