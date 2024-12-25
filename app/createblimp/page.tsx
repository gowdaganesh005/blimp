"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Card from "../components/Card"
import { ProfileCard } from "../components/ProfileCard"
import Button from "../components/Button"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

export default function createBlimp(){
    const router=useRouter()
    const [post ,setPost]=useState("")
    const {data:session,status}=useSession()
    if(status==="unauthenticated"){
        router.push("/signin")
        return
    }

    const submit=async ()=>{
        console.log(post)
        try {
            const res=await axios.post("http://localhost:3000/api/createPost" ,{data:post})
            if(res.status===200){
                toast.success("Successfully Dropped the Blimp")
                router.push("/")
                return
            }
            
        } catch (error) {
            toast.error("Error creating the Post")
            return   
        }
    }
    return(
        <>
            <div className="w-[98%] h-[90%]">
                <Card className="m-2 mr-4">
                    
                    <div className="grid grid-cols-10 ">
                        <div className="col-span-2 sticky ">
                            <ProfileCard/>
                        </div>
                        <div className="col-span-8 flex">
                        <Card className="p-2 m-2 border  border-gray-400">
                            <div className="p-1 mx-12 text-2xl font-bold text-gray-200">Drop a Blimp</div>
                            <div className="flex w-full h-[60%]">
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                fill="black" 
                                viewBox="0 0 24 24" 
                                strokeWidth={1.5} 
                                stroke="white" 
                                className="  size-12 ">
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>

                            <div className="w-[85%]">

                            <textarea
                                value={post} 
                                onChange={(e)=>setPost(e.target.value)} 
                                className="w-full h-full bg-gray-600 rounded-xl text-xl py-2 p-3 m-1 outline-none"
                                placeholder="What's happening ?"   
                            />
                            <div  className="flex justify-between ">
                            <div className="flex ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="size-7 ml-2 ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="size-7 mx-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                                </svg>
                            </div>

                            <Button name="Post" handler={submit}/>
                            </div>


                            </div>
                            
                            </div>
                            
                            
                        </Card>


                        </div>

                    </div>
                </Card>

            </div>
        </>
    )
}