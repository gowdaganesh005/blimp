
import { PostCard } from "./PostCard"
import Feed from "./Feed"
import ProfileComponent from "./ProfileServer"
import ChatPage from "./ChatPage"


function MainPage(){
    

    return(
        <>
<<<<<<< HEAD
        <div className=" h-full bg-gray-800 mx-1 rounded-lg md:grid grid-cols-10 p-0.5 -my-3" >
            <div className="md:col-span-2    md:sticky  md:block ">
            <ProfileComponent/>
            </div>
            <div className="md:col-span-6 mx-1 h-full col-span-10  top-0">
=======
        <div className=" h-full bg-gray-800 mx-4 rounded-lg grid grid-cols-10" >
            <div className="col-span-2 sticky ">
            <ProfileComponent/>
            </div>
            <div className="col-span-6 mx-1 h-full   ">
>>>>>>> parent of 5183ef3 (adding basic responsiveness:)
                    <PostCard />
                    <div className="max-h-[calc(100vh-200px)] overflow-y-auto scroll-smooth  scrollbar-hidden ">
                        <Feed/>
                    </div>
            </div>
            
        </div>
        </>
    )
}
export { MainPage }