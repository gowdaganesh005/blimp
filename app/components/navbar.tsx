"use client"
import { useRouter } from "next/navigation"
import Button from "./Button"
import { signOut, useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import { searchUsers } from "@/prisma/SearchUsers"
import { SuggestionBox } from "./SuggestionBox"

function Navbar(){
    const router=useRouter()
    const {data:session,status}= useSession()
    const [search,setSearch] = useState<string | null>(null)
    const [searchUsers,setSearchUsers]=useState<any>([])
    const timeoutRef  = useRef<NodeJS.Timeout | null>(null)


    
    function debounce(func:(query:string)=>void,delay:number){
        return (query:string)=>{
        if(timeoutRef.current){
            clearTimeout(timeoutRef.current)
            
        }
        timeoutRef.current = setTimeout(()=>{
            func(query)
        },delay)
        
        }
    }

    const searchfn=async (query:string )=>{
        try {
            const users = await searchUsers(query)
            setSearchUsers(users);
        } catch (error) {
            console.log(error)
        }
    }

    const searchFuntion = debounce(searchfn,2000)

    useEffect(()=>{
        if(search)
        searchFuntion(search)

        return ()=> {if(timeoutRef.current){
            clearTimeout(timeoutRef.current)
        }}
    },[search])
    const LogOut=async ()=>{
        try{
        await signOut()
        
        }catch(error){
            toast.error("Error while Logging Out")
            return
        }
        console.log("log out")

    }
    console.log("rendering")

    return(
        
        <>
        <div className="w-full sticky top-0 overflow-hidden">
            <div className=" bg-gray-800 h-14 my-4 mx-3 rounded-3xl flex flex-col justify-center text-gray-200 backdrop-blur-lg bg-opacity-65 backdrop-opacity-30">
                <div className="flex justify-between items-center">
                    <div 
                        onClick={()=>router.push("/")}
                        className="text-3xl px-4 font-black ">
                        BLIMP
                    </div>
                    <div className="w-1/2 flex items-center justify-between bg-slate-800 rounded-full p-2 "> 
                        <div>
                            <input
                                value={search || ""} 
                                onChange={(e)=>setSearch(e.target.value)}
                                placeholder="Search"
                                type="text" 
                                className="rounded-full px-2 -my-3 bg-slate-800 w-[150%] outline-none " />

                        </div>
                        {search ? (
                            <div onClick={()=>setSearch(null)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </div>                          
                        ):(
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        )
                        }
                        
                        
                        
                    </div>
                    
                    <div className="text-xl px-4 font-bold ">
                        {
                            !(status==="authenticated")?(
                            <>
                                <Button name="SignIn" handler={()=>(router.push("/signin"))} className="mx-1"/>
                                <Button name="SignUp" handler={()=>(router.push("/signup"))} />
                            </>)
                            :   <Button name="LogOut" handler={LogOut}/>
                        }
                    </div>
                </div>
            </div>
        </div>
        {search && <SuggestionBox users ={[{fullName:"ramesh",username:"rameshtwt"}]}/>}
        
        </>
    )
}
export { Navbar }