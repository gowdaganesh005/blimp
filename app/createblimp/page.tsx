"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Card from "../components/Card"
import Button from "../components/Button"
import { useRef, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import Image from "next/image"





export default function CreateBlimp(){
    const router=useRouter()
    const [post ,setPost]=useState("")
    const {data:session,status}=useSession()
    const fileInputRef=useRef<any>(null)
    const [file,setFile]=useState<File |null>(null)
    const [image,setImage]=useState<string | ArrayBuffer | null>(null)
    if(status==="unauthenticated"){
        router.push("/signup")
        return
    }
    const handleFileChange=(e:any)=>{
        const file=e.target.files?.[0]
        if(file){
            const reader=new FileReader()
            reader.onloadend=()=>{
                setImage(reader.result)
            }
            reader.readAsDataURL(file)
            setFile(file)
        }
    }


    const photoiconClick=()=>{
        fileInputRef.current?.click()
    }

    const submit=async ()=>{
        console.log(post)
        try {
            const form=new FormData()
            form.append("data",post)
            if(file){
                form.append("image",file)
            }
            console.log(form)
            const res=await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/createPost` ,form,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            if(res.status===200){
                toast.success("Successfully Dropped the Blimp")
                router.push("/")
                return
            }
            
        } catch (error) {
            toast.error("Error creating the Post")
            return   
        }
    }
    return(
        <>
            <div className="w-[98%] h-[90%]">
                <Card className=" bg-transparent m-2 mr-4 ">
                    
                    <div className="flex w-full justify-center">
                        
                        <div className=" flex w-full max-w-md    justify-center">
                        <Card className="p-2 m-2 border bg-transparent  pb-12 border-slate-950">
                            <div className="p-1  md:text-2xl font-bold  text-gray-200">Drop a Blimp</div>
                            <div className="flex w-full h-[60%] -ml-0.5">
                            

                            <div className="w-[99%] mr-1">

                            <textarea
                                value={post} 
                                onChange={(e)=>setPost(e.target.value)} 
                                className="w-full max-h-36 h-36 bg-slate-900 rounded-xl md:text-xl text-sm py-2 p-3 m-1 outline-none text-slate-100 shadow-md shadow-slate-800"
                                placeholder="What's happening ?"   
                            />
                            {image && (<div className="w-64  flex justify-center max-h-64 px-2  overflow-hidden pb-3 mb-3">
                                            <img 
                                                src={image.toString()} 
                                                alt="" 
                                                className="center rounded-xl h-fit w-fit object-fill"/>
                                        </div>)}
                            <div  className="flex justify-between ">
                            <div className="flex ">
                                <div onClick={photoiconClick}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="size-7 ml-2 ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                                <input type="file" 
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileChange}
                                
                                />
                                </div>
                            </div>

                            <Button name="Post" handler={submit}/>
                            </div>


                            </div>
                            
                            </div>
                            
                            
                        </Card>
                         
                        


                        </div>
                        
                        

                    </div>
                    
                </Card>

            </div>
        </>
    )
}