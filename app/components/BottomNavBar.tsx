"use client"
import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { fetchUnreadMsgCount } from "../lib/serverActions/fetchMessages"
import { useRouter } from "next/navigation"

export default function BottomNav() {
    const [unreadMsgCount, setUnreadMsgCount] = useState<number>(0)
    const { data: session } = useSession()
    const router = useRouter()
    
    // @ts-ignore
    const userId = session?.user?.userId

    const fetchUnreadMessages = async () => {
        if (!userId) return
        try {
            const count = await fetchUnreadMsgCount(userId)
            setUnreadMsgCount(count)
        } catch (error) {
            console.error("Failed to fetch unread messages:", error)
        }
    }

    useEffect(() => {
        if (!userId) return

        // Initial fetch
        fetchUnreadMessages()

        // Set up polling interval
        const interval = setInterval(fetchUnreadMessages, 10000)

        // Cleanup
        return () => clearInterval(interval)
    }, [userId]) // Add userId as 

    const navigateTo = (path: string) => {
        try {
            router.push(path)
        } catch (error) {
            console.error("Navigation failed:", error)
        }
    }

    const NotificationBadge = ({ count }: { count: number }) => (
        count > 0 ? (
            <div className="absolute w-5 h-5 bg-red-600 rounded-full right-2 -top-0 text-xs flex justify-center items-center text-slate-200">
                {count}
            </div>
        ) : null
    )

    return (
        <div className="w-[100%] fixed bottom-0 h-9 sm:hidden backdrop-blur bg-slate-950/60 flex justify-between items-center  px-10">
            <button 
                onClick={() => navigateTo("/messages")}
                className="relative p-2"
                aria-label="Messages"
            >
                <NotificationBadge count={unreadMsgCount} />
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="size-7 text-slate-200"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" 
                    />
                </svg>
            </button>
            
            <button 
                onClick={() => navigateTo("/createblimp")}
                className="p-2"
                aria-label="Create Blimp"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="size-8 text-slate-200"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" 
                    />
                </svg>
            </button>

            <button 
                onClick={() => navigateTo(`/dashboard?userId=${userId}`)}
                className="p-2"
                aria-label="Dashboard"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="size-7 text-slate-200"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" 
                    />
                </svg>
            </button>
        </div>
    )
}