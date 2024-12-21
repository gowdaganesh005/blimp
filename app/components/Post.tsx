import Card from "./Card"
export function Post({fullName,username,content,likes,comments,repost}:{
    fullName:string
    username:string 
    content: string 
    comments: number
    likes: number
    repost: number
}){
    return(
        <>
        <div className="w-[99.7%]">
        <Card>
            <div className="p-1 flex text-gray-200 overflow-y-auto ">
                <svg xmlns="http://www.w3.org/2000/svg" 
                    fill="black" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="white" 
                    className="size-11 ">
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <div className="w-full">
                    <div className="flex justify-between w-full">
                        <div className="px-2 font-medium">
                            {fullName}
                        </div>
                        <div className=" px-2  font-thin text-xs py-1">
                            2 mins ago
                        </div>
                    </div>
                    <div className="px-2 font-thin text-xs ">
                        {`@${username}`}
                    </div>
                </div>
            </div>
            <div className="pl-12 text-gray-300">
                <div>
                    {content}
                </div>
                <div className="py-3 flex justify-between">
                    <div className="flex flex-col items-center w-fit ">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24"
                            strokeWidth={1.5} 
                            stroke="currentColor" 
                            className="size-6">
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                        <div>
                        { likes } Likes
                        </div>
                    </div>
                    <div className="flex flex-col items-center w-fit mx-3">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24"
                            strokeWidth={1.5} 
                            stroke="currentColor" 
                            className="size-6">
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                        </svg>

                        <div>
                        { comments } Comments
                        </div>
                    </div>
                    <div className="flex flex-col items-center w-fit mx-3">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24"
                            strokeWidth={1.5} 
                            stroke="currentColor" 
                            className="size-6">
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                        </svg>
                        


                        <div>
                        { repost } Repost
                        </div>
                    </div>
                    <div className="flex flex-col items-center w-fit mx-5">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24"
                            strokeWidth={1.5} 
                            stroke="currentColor" 
                            className="size-6">
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                        </svg>
                        
                    </div>
                </div>

            </div>
        </Card>
        </div>

        </>
    )
}