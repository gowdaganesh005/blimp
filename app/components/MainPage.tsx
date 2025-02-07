
import { PostCard } from "./PostCard"
import Feed from "./Feed"
import ProfileComponent from "./ProfileServer"
import  BottomNavBar  from "./BottomNavBar"


function MainPage(){
    

    return(
        <>
        <div className=" h-full bg-gray-800 mx-4 rounded-lg md:grid grid-cols-10" >
            <div className="md:col-span-2    md:sticky  md:block ">
            <ProfileComponent/>
            </div>
            <div className="md:col-span-6 mx-1 h-full col-span-10  top-0  ">
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