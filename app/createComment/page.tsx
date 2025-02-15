import Card from "../components/Card";
import { Post } from "../components/Post";
import CommentBox from "../components/commentBox";
import fetchPost from "../lib/serverActions/fetchposts";
import { getServerSession } from "next-auth";
import NextAuth from "../lib/NextAuth";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

export default async function createComment({searchParams}:any){
    const param=await searchParams;
    const {postId}= param
    const post=await fetchPost({postId})
    let user=await getServerSession(NextAuth)
    if(!user){
        toast.info("Login to proceed")
        redirect('/signin')
        return
    }
    user=user.user

    return (
        <>
        <div className="flex justify-center text-gray-300 ">
            <div>
            <Card className="  max-w-md p-3 pr-5 bg-gray-800">
            {post?(
                <>
                <Post
                    className=" p-2 text-balance bg-gray-950"
                    key={post.postId}
                    userId={post?.user.userId}
                    postId={post.postId} 
                    fullName={post.user.fullName} 
                    username={post.user.username} 
                    content={post.content} 
                    likes={post.Num_Likes}
                    comments={post.Num_Comments}
                    repost={post.Num_Repost}
                    isLiked={post.isLiked}
                    imageUrl={post.imageUrl || ""}
                    profilePhoto={post.user.profilePhoto || ""}
                />
                <Card className=" w-[98%] ">
                    <CommentBox postId={post.postId} userId={user.userId} fullName={user.fullName} username={user.username}/>
                    
                </Card>
                </>
                ):<></>}
            </Card>
            

            </div>
        </div>

        
        </>
    )
}