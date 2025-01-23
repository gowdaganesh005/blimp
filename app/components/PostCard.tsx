"use client"
import { useRouter } from "next/navigation"
import Card from "./Card"

function PostCard(){
    const router=useRouter()
    return(
        <>
        <div className="mr-1">
        <Card >
            <div className="p-1 flex text-gray-400 py-3">
                <svg xmlns="http://www.w3.org/2000/svg" 
                    fill="black" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="white" 
                    className="  size-12 ">
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <div className="flex justify-between  w-full items-center bg-gray-600 rounded-lg">
                    <div className="flex items-center px-3">Create a Blimp</div>
                    <button className="relative right-1 py-2 bg-gray-800 px-2 rounded "
                    onClick={()=>router.push("/createblimp")}
                    > 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </Card>
        </div>
        
        </>
    )
}
export { PostCard }