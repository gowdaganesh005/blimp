"use server"

import prisma from "@/prisma/db"



export default async  function  findUser(field:string,value:string){
    let exists
    if(field=="email"){
        exists=await prisma.user.findFirst({
            where:{
                email:value
            }
        })
    }
    else if(field=="username"){
        exists=await prisma.user.findFirst({
            where:{
                username:value
            }
        })
    }
   if(exists){
    return true
   }
   return false
}