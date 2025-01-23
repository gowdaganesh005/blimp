"use client"
import { useState } from "react"
import Card from "./Card"

import { useRouter } from "next/navigation"



export function CommentLayout({userId,postId,fullName,username,content,className,imageUrl,profilePhoto}:{
    userId:string
    postId:string
    fullName:string
    username:string 
    content: string 
    imageUrl?: string
    profilePhoto?:string
    className?:string
}){
    const router=useRouter()
    
    
    return(
        <>
        <div className={` w-[99.7%] flex justify-center`}>
        <Card className={`${className} border border-gray-800 bg-gray-800 pb-2`}>
            <div
            onClick={()=>router.push(`/dashboard?userId=${userId}`)}
            className="p-1 flex text-gray-200 overflow-y-auto ">
                {profilePhoto?(<><img src={profilePhoto} className="size-11 rounded-full" /></>):(
                <svg xmlns="http://www.w3.org/2000/svg" 
                    fill="black" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="white" 
                    className="size-11 ">
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>)}
                <div className="w-full">
                    <div className="flex justify-between w-full">
                        <div className="px-2 font-medium">
                            {fullName}
                        </div>
                        {/* <div className=" px-2  font-thin text-xs py-1">
                            2 mins ago
                        </div> */}
                    </div>
                    <div className="px-2 font-thin text-xs ">
                        {`@${username}`}
                    </div>
                </div>
            </div>
            <div className="pl-12 text-gray-300">
                <div>
                    {content}
                </div>
                <div className="w-64  flex justify-center max-h-64 px-2  overflow-hidden pb-3 mb-3">
                    <img 
                        src={imageUrl} 
                        alt="" 
                        className="center rounded-xl h-fit w-fit object-fill"/>
                </div>
                

            </div>
        </Card>
        </div>

        </>
    )
}