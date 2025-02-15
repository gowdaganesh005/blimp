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
        <div className="mr-1">
           <div
            onClick={()=>router.push(`/dashboard?userId=${userId}`)}
            className="p-1  flex text-gray-200 overflow-y-auto bg-slate-700">
                
                <div className="w-full">
                    <div className="flex justify-between w-full">
                        <div className="px-2 text-sm sm:text-base font-medium">
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
            <div className="w-full  px-3  rounded ">
                <textarea  
                className=" w-full  font-extralight  px-3 sm:text-lg text-sm bg-slate-600 rounded h-20 outline-none" 
                value={comment}
                onChange={e=>setComment(e.target.value)}
                />
                <div  className="flex justify-between ">
                   <div className="flex  ">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="size-7 ml-2 ">
                           <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                       </svg>

                       
                   </div>

                   <Button name="Post" handler={submit}/>
                   </div>


                
            </div>
        </div>
        </>
    )
}