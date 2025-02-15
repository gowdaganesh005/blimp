"use server"
import fs from "fs";
import { writeFile } from "fs/promises";
import FileUpload from "../FileUpload";
import prisma from "@/prisma/db";

export async function updateDp(file:any,userId:string){
    if(file!=null){
        let path;
        let url:string | null=null;
        try {
            const byteData=await file.arrayBuffer()
            const buffer=Buffer.from(byteData)
            path=`./public/${file.name}`
            await writeFile(path,buffer);
            
            console.log("Image uploaded to the  public folder now")
            
        } catch (error) {
            console.log("Could not upload the image to the public folder")
            if(path) fs.unlinkSync(path)
            return false

            
        }
        
       try {
         url=await FileUpload(path)
         console.log("Image uploaded to the  cloudinary  now")
         fs.unlinkSync(path)
         
       } catch (error) {
            console.log("Could not upload the image to the cloudinary ")
            fs.unlinkSync(path)
            return false
       }
       try {
         await prisma.user.update({
            where:{
                userId
            },
            data:{
                profilePhoto:url
            }
            
         })
         return url
        
       } catch (error:any) {
            console.log(error?.message)
            return false
        
       }
    }
}