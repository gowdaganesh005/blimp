import { getServerSession } from "next-auth"
import NextAuth from "../../lib/NextAuth"
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/prisma/db"
import { writeFile } from "fs/promises"
import FileUpload from "@/app/lib/FileUpload"
import fs from "fs"


export async function POST(req:any){
    const data=await req.formData()
    const file=data.get('image')
    let url:string;
    if(file){
        let path
        try {
            const byteData=await file.arrayBuffer()
            const buffer=Buffer.from(byteData)
            path=`./public/${file.name}`
            await writeFile(path,buffer);
            
            console.log("Image uploaded to the  public folder now")
            
        } catch (error) {
            console.log("Could not upload the image to the public folder")
            return NextResponse.json({messsage:"upload failed something went wrong"},{status:500})

            
        }
        
       try {
         url=await FileUpload(path)
         console.log("Image uploaded to the  cloudinary  now")
         fs.unlinkSync(path)
       } catch (error) {
            console.log("Could not upload the image to the cloudinary ")
            fs.unlinkSync(path)
            return NextResponse.json({messsage:"upload failed something went wrong"},{status:500})
       }


       try {
                
                const session=await getServerSession(NextAuth)
                const content=data.get('data')
                console.log(content)
                const res=await prisma.post.create({
                    data:{
                        
                        userId:session.user.userId,
                        content,
                        imageUrl:url
                        
        
                    }
                })
                if(res){
                    return NextResponse.json({message:"Post Created Successfully"},{status:200})
                }
            } catch (error:any) {
                console.log(error?.message)
                return NextResponse.json({message:"Error creating the Post"},{status:500})
                
            }
        


    }

    
}
    
//     try {
//         const data=await req.formData()
//         const session=await getServerSession(NextAuth)
        
        
    
        
//         const content=data.get('data')
//         console.log(content)
//         const res=await prisma.post.create({
//             data:{
                
//                 userId:session.user.userId,
//                 content,
                

//             }
//         })
//         if(res){
//             return NextResponse.json({message:"Post Created Successfully"},{status:200})
//         }
//     } catch (error:any) {
//         console.log(error?.message)
//         return NextResponse.json({message:"Error creating the Post"},{status:500})
        
//     }

// }