import axios from "axios"
import { Post } from "./Post"
import { getServerSession } from "next-auth"
import NextAuth from "../lib/NextAuth"
import { Suspense } from "react"




export default async function Feed(){
    let res
    try {
        const {user}=await getServerSession(NextAuth)
        res=await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getFeed`,{userId:user.userId})

    } catch(error){
        res=await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getFeed`)
    }

    const {data}=res

    
    
    
    
    
    
    
    
    
    
 
    return(
        <>
        <Suspense fallback={<Skeleton/>}>
        {
            (data[0]?.postId)?(data?.map((post:any)=>(
                
                <Post
                    key={post.postId}
                    userId={post.user.userId}
                    postId={post.postId} 
                    fullName={post.user.fullName} 
                    username={post.user.username} 
                    content={post.content} 
                    likes={post.Num_Likes}
                    comments={post.Num_Comments}
                    repost={post.Num_Repost}
                    isLiked={post.isLiked}
                    imageUrl={post.imageUrl}
                    profilePhoto={post.user.profilePhoto}
                />
                
            ))):(
            
            <div className="bg-slate-400 flex justify-center items-center font-medium rounded-lg ml-1 text-lg p-4 ">No Posts Available</div>)
        }
        </Suspense>
        </>

    )
}


function Skeleton(){
    return(
        <div className="animate-pulse">
        <div className="flex items-center mt-4">
           <svg className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
            </svg>
            <div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
        </div>
        </div>
    )
}