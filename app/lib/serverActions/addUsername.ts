'use server'
import prisma from "../../../prisma/db" 
export async function addUsername(email:string,username:string){
    try {
        await prisma.user.update({
            where:{
                email:email
            },
            data:{
                username:username,
                onboarded:true,
            }
        })
        return true;
    } catch (error:any) {
        console.log(error.data)
        return false
    }
}