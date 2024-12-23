"use client"
import { signIn } from "next-auth/react";
import { Form,Field } from "../components/Form";
import { useRouter } from "next/navigation";

const fields:Field[]=[
    {
        name:"username",
        label:"Username",
        type:"text",
        placeholder:"Enter your Username"

    },
    {
        name:"password",
        label:"Password",
        type:"password",
        placeholder:"Enter your password"
    }
]




export default function SignIn(){
    const router=useRouter()
    const onSubmit=async (data:any)=>{
        const {username,password}=data   
        try {
            const res=await signIn("credentials",{
                redirect:false,
                username,
                password
            })
            console.log(res);
            if(res?.error){
                console.log(res.error)
                return
            }
        } catch (error) {
            console.log(error)
            return
        }
        router.push("/")
        return




    }
    return(
        <>
        <Form fields={fields} ButtonName="LogIn" onSubmit={onSubmit} />
        
        </>
    )
}