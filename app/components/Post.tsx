"use client"
import { useState } from "react"
import Card from "./Card"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import LikeButton from "./LikeButton"
import CommentButton from "./commentButton"
import Image from "next/image"
import { deletePost } from "../lib/serverActions/deletePost"


export function Post({userId,postId,fullName,username,content,likes,comments,repost,isLiked,className,imageUrl,profilePhoto}:{
    userId:string
    postId:string
    fullName:string
    username:string 
    content: string 
    comments: number
    likes: number
    repost: number
    isLiked:boolean
    className?:string,
    imageUrl?:string,
    profilePhoto?:string
}){
    const router=useRouter()
    const {data:session,status}= useSession()
    // @ts-ignore
    const loggedUser=session?.user?.userId
    const [opt,setOpt]=useState(false)
    function handleClick(){
        if(loggedUser==userId){
            setOpt(!opt)
        }
        
    }

    async function clickDelete(){
        if(loggedUser==userId){
            const result=await deletePost(postId)
            if(result){
                router.push('/')
            }
            else{
                toast.error('Error deleting the post ')
                return
            }

        }
        
    }
    
    
    return(
        <>
        <div 
        
        className={` w-[99.7%] z-0`}>
        <Card className={`${className}`}>
            <div
            onClick={()=>router.push(`/dashboard?userId=${userId}`)}
            className="p-1 flex text-gray-200 overflow-y-auto ">
                {(profilePhoto!=null)?(<img src={profilePhoto} className="size-11 rounded-full" />):
                (<svg xmlns="http://www.w3.org/2000/svg" 
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
            <div className="pl-12  text-gray-300">
                <div onClick={()=>router.push(`/viewPost?postId=${postId}`)}>
                    {content}
                </div>
                {imageUrl && 
                    (<div className="max-w-98   my-2 ">
                        <img 
                        src={imageUrl}
                        width={200}
                        height={100}
                        alt="" 
                        className="w-full max-h-72 h max-w-[90%] object-contain "/>
                    </div>)
                }

                <div className="py-3 flex justify-between">
                    
                    <div className="flex flex-col items-center w-fit ">
                        <LikeButton postId={postId} likes={likes} isLiked={isLiked}/>
                    </div>
                    
                    <div className="flex flex-col items-center w-fit mx-3">
                        <CommentButton num={comments} postId={postId}/>
                    </div>
                    {/* <div className="flex flex-col items-center w-fit mx-3">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24"
                            strokeWidth={1.5} 
                            stroke="currentColor" 
                            className="size-6">
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                        </svg>
                        


                        <div>
                        { repost } Repost
                        </div>
                    </div> */}
                    <div className="relative flex flex-col w-fit mr-5 z-0">
                        {opt && 
                            <div className=" absolute bg-gray-900 w-20  overflow-y-visible -mx-16 -my-8 px-2 py-1"
                                 onClick={clickDelete}>
                                Delete
                            </div>
                        }   
                        {opt &&  <button onClick={handleClick} 
                        className=" z-0">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24"
                            strokeWidth={1.5} 
                            stroke="currentColor" 
                            className="size-6 z-0">
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                        </svg>
                        </button>}
                        
                        
                        
                    </div>
                </div>

            </div>
        </Card>
        </div>

        </>
    )
}