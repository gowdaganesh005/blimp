'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { fetchAllPrevSenders } from "../lib/serverActions/fetchMessages"
import { send } from "process"
import { DmSection } from "./DmSection"
import { redirect, useRouter } from "next/navigation"

export default function ChatPage(){
    const {data:session,status} = useSession()
    const router = useRouter()
    const [senders,setSenders] = useState<any>();
    const [newSenders,setnewSenders]  = useState<any>()
    const [chat,setChat] = useState<boolean>(false)
    const [data,setData] = useState<any>()
    // @ts-ignore
    const userId = session?.user?.userId

    
    async function fetchDmUsers(){
         const data =await fetchAllPrevSenders(userId)
         setSenders(data.userdata)
         setnewSenders(data.msgUser)
         console.log(data)
        
    }

    useEffect(()=>{
        
            fetchDmUsers()
            setInterval(()=>{
                fetchDmUsers()
            },15000)
        
        
    },[])
    if(status == 'unauthenticated'){
        redirect('/signup')
    }


    return (
        <>
        <div className="w-[98%] min-w-72 min-h-80 mr-1  h-[95%] opacity-100  z-30 rounded-xl">
            <div className="flex  text-2xl items-center justify-between w-full bg-gray-600 h-14 m-1 rounded p-4 font-bold mr-2"> 
                Messages
                <div
                    onClick={()=>router.push("/")} 
                    className="hover:bg-red-600 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6  ">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                </div>
            </div>
            
            <div>
                {senders?.map((ele:any)=>(
                    <div
                        
                        onClick={()=>{
                            setChat(prev=>!prev)
                            const newdata = {
                                profilePhoto: ele.profilePhoto,
                                fullName: ele.fullName,
                                viewinguserId : ele.userId
                            }
                            console.log(newdata)
                            setData(newdata)
                        }}
                        key={ele.userId} className="flex justify-between items-center bg-gray-700 my-1 ml-1 w-full rounded p-1 ">
                        <div className="flex items-center">
                        <div>{ele.profilePhoto?(
                            <img src={ele.profilePhoto} alt="" className="size-12 rounded-full"/>):
                            (<svg xmlns="http://www.w3.org/2000/svg" 
                                fill="black" 
                                viewBox="0 0 24 24" 
                                strokeWidth={1.5} 
                                stroke="white" 
                                className="  size-12 ">
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>)
                        }</div>
                        <div className="px-2 text-lg text-gray-300">{ele.fullName}</div>
                    </div >
                    
                   { newSenders.get(ele.userId)>0?<div className="rounded-full mx-3 text-xl h-7 w-7 flex justify-center items-center  bg-red-600 pb-0.5 text-white">{newSenders.get(ele.userId)}</div>:<></> }
                    </div>
                ))}
                <div className="h-[80%] fixed top-10 ">
                    {chat && (<DmSection profilePhoto={data.profilePhoto} fullName={data.fullName} viewingUserId={data.viewinguserId} setChat={setChat}/>)}
                </div>
            </div>
            

        </div>
        </>
    )
}