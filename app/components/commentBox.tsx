"use client"
import { useState } from "react";
import Button from "./Button";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";


export default  function CommentBox({postId,username,userId,fullName}:{postId:string,username:string,userId:string,fullName:string}){
    const router=useRouter()
    const [comment,setComment]=useState("")
    const submit=async ()=>{
        try{
            const res=await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/createComment`,{postId,comment})
            if(res.status===200){
                router.push(`/viewPost?postId=${postId}`)
                return
            }
        }catch(error){
            toast.error("Error sending a comment")
            return
        }
    }
    return(
        <>
        <div>
           <div
            onClick={()=>router.push(`/dashboard?userId=${userId}`)}
            className="p-1 flex text-gray-200 overflow-y-auto ">
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
                </svg>
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
            <div className="w-[85%] mx-10 px-3  rounded py-2">
                <textarea  
                className=" w-full  px-3 bg-gray-600 rounded h-20 outline-none" 
                value={comment}
                onChange={e=>setComment(e.target.value)}
                />
                <div  className="flex justify-between ">
                   <div className="flex  ">
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
        </>
    )
}