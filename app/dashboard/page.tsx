
import Card from "../components/Card";
import { getServerSession } from "next-auth";
import NextAuth from "../lib/NextAuth";
import { Post } from "../components/Post";
import axios from "axios";
import { redirect } from "next/navigation";
import { fetchUserPosts } from "../lib/serverActions/fetchUserPost";

const data=await getServerSession(NextAuth)




export default async  function Dashboard(){
    if(!data){
        redirect("/signin")
    }
    const {user}=data

    const posts:any=await fetchUserPosts(user.userId)
    
    
    // let posts;
    return(
        <>
            <div className="w-full flex flex-col items-center text-gray-300">
                <Card className="max-w-md bg-gray-800 ">
                    <div className="p-3">
                        <div className="text-2xl px-3 font-extrabold">My Profile</div>
                        <div className="w-full h-0.5 bg-gray-600"></div>
                        <div className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                            fill="black" 
                            viewBox="0 0 24 24" 
                            strokeWidth={1.5} 
                            stroke="white" 
                            className="  size-24 ">
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        <div>
                        <div className="font-bold text-3xl pt-3 px-2">Elon Musk</div>
                        <div className="px-2 font-semibold ">@elonmusk</div>
                        </div>
                        </div>
                        <div className="flex px-3">
                            <div className="pr-4 text-lg">
                                { 32 } Following
                            </div>
                            <div className="pr-4 text-lg">
                                { 10 } Followers
                            </div>
                        </div>
                        <div className="w-full h-0.5 bg-gray-600"></div>
                        <div>
                            <div className=" text-lg px-4 font-semibold">Posts</div>
                        </div>
                        <div className="w-full h-0.5 bg-gray-700"></div>
                        <div>
                        {
                            (posts?(posts?.map((post:any)=>(
                                
                                <Post 
                                
                                    key={post.postId}
                                    postId={post.postId} 
                                    fullName={post.user.fullName} 
                                    username={post.user.username} 
                                    content={post.content} 
                                    likes={post.Num_Likes}
                                    comments={post.Num_Comments}
                                    repost={post.Num_Repost}
                                    isLiked={post.isLiked}
                                />
                                

                            ))):(<div>{"No Posts Found"}</div>))
                        }
                        </div>
                        
                    </div>
                </Card>
            </div>
        </>
    )
}