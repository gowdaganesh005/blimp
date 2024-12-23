import Button from "./Button"
function Navbar(){
    return(
        <>
        <div className="w-full sticky top-0 overflow-hidden">
            <div className=" bg-gray-800 h-14 my-4 mx-3 rounded-3xl flex flex-col justify-center text-gray-200 backdrop-blur-lg bg-opacity-65 backdrop-opacity-30">
                <div className="flex justify-between items-center">
                    <div className="text-3xl px-4 font-black ">
                        BLIMP
                    </div>
                    <div className="text-xl px-4 font-bold ">
                        <Button name="SignIn" />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export { Navbar }