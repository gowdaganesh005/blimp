"use client"
import { useEffect, useState } from "react"
import Card from "./Card"
import Link from "next/link"
import { fetchUnreadMsgCount } from "../lib/serverActions/fetchMessages"
import ChatPage from "./ChatPage"
import { useRouter } from "next/navigation"




 function ProfileCard({userId,fullName,username,followers,following,profilePhoto}:any){
    const [message,setMessages] = useState(false)
    const router = useRouter()
    const [UnReadMsgCount,setUnReadMsgCount] = useState<number>(0)
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
        <div className="col-span-2 min-w-md z-20 ">
        <Card className="bg-slate-900">
            <div className="h-full text-gray-300">
                
                <div className="   -mt-10 flex flex-col   items-center justify-center ">
                    <div>
                        <div className="w-full flex justify-center">
                        {profilePhoto?(<img src={profilePhoto} className="size-20 rounded-full"/>):(
                        <svg xmlns="http://www.w3.org/2000/svg" 
                            fill="black" 
                            viewBox="0 0 24 24" 
                            strokeWidth={1.5} 
                            stroke="white" 
                            className="  size-20 ">
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        )}
                        </div>
                        <div className="mt-2 text-center text-lg font-medium">
                            {fullName}
                        </div>
                    </div>
                    <div  className="text-sm">
                        @{username}
                    </div>
                    
                    <div className="w-full grid grid-cols-2  my-2  ">
                        <div className="col-span-1  border-r-2 border-gray-500">
                            <div className="flex flex-col items-center">
                                {followers}
                                <div className="text-gray-400 text-sm ">
                                    Followers
                                </div>
                            </div>
                            
                        </div>
                        
                        <div className="col-span-1">
                            <div className="flex flex-col items-center">
                                {following}
                                <div className="text-gray-400 text-sm">
                                    Following
                                </div>
                            </div>
                        </div>

                    </div>       
                </div>
                

            </div>
        </Card>
        <div 
            onClick={()=>router.push(`/dashboard?userId=${userId}`)}
            className="w-full  bg-slate-900 text-slate-100 flex justify-center items-center p-2 rounded-md mx-1 lg:text-xl py-4">
            My Profile
            <div>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentcolor" 
                    className="size-7  mx-1"
                >
                <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" 
                />
                </svg>
            </div>
                
            </div>
        <div 
            onClick={()=>router.push('/messages')}
            className="w-full  bg-slate-900 flex justify-center items-center p-2 rounded-md mx-1 lg:text-xl py-4 my-1 text-gray-100">
            Messages
            <div className="relative">
             {UnReadMsgCount>0 ?<div className="absolute w-6 h-6  bg-red-600 rounded-full right-0 -top-3 text-xs flex justify-center text-gray-200 p-1 px-2">{UnReadMsgCount}</div>:<></>}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mx-2 ">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
            </div>
                
            </div>
        
        
        </div>
        
        </>
    )
}

export { ProfileCard }
