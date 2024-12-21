import { ReactNode } from "react";

export default function({children}:{children:ReactNode}){
    return(
        <>
        <div className={`w-full  bg-gray-700 rounded-md m-1`}>
            {children}
        </div>
        </>
    )
}