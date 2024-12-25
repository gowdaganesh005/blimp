
import axios from "axios"
import { Post } from "./Post"

export default async function Feed(){
    const {data}:any=await axios("http://localhost:3000/api/getFeed")
    // console.log(data)
    
 
    return(
        <>
        {
            (!(data?.data?.code))?(data?.map((post:any)=>(
                <Post
                    key={post.postId}
                    postId={post.postId} 
                    fullName={post.user.fullName} 
                    username={post.user.username} 
                    content={post.content} 
                    likes={post.Num_Likes}
                    comments={post.Num_Comments}
                    repost={post.Num_Repost}
                />
                
            ))):(<div>{"Could not fetch posts"}</div>)
        }
        </>
    )
}