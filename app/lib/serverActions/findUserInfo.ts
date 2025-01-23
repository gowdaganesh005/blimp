"use server"

import prisma from "@/prisma/db"



export default async  function  findUserInfo(followeeId:string,followerId?:string){
   
    try {
        const user=await prisma.user.findFirst({
                where:{
                    userId:followeeId
                },
                select:{
                    userId:true,
                    username:true,
                    fullName:true,
                    followerCount:true,
                    followingCount:true,
                    profilePhoto:true,
                    password:false
                }
            })
         if(followerId){
        const isfollowed=await prisma.following.findFirst({
            where:{
                followerId:followerId,
                followeeId:followeeId
            }
        })
    
        console.log(isfollowed)
        const finalUserData={...user,followed:(isfollowed?true:false)}
            console.log(finalUserData)
        return finalUserData
    }
    return {...user,followed:false}
    } catch (error) {
        return null  
    }
}