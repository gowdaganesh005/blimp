export function OTPBox(){
    return (
        <>
        <div className="p-2 text-lg font-bold text-gray-200 -mr-2 max-w-sm">OTP has been sent to Your Email</div>
            <div className="flex -mr-2  max-w-sm">
                <input type="number" className="otpInput"></input>
                <input type="number" className="otpInput"></input>
                <input type="number" className="otpInput"></input>
                <input type="number" className="otpInput"></input>
            </div>
        
        </>
    )
}