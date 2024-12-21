import Card from "./Card"

function PostCard(){
    return(
        <>
        <div className="mr-1">
        <Card >
            <div className="p-1 flex text-gray-400 py-3">
                <svg xmlns="http://www.w3.org/2000/svg" 
                    fill="black" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="white" 
                    className="  size-12 ">
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <div className="flex w-full items-center bg-gray-600 rounded-lg">
                <input 
                    className="px-3 bg-gray-600 mx-2 rounded-lg w-full h-[98%] focus:outline-none"
                    placeholder="What's happening?"  
                />
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="size-12 mx-2">
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>


                <button className="relative right-1 py-2 bg-gray-800 px-2 rounded "> SignUp</button>
                </div>
            </div>
        </Card>
        </div>
        
        </>
    )
}
export { PostCard }