
import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"

export const POST=async (req:NextRequest)=>{
   
    try {
        const data=await req.json()
        console.log(data)
        // @ts-ignore
        const exists=await prisma.user.findFirst({
            where:{
                OR: [
                    { email: data.email },
                    { username: data.username }
                ]
            }

        })
        if(exists){
            return NextResponse.json({message:"User Already exists"},{status:409})
        }
        data.password=await bcrypt.hash(data.password,10)
        const user=await prisma.user.create({
            data:data
        })
        if(!user){
            return NextResponse.json({message:"Error creating User"},{status:501})
        }
        
        return NextResponse.json({message:"Successfully created the user"},{status:200})

    } catch (error:any) {
        console.log(error || "error")
        return NextResponse.json({message:"Something went wrong Sorry for Inconvinence"},{status:503})
    }
    
}