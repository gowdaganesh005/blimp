"use server"
import prisma from "@/prisma/db"

export async function deletePost(postId:string){
    try {
        await prisma.likes.deleteMany({
            where:{
                postId
            }
        })
        await prisma.comments.deleteMany({
            where:{
                postId
            }
        })
        await prisma.post.delete({
            where:{
                postId:postId,
            },
               
    })

    return true
    } catch (error:any) {
        console.log(error?.message)
        return false
    }
}