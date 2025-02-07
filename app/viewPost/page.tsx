import Card from "../components/Card";
import { Post } from "../components/Post";
import Comment from "../components/Comment";
import fetchPost from "../lib/serverActions/fetchposts";
import { getServerSession } from "next-auth";
import NextAuth from "../lib/NextAuth";
import { redirect } from "next/navigation";

export default async function ViewPost({searchParams}:any){
    const user=await getServerSession(NextAuth)
    if(!user){
        redirect("/signup")
    }
    const param=await searchParams;
    const {postId}= param
    const post=await fetchPost({postId})
    const data={
        postId,
        userId:post?.user.userId

    }
    return (
        <>
        <div className="flex justify-center text-gray-300 ">
            <div>
            <Card className="  max-w-md p-3 pr-5 bg-gray-800">
                
                    {post?(<>
                    <Post
                            className=" p-2 text-balance bg-gray-950"
                            // key={post.postId}
                            userId={post?.user.userId || ""}
                            postId={postId} 
                            fullName={post?.user.fullName} 
                            username={post.user.username || ""} 
                            content={post.content} 
                            likes={post.Num_Likes}
                            comments={post.Num_Comments}
                            repost={post.Num_Repost}
                            isLiked={post.isLiked}
                        />
                        <Card className=" w-[98%] ">
                            <div className="p-3 text-lg font-semibold">
                                Comments
                            </div>
                            <div className="w-full h-0.5 bg-gray-600"></div>
                            <div 
                            
                            className="w-full">
                                { post.Comments.map((comment)=>(<Comment key={comment.commentId} data={{...data,comment:comment.comment}}/>))
                                }
                                
                            </div>

                        </Card>
                    </>):<></>}
            
            </Card>
            

            </div>
        </div>

        
        </>
    )
}