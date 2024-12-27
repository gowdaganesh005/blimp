import Card from "../components/Card";
import { Post } from "../components/Post";
import Comment from "../components/Comment";

export default async function ViewPost({searchParams}:any){
    // const param=await searchParams;
    // const {postId}= param
    return (
        <>
        <div className="flex justify-center text-gray-300 ">
            <div>
            <Card className="  max-w-md p-3 pr-5 bg-gray-800">
            <Post
                    className=" p-2 text-balance bg-gray-950"
                    // key={post.postId}
                    userId={""}
                    postId={""} 
                    fullName={"Elon Musk"} 
                    username={"elonmusk"} 
                    content={"loremkfjakdfjak kdfjak dkdkfjklalkdjfklajdf akjsdf sdlkfjakdjfa kfjakld jfklajdf;d fkadjsfkajdf sdkfjaskldfjd kfakld adfkljafkdjalskd dflklasjdfklsjdadskld f"} 
                    likes={4}
                    comments={0}
                    repost={2}
                    isLiked={true}
                />
                <Card className=" w-[98%] ">
                    <div className="p-3 text-lg font-semibold">
                        Comments
                    </div>
                    <div className="w-full h-0.5 bg-gray-600"></div>
                    <div className="w-[99%]"><Comment/></div>
                    
                </Card>
            </Card>
            

            </div>
        </div>

        
        </>
    )
}