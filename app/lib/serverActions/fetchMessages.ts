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
        await redis.del(`OfflineMessageUsers:${loggeduser}-${viewingUser}`)
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
    console.log(num)
    return Number.parseInt(num || '0')
} 

export async function fetchUnreadMsgSender(userId:string){
    let data;
    const senders =[]
    while((data = await redis.rPop(`OfflineMessageUsers:${userId}`))!=null){
        senders.push(data)
    }
    return senders
}

export async function fetchAllPrevSenders(userId:string){
    console.log(userId)
    const users = await prisma.messages.groupBy({
        where:{
            OR:[
                {
                    senderId:userId
                },{
                    recieverId:userId
                }
            ]
        },
        by:["senderId","recieverId"],
        _max: { timestamp: true}
        
    })
    console.log(users)
    const parsedUsers:string[] = []
    users.forEach(element => {
        if(element.senderId!= userId ){
            parsedUsers.push(element.senderId)
        }
         
        if(element.recieverId != userId){
            parsedUsers.push(element.recieverId)
        }
    });
    console.log(parsedUsers)
    const userdata = await prisma.user.findMany({
        where:{
            userId:{in: parsedUsers}
        },
        select:{
            fullName: true,
            username: true,
            userId: true,
            profilePhoto: true
        }
    })
    
    let msgUser = new Map()
    let count;
    for(const user of parsedUsers){
        console.log(`OfflineMessageUsers:${userId}-${user}`)
        if(Number.parseInt( count = await redis.get(`OfflineMessageUsers:${userId}-${user}`) || '0')>0){
            msgUser.set(user,count)
        }
    }

    await redis.del(`UnReadMessages:${userId}`)
    
    return {userdata,msgUser}
}