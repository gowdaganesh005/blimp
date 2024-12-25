"use client"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"


enum like{
    none="none",
    red="red"
}
export default function LikeButton({postId,likes}:{postId:string,likes:number}){
    const router=useRouter()
    const [curLikes,setCurLikes]=useState(likes)
    const [likedButton,setLikedButton]=useState<like>(like.none)
    const {data:session,status}=useSession()
    
    const likeing=async ()=>{
        
        if(status==="unauthenticated"){
            toast.info("Login to your account")
            router.push("/signin")
            return 
        }
        
        setLikedButton(()=>(likedButton===like.none?like.red:like.none))
        setCurLikes((prev)=>(likedButton===like.none?prev+1:prev-1))
        try {
            await axios.post("http://localhost:3000/api/like",{postId})
            return
        } catch (error) {
            console.log(error)
            return
            
        }


    }
    return(
        <div>
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill={likedButton}
            viewBox="0 0 24 24"
            strokeWidth={1.5} 
            stroke={likedButton==="red"?"red":"currentColor"} 
            className="size-6 user-select-none"
            onClick={likeing}
            >
            <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
        <div>
            { curLikes } Likes
        </div>
        </div>
    )
}