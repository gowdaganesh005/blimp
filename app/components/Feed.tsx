
import axios from "axios"
import { Post } from "./Post"
import { getServerSession } from "next-auth"
import NextAuth from "../lib/NextAuth"
import { isAnyArrayBuffer } from "util/types"
import { isArray } from "util"


export default async function Feed(){
    let res
    try {
        const {user}=await getServerSession(NextAuth)
        res=await axios.post("http://localhost:3000/api/getFeed",{userId:user.userId})

    } catch(error){
        res=await axios.get("http://localhost:3000/api/getFeed")
    }

    const {data}=res
    console.log(data)
    
    
    
    
    
    
    
    
 
    return(
        <>
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
                />
                
            ))):(<div>{"Could not fetch posts"}</div>)
        }
        </>
    )
}