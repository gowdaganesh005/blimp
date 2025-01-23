import { useRef, useState } from "react"

export function ImageUpload(){
    const fileInputRef=useRef<any>(null)
    const [file,setFile]=useState<File |null>(null)
    const [image,setImage]=useState<string | ArrayBuffer | null>(null)
    const photoiconClick=()=>{
        fileInputRef.current?.click()
        
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
    return(
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
    )
}