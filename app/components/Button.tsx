export default function Button({name,handler}:{name:string,handler?:any}){
    return(
        <>
            <button
            type="submit"
            onClick={handler}
            className="bg-gray-300 p-1 px-3 rounded-full font-bold text-lg text-gray-800"
            >
                {name}
            </button>
        </>
    )
}