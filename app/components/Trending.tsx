import Card from "./Card";

export function Trending(){
    return(
        <>
        <Card>
            <div className=" text-gray-200 text-xl p-2 py-3">
                Trending today
            </div>
            <div className=" text-gray-200 p-2">
                <div className="py-3">
                    <div>
                        {"#Goat"}
                    </div>
                    <div className="text-[13px] text-gray-400">
                        {"2.5k blimps"}
                    </div>
                </div>
                <div className="py-3">
                    <div>
                        {"#IndVsAus"}
                    </div>
                    <div className="text-[13px] text-gray-400">
                        {"2.5k blimps"}
                    </div>
                </div>
                <div className="py-3">
                    <div>
                        {"#Trophy"}
                    </div>
                    <div className="text-[13px] text-gray-400">
                        {"2.5k blimps"}
                    </div>
                </div>
                <div className="py-3">
                    <div>
                        {"#GoldRush"}
                    </div>
                    <div className="text-[13px] text-gray-400">
                        {"2.5k blimps"}
                    </div>
                </div>
                <div className="py-3">
                    <div>
                        {"#JEE"}
                    </div>
                    <div className="text-[13px] text-gray-400">
                        {"2.5k blimps"}
                    </div>
                </div>
                <div className="py-3">
                    <div>
                        {"#100days"}
                    </div>
                    <div className="text-[13px] text-gray-400">
                        {"2.5k blimps"}
                    </div>
                </div>
                
            </div>
        </Card>
        </>
    )
}