import { ReactNode } from "react";

export default function Card({children,className}:{children:ReactNode,className?:string}){
    return(
        <>
        <div className={`${className} w-full  bg-gray-700 rounded-md m-1`}>
            {children}
        </div>
        </>
    )
}