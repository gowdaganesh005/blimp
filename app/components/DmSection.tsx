'use client'
import { useSession } from "next-auth/react"
import { useEffect, useRef } from "react"

export function DmSection({profilePhoto,fullName}:{profilePhoto?:string | null,fullName:string}){
    const {data:session,status} = useSession()
    const textarearef = useRef<any>(null)
    useEffect(()=>{
        
        
    })
    const handleInput = ()=>{
        if(textarearef.current){
            textarearef.current.style.height = 'auto'
            textarearef.current.style.height = `${Math.min(textarearef.current.scrollHeight,120)}px`
        }
    }
    return(
        <>
        <div className="fixed flex flex-col justify-between  right-0 top-20 sm:m-10 m-4 h-[80%] min-w-96 max-w-[500px] w-1/2   bg-gray-800  rounded-lg opacity-95 z-30 ">
            
            <div className="flex justify-between items-center m-3 bg-black opacity-100 rounded-full px-1  ">
                <div className="flex gap-3 items-center">
                {(profilePhoto!=null)?(<img src={profilePhoto} className="size-11 rounded-full" />):
                    (<svg xmlns="http://www.w3.org/2000/svg" 
                        fill="black" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="white" 
                        className="size-11 ">
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>)}
                    <div className="text-lg font-bold">
                        {fullName}
                    </div>
                </div>
                <div className="hover:bg-red-600 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6  ">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                </div>
            </div>
            <div className=" flex items-center justify-between rounded-xl py-2 bg-gray-950 p-2 m-2 ">
                <textarea 
                    onChange={handleInput}
                    ref={textarearef} 
                    className="w-[80%] bg-gray-950 p-2 px-3 rounded-xl  max-h-30  focus:outline-none overflow-scroll scrollbar-hidden"  />
                <div className="p-2 rounded-full bg-green-700 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6  ">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                </div>
            </div>
        </div>
        </>
    )
}