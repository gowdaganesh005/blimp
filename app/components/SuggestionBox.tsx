export function SuggestionBox({users}:any){
    return(
        <>  <div className="absolute z-10  w-[100%] rounded-xl h-full flex justify-center backdrop-blur-md ">
                <div className="w-1/2 h-fit  bg-slate-600 p-1 rounded ">
                    {users.map((user:any)=>{
                        return(
                            <div className="bg-slate-700 p-2 flex ">
                                { user.profilePhoto ? 
                                    (<img src={user.profilePhoto}  />):
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
                                }
                                <div>
                                    <div className="text-xl font-semibold px-2">{user.fullName}</div>
                                    <div className="text-xs -my-1 px-1">{`@${user.username}`}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}