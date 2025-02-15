
import Card from "../components/Card";
import { getServerSession } from "next-auth";
import NextAuth from "../lib/NextAuth";
import { Post } from "../components/Post";
import axios from "axios";
import { redirect } from "next/navigation";
import { fetchUserPosts } from "../lib/serverActions/fetchUserPost";
import { Follow } from "../components/Follow";
import findUserInfo from "../lib/serverActions/findUserInfo";
import Button from "../components/Button";
import { EditButton } from "../components/ImageEditButton";
import DmSection from "../components/DmButton";






export default async  function Dashboard({searchParams}:any){
    const data=await getServerSession(NextAuth)
    const params=await searchParams
    const {userId}=params
    

    if(!data){
        redirect("/signup")
    }
    const {user}=data
    const viewUser=await findUserInfo(userId,user.userId)
    console.log(viewUser)

    const posts:any=await fetchUserPosts(userId)

    const isOwnUser=(user.userId===userId)

    
    
    // let posts;
    return(
        <>
            <div className="w-full flex flex-col items-center text-gray-300 max-w-[98%]">
                <Card className="max-w-md bg-gray-800 ">
                    <div className="p-3">
                        
                        <div className="flex justify-between">
                        <div className="flex">
                        {(viewUser?.profilePhoto)? (<img src={viewUser?.profilePhoto} className="w-24 h-24 rounded-full"/>):
                        (<svg xmlns="http://www.w3.org/2000/svg" 
                            fill="black" 
                            viewBox="0 0 24 24" 
                            strokeWidth={1.5} 
                            stroke="white" 
                            className="  size-24 ">
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>)
                        }               
                        <div>
                        <div className="font-bold md:text-3xl text-xl  pt-3 px-2">{viewUser?.fullName}</div>
                        <div className="px-2 font-semibold  ">@{viewUser?.username}</div>
                        </div>
                        
                        </div>
                        {isOwnUser?(<></>):(<div><Follow followeeId={userId || ""} followed={viewUser?.followed|| false}/></div>)}
                        
                        </div>
                        {isOwnUser?(<EditButton userId={userId}/>):(<></>)}
                        <div className="flex justify-between">
                        <div className="flex px-3">
                            <div className="pr-4 md:text-lg ">
                                { viewUser?.followerCount } Followers
                            </div>
                            <div className="pr-4 md:text-lg">
                                { viewUser?.followingCount } Following
                            </div>
                        </div>
                        <div>
                        {isOwnUser?(<></>):<DmSection profilePhoto={viewUser?.profilePhoto} fullName={viewUser?.fullName || ""} viewingUserId={userId}/>}
                        </div>
                        </div>
                        <div className="w-full h-0.5 bg-gray-600"></div>
                        <div>
                            <div className=" md:text-lg  text-sm px-4 font-semibold">Posts</div>
                        </div>
                        <div className="w-full h-0.5 bg-gray-700"></div>
                        <div>
                        {
                            (posts?(posts?.map((post:any)=>(
                                
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
                                

                            ))):(<div>{"No Posts Found"}</div>))
                        }
                        </div>
                        
                    </div>
                </Card>
            </div>
        </>
    )
}