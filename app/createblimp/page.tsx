"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Card from "../components/Card"

export default function createBlimp(){
    const router=useRouter()
    const {data:session,status}=useSession()
    if(status==="unauthenticated"){
        router.push("/signin")
        return
    }
    return(
        <>
            <div className="w-[98%] h-[90%]">
                <Card className="m-2 mr-4">
                    hi
                </Card>

            </div>
        </>
    )
}