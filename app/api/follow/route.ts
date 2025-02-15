import { pushFollow } from "@/app/lib/bullMQ";
import NextAuth from "@/app/lib/NextAuth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        const {followeeId}=await req.json()

        const {user}=await getServerSession(NextAuth)
        const followerId=user.userId

        await pushFollow({followerId,followeeId})
        console.log("pushed follow request")
        return NextResponse.json({message:"success"})

    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"error"},{status:500})
    }
}