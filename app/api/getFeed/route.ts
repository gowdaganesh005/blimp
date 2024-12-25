import prisma from "@/prisma/db" 
import { NextResponse } from "next/server"

export async function GET(){
    try{
        const post =await prisma.post.findMany({
            include:{
                user:{
                    select:{
                        userId:true,
                        username:true,
                        fullName:true
                    }
                }
            }
        })
        return NextResponse.json(post)

    }catch(error){
        
        return NextResponse.json({
            data:error
        })
    }
     
}