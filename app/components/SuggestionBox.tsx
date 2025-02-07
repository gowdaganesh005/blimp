'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function SuggestionBox({users}:any){
    const [message , setMessage ] = useState<string | null>()
    useEffect(()=>{
        setTimeout(()=>{
            setMessage("No User Found")
        },10000)
    },[])
    const router = useRouter()
    console.log(users)
    return(
        <>  <div className="absolute z-10 mx-4  w-[100%] rounded-xl h-full flex justify-center backdrop-blur-md overflow-scroll scrollbar-hidden">
                <div className="w-1/2 h-fit  bg-slate-600 p-1 rounded ">
                    {users.length>0 ? users.map((user:any)=>{
                        return(
                            <div
                                onClick={()=>router.push(`/dashboard?userId=${user.userId}`)} 
                                key={user.userId}
                                className="bg-slate-700 p-2 flex my-1 rounded">
                                { user.profilePhoto ? 
                                    (<img src={user.profilePhoto} className="size-11 rounded-full" />):
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                        fill="black" 
                                        viewBox="0 0 24 24" 
                                        strokeWidth={1.5} 
                                        stroke="white" 
                                        className="size-11 ">
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                }
                                <div>
                                    <div className="text-xl font-semibold px-2">{user.fullName}</div>
                                    <div className="text-xs -my-1 px-1">{`@${user.username}`}</div>
                                </div>
                            </div>
                        )
                    }):(
                        <div className="bg-slate-700 p-2 flex my-1 rounded text-slate-300 font-semibold justify-center">
                            {
                                message ? <>{message}</>
                                :
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            }
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}