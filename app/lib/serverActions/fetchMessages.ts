'use server'

import prisma from "@/prisma/db"
import { createClient, RedisClientType } from 'redis'

export async function fetchMessages(loggeduser:string,viewingUser:string){
    try {
        const res = await prisma.messages.findMany({
            orderBy:{
                timestamp: 'desc'
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
        await prisma.messages.updateMany({
            where:{
                recieverId:loggeduser,
                senderId:viewingUser,
                read:false
            },
            data:{
                read:true
            }
        })
        return res
        
    } catch (error) {
        console.log(error)
        return null;
    }

}


export async function fetchMoreMessage(loggeduser:string,viewingUser:string,lasttimeStamp:Date ){
    const res = await prisma.messages.findMany({
        orderBy:{
            timestamp: "desc"
        },
        where:{
            OR:[
                {
                    senderId:loggeduser,
                    recieverId:viewingUser,
                    timestamp:{
                        lt:lasttimeStamp
                    }  
                },
                {
                    recieverId:loggeduser,
                    senderId:viewingUser,
                    timestamp:{
                        lt:lasttimeStamp
                    } 
                }
            ]
        },
        take:10
    })

    return res
}

let redis:RedisClientType;
const createRedisClient=async ()=>{
    redis =  createClient()
    await redis.connect()
   
}
createRedisClient()




export async function fetchUnreadMsgCount(userId:string){
    const num =await redis.get(`UnReadMessages:${userId}`)
    return Number.parseInt(num || '0')
} 