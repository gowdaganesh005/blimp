'use server'

import prisma from "@/prisma/db"

export async function fetchMessages(loggeduser:string,viewingUser:string){
    try {
        const res = await prisma.messages.findMany({
            orderBy:{
                timestamp: 'asc'
            },
            take: 20,
            where:{
                OR:[
                    {
                        senderId:loggeduser,
                        recieverId:viewingUser
                    },
                    {
                        recieverId:loggeduser,
                        senderId:viewingUser
                    }
                ]
            }
        })
        return res
        
    } catch (error) {
        console.log(error)
        return null;
    }

}