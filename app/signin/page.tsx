"use client"
import { signIn } from "next-auth/react";
import { Form,Field } from "../components/Form";
import { useRouter } from "next/navigation";
import Card from "../components/Card";
import { toast } from "react-toastify";

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
                toast.error("Invalid Credentials")
                return
            }
            
        } catch (error) {
            toast.error("Error Login the User")
            return
        }
        
        router.push("/")
        return




    }
    return(
        <>
        <div className="w-screen h-[80%] flex   items-center justify-center ">
            <div className="flex flex-col h-full justify-center">
            <Card className="bg-slate-700">
            <Form formName="Login To Your Account" fields={fields} ButtonName="LogIn" onSubmit={onSubmit} />
            </Card>
            </div>
        </div>
        </>
    )
}