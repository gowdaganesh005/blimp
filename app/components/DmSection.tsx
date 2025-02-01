'use client'

import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react"
import { io ,Socket } from "socket.io-client"
import { fetchMessages, fetchMoreMessage } from "../lib/serverActions/fetchMessages"
import { timeStamp } from "console"

enum MessageType{
    sent = 'sent',
    recieved = 'recieved'
}

interface MessageStructureType{
    message:string,
    timeStamp?:Date
    type: MessageType,
    msgId:string
}

export function DmSection({profilePhoto,fullName,setChat,viewingUserId}:{profilePhoto?:string | null,fullName:string,setChat:any,viewingUserId:string}){
    const {data:session,status} = useSession()
    // @ts-ignore
    const userId = session?.user?.userId;
    const textarearef = useRef<any>(null)
    let socket = useRef<any>(null)
    let sendButtonRef = useRef<HTMLButtonElement>(null)
    let messageBarRef = useRef<HTMLDivElement>(null)
    const [input,setInput] = useState<string | null>(null)
    
    const [AllMessage,setAllMessage] = useState<MessageStructureType[]>([])

    function sendMessage(){
        console.log("hi from send ")
        console.log(input)
        if(input!='' && input != null){
            const Message : MessageStructureType = {
                message:input,
                type: MessageType.sent,
                msgId:Date.now().toString(),
                timeStamp: new Date(Date.now()),
            }
            console.log(Message)
            setAllMessage(prev=>[...prev,Message])
            if(socket.current) {
                socket.current.emit('messageUser',{recieverId:viewingUserId,payload:Message})
                
            }
            
        }   
        setInput('') 
    }

    async function fetchPrevMessages(){
        const prevMessagesdata = await fetchMessages(userId,viewingUserId)
        prevMessagesdata?.reverse()
        const prevMessages : MessageStructureType[] =[]
        if(prevMessagesdata){
            for(const ele of prevMessagesdata){
                const msg : MessageStructureType= {
                    msgId:ele.msgId,
                    message: ele.message,
                    timeStamp: ele.timestamp,
                    type: (ele.senderId==userId ? MessageType.sent : MessageType.recieved)
                }
                prevMessages.push(msg)
                // prevMessages.sort((ele1,ele2)=>{
                //     if(ele1.timeStamp && ele2.timeStamp && ele1.timeStamp < ele2.timeStamp){
                //         return -1
                //     }
                //     return 1
                // })
            }
            setAllMessage(prevMessages)
        }
        
    }
    
    
    useEffect(()=>{
        if(status!='unauthenticated' && userId){
            fetchPrevMessages();
            socket.current = io('http://localhost:8000')
            
            socket.current.emit('authConnection',userId)
            
            socket.current.on('messageUser',(data:any)=>{
                const parsedMessage:MessageStructureType={
                    msgId:data.msgId,
                    message:data.message,
                    type: MessageType.recieved,
                    timeStamp: new Date( Date.parse( data.timeStamp)),
                }
                console.log(parsedMessage)
                setAllMessage(prev=>[...prev,parsedMessage])
            })

        return(()=>{
            socket?.current.disconnect();
        })
        }
        

        
        
    },[])
    useEffect(()=>{
        if(messageBarRef.current){
            messageBarRef.current.scrollTop = messageBarRef.current.scrollHeight
        }
    },[AllMessage])
    const handleInput = (e:any)=>{
        
        setInput(e.target.value)
        if(e.target.value != '' && sendButtonRef.current){
            sendButtonRef.current.disabled=false
        }
        
        if(textarearef.current){
            textarearef.current.style.height = 'auto'
            textarearef.current.style.height = `${Math.min(textarearef.current.scrollHeight,120)}px`

        }
    }

    const showMoremessags =async ()=>{
        const lastTimeStamp = AllMessage[0].timeStamp 
        if(lastTimeStamp){
            let parsedMessages:MessageStructureType[]=[];
            const oldMessages = await fetchMoreMessage(userId,viewingUserId,lastTimeStamp)
            oldMessages.reverse()
            oldMessages.forEach(element => {
                const msg :MessageStructureType= {
                    message: element.message,
                    timeStamp : element.timestamp,
                    msgId: element.msgId,
                    type: (element.senderId==userId ? MessageType.sent : MessageType.recieved)
                }
                parsedMessages.push(msg)
                
            });
            setAllMessage([...parsedMessages,...AllMessage])
        }
    }
    return(
        <>
        <div className="fixed flex flex-col justify-between  right-0 top-20 sm:m-10 m-4 h-[80%] min-w-96 max-w-[500px] w-1/2   bg-gray-800  rounded-lg opacity-95 z-30 ">
            
            <div className="flex justify-between items-center m-3 bg-black opacity-100 rounded-full px-1  ">
                <div className="flex gap-3 items-center">
                {(profilePhoto!=null)?(<img src={profilePhoto} className="size-11 rounded-full" />):
                    (<svg xmlns="http://www.w3.org/2000/svg" 
                        fill="black" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="white" 
                        className="size-11 ">
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>)}
                    <div className="text-lg font-bold">
                        {fullName}
                    </div>
                </div>
                <div
                    onClick={()=>(setChat((prev:any) => !prev))} 
                    className="hover:bg-red-600 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6  ">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                </div>
            </div>
            <div ref={messageBarRef} className=" flex flex-col w-full p-2 text-gray-300  overflow-scroll scrollbar-hidden">
                <div 
                    onClick={showMoremessags}
                    className="w-full flex justify-center hover:text-gray-400">Show More</div>
                {AllMessage.map(msg=>(
                    <div key={msg.msgId} className={`w-full flex ${msg.type==MessageType.recieved ? 'justify-start ':'justify-end '}`}>
                    <div  className={`relative flex flex-col  ${msg.type==MessageType.recieved ? 'bg-blue-900 ':'bg-green-800 '} max-w-[60%] pt-1 px-4 pb-3 my-1 rounded-lg  text-base`}>
                        {msg.message}
                        <div className="-mr-3 mt-0.5 -mb-3 flex justify-end tracking-wide text-[0.7rem] bottom-0 i-end">
                        {msg.timeStamp?.toLocaleTimeString([],{hour12: true ,hour:'2-digit',minute:"2-digit"})}
                        </div>
                    </div>
                    </div>
                ))}
            </div>
            <div className=" flex items-center justify-between rounded-xl py-2 bg-gray-950 p-2 m-2 ">
                <textarea
                    value = {input || ""} 
                    onChange={handleInput}
                    ref={textarearef} 
                    className="w-[80%] bg-gray-950 p-2 px-3 rounded-xl  max-h-30  focus:outline-none overflow-scroll scrollbar-hidden"  />
                <button 
                    
                    ref={sendButtonRef}
                    onClick={sendMessage}
                    className="p-2 rounded-full bg-green-700 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6  ">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                </button>
            </div>
        </div>
        </>
    )
}