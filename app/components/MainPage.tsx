
import { PostCard } from "./PostCard"
import Feed from "./Feed"
import ProfileComponent from "./ProfileServer"
import ChatPage from "./ChatPage"


function MainPage(){
    

    return(
        <>
        <div className=" h-full bg-black  rounded-lg sm:grid grid-cols-10 p-0.5 -my-3" >
            <div className="sm:col-span-2 hidden  sm:block my-10 ">
            <ProfileComponent/>
            </div>
            <div className="sm:col-span-6 mr-1 sm:ml-1 h-full col-span-10  top-0">
                    <PostCard />
                    <div className="max-h-[calc(100vh-100px)] overflow-y-auto scroll-my-1  scrollbar-hidden ">
                        <Feed/>
                    </div>
            </div>
            
        </div>
        </>
    )
}
export { MainPage }