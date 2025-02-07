"use client"
import React, { useEffect, useState } from "react"
import {useSession} from "next-auth/react"
import { fetchUnreadMsgCount} from "../lib/serverActions/fetchMessages"
import { redirect } from "next/navigation"


export default function BottomNav(){
    const [UnReadMsgCount,setUnReadMsgCount] = useState<number>(0)
    const {data:session,status} = useSession()
    //@ts-ignore
    const userId = session?.user.userId
    async function UnreadMessageFetch(){
        const num = await fetchUnreadMsgCount(userId)
        setUnReadMsgCount(num)
    }

    useEffect(()=>{
        if(userId){
            UnreadMessageFetch()
            const interval =setInterval(async ()=>{
                UnreadMessageFetch()
                
                
            },10000)
            return ()=>clearInterval(interval)
        }
        
        
    },[])
    return(
        <>
        <div className="w-[98%] fixed bottom-0 h-10 sm:h-12  md:hidden background-blur bg-opacity-60 bg-slate-950 flex justify-between gap-10 items-center px-10">
            <div 
                onClick={()=>redirect("/messages")}
                className="relative">
                {UnReadMsgCount>0 ?<div className="absolute w-6 h-6  bg-red-600 rounded-full right-0 -top-3 text-xs flex justify-center text-gray-200 p-1 px-2">{UnReadMsgCount}</div>:<></>}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8  text-gray-200 ">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
            </div>
           
            
            <div
                onClick={()=>redirect('/createblimp')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 text-gray-200">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

            </div>
            <div
                onClick={()=>redirect(`/dashboard?userId=${userId}`)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 text-gray-200">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>

            </div>
            
        </div></>
    )
}