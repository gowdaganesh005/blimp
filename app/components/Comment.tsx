import { Post } from "./Post";

export default function comment(){
    return(
        <>
        <Post
            
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

        
        </>
    )
}