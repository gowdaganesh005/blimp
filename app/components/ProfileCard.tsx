import Card from "./Card"

function ProfileCard(){
    return(
        <>
        <div className="col-span-2  ">
        <Card>
            <div className="h-full text-gray-300">
                <div className="h-20 bg-black w-full rounded-t-md">
                </div>
                <div className="  relative -mt-10 flex flex-col items-center ">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" 
                            fill="black" 
                            viewBox="0 0 24 24" 
                            strokeWidth={1.5} 
                            stroke="white" 
                            className="  size-20 ">
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        <div className="mt-2 text-center text-lg font-medium">
                            Guest
                        </div>
                    </div>
                    <div className="text-sm">
                        @username
                    </div>
                    <div>
                        "Your moto"
                    </div>
                    <div className="w-full grid grid-cols-2  my-2  ">
                        <div className="col-span-1  border-r-2 border-gray-500">
                            <div className="flex flex-col items-center">
                                {2912}
                                <div className="text-gray-400 text-sm ">
                                    Followers
                                </div>
                            </div>
                            
                        </div>
                        
                        <div className="col-span-1">
                            <div className="flex flex-col items-center">
                                {6013}
                                <div className="text-gray-400 text-sm">
                                    Following
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className=" w-full  border-t-2 flex justify-center p-4">
                        My Profile
                    </div>
                    
                    
                        
                </div>
                

            </div>
        </Card>
        </div>
        </>
    )
}

export { ProfileCard }