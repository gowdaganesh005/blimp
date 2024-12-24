"use client"
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Form,Field } from "../components/Form";
import { useRouter } from "next/navigation";
import Card from "../components/Card";
import prisma from "@/prisma/db";
import findUser from "../lib/serverActions/findUser";
import axios from "axios";
import { toast } from "react-toastify";

const Detailsfields:Field[]=[
    {
        name:"fullName",
        label:"Name",
        type:"text",
        placeholder:"Enter your Name"

    },
    {
        name:"email",
        label:"Email",
        type:"email",
        placeholder:"Enter your email"

    },
    {
        name:"password",
        label:"Password",
        type:"password",
        placeholder:"Enter your password"
    }
]




let Userdata={
    username:null,
    email:null,
    fullName:null,
    password:null,
}

export default function SignUp(){
    const [step,setStep]=useState(1)
    
    
    const router=useRouter()
    const onSubmit=async (data:any)=>{
        const {fullName,email,password}=data   
        try {
            const exists=await findUser("email",email)
            if(exists){
                toast.error("User with email already exists")
                return 
            }
            Userdata.email=email
            Userdata.fullName=fullName
            Userdata.password=password
            
            
        } catch (error) {
            toast.error("Error Creating User")
            return
        }
        setStep((prev)=>prev+1)
        return 
        
    }

    const registerUser=async (data:any)=>{
        const {username}=data
        try {
            const exists=await findUser("username",username)
            console.log(exists)
            if(exists){
                toast.error("User with username already exists")
                return 
            }
            Userdata.username=username
            const {password}=Userdata
            const res=await axios.post("http://localhost:3000/api/auth/signup",Userdata)
            if (res.status==200){
                const signInRes=await signIn("credentials",{
                    redirect:false,
                    username,
                    password
                })
                if(signInRes?.status==200){
                    router.push("/")
                    return
                }
                else{
                    toast.error("Error logging the user")
                    return
                }
                
            }
            else{
                toast.error("Error creating the User")
                return
            }
            

        } catch (error:any) {
            toast.error("Error creating the User")
            return
        }
        
    }
    return(
        <>
        <div className="w-screen h-[80%] flex   items-center justify-center ">
            <div className="flex flex-col h-full justify-center">
                <Card className="bg-slate-700">
                    
                    {   
                        step==1?(<Form formName="Login To Your Account" fields={Detailsfields} ButtonName="LogIn" onSubmit={onSubmit} />)
                        :step==2?(
                            <Form formName="Select a UserName" 
                                fields={[{name:"username",type:"text",label:"Username", placeholder:"Enter your Username"}]}
                                ButtonName="Create Account"
                                onSubmit={registerUser}
                            />
                        
                        )
                        :(<></>)
                    }
                
                </Card>
            </div>
        </div>
        </>
    )
}