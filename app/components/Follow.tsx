"use client"
import { useSession } from "next-auth/react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";



export function Follow({followeeId,followed}:{followeeId:string,followed:boolean}){
    const router=useRouter()
    const [follow,setfollow]=useState(followed)
    const {data:session ,status}=useSession()
    async function followAction(){
        if(status==="unauthenticated"){
            toast.info("Login to your account")
            router.push("/signup")
            return 
        }
        setfollow(prev=>!prev)
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/follow`,{followeeId})
            return
        } catch(error){
            console.log(error)
            return 
        }


    }
    
    return(
        <>
        <div className="my-3 ">
            {follow?(<Button className="text-white outline outline-white bg-slate-900 text-xs sm:text-base" name="Following" handler={followAction}/>)
            :(<Button className="text-xs sm:text-base" name="Follow" handler={followAction}/>)}
            
        </div>
        </>
    )
}