import findUserInfo from "../lib/serverActions/findUserInfo";
import { CommentLayout } from "./Commentlayout";


export default async function comment(data:any){
    const user=await findUserInfo(data.userId)
    console.log(data.data)
    return(
        <>
        
        {data?(user?(<CommentLayout
            
            key={data.commentId}
            
            userId={user?.userId || ""}
            postId={data.data.postId} 
            fullName={user.fullName || ""} 
            username={user.username || ""} 
            content={data.data.comment} 
            
        />):<></>):<></>}

        
        </>
    )
}