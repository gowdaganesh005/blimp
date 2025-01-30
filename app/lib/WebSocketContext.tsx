'use client'
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { io , Socket } from 'socket.io-client'
import { useSession } from "next-auth/react";
import NextAuth from "./NextAuth";

interface WebSocketContextType{
    socket: Socket | null
}

const WebSocketContext = createContext<WebSocketContextType>({socket:null})

export const WebSocketContextProvider = (
    {children,session}:{children:ReactNode,session:any}
)=>{
    
    const[socket,setSocket] = useState<Socket | null>(null);

    useEffect(()=>{
        
        const newSocket = io("http://localhost:8000")
        setSocket(newSocket)
        
        newSocket.emit('authConnection',session?.user.userId)
        return(()=>{
            newSocket.disconnect()
        })
    },[session])
    return(
        <WebSocketContext.Provider value={{socket}}>
            {children}
        </WebSocketContext.Provider>
    )
    

}

export const useWebSocket = () =>{
    return(
        useContext(WebSocketContext)
    )
}