import { Queue } from "bullmq"
import { Redis } from "ioredis"

const redis=new Redis()

const WorkerQueue=new Queue("WorkerQueue",{connection:{
    port:6379
}})


export async function pushLike({userId,postId,liked}:{userId:string,postId:string,liked:boolean}){
    const data={
        userId,postId,liked
    }
    try {
        await WorkerQueue.add("likesQueue",data)
        return true
    } catch (error) {
        return false
    }
    
}

export async function pushFollow({followerId,followeeId}:{followerId:string,followeeId:string}){
    const data={
        followeeId,
        followerId
    }
    try {
        await WorkerQueue.add("followQueue",data)
        return true
    } catch (error) {
        return false
    }
}