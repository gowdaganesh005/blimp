"use client"
import { useRef, useState } from "react";
import Button from "./Button";
import { updateDp } from "../lib/serverActions/updateDP";

export function EditButton({userId}:{userId :string}){
    const [file,setFile]=useState<any>()
    
    const fileInputRef = useRef<any>(null)

    function handleFileChange(e:any){
        const file=e.target.files?.[0]
        if(file){
            const reader=new FileReader()
            reader.onloadend=()=>{
                setFile(reader.result)
            }
            reader.readAsDataURL(file)
            updateDp(file,userId)
            setFile(file)
        }
    }

    function ImagePicker(){
        fileInputRef.current?.click()
    }
    return(
        <>
        <Button 
            className="mx-6 md:text-base text-sm px-[9px]"
            name="Edit"
            handler={ImagePicker} />
            <input type="file" 
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}

            />
        </>
    )
}