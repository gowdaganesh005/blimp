import { ReactNode } from "react"
import { ProfileCard } from "./ProfileCard"
import { PostCard } from "./PostCard"
import {  Post } from "./Post"
import { Trending } from "./Trending"

function MainPage({children}:{children:ReactNode}){
    return(
        <>
        <div className=" h-full bg-gray-800 mx-4 rounded-lg grid grid-cols-10" >
            <div className="col-span-2 sticky ">
            <ProfileCard/>
            </div>
            <div className="col-span-6 mx-1 h-full  ">
                    <PostCard />
                    <div className="max-h-[calc(100vh-200px)] overflow-y-auto scroll-smooth  scrollbar-hidden ">
                        
                    </div>
            </div>
            <div className="col-span-2 mx-1 mr-2">
                <Trending/>
            </div>
        </div>
        </>
    )
}
export { MainPage }