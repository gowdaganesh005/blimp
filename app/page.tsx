import { useSession } from "next-auth/react";
import { MainPage } from "./components/MainPage";
import { WebSocketContextProvider } from "./lib/WebSocketContext";
import { getServerSession } from "next-auth";
import NextAuth from "./lib/NextAuth";


export default async function Home() {
  const data = await getServerSession(NextAuth)
  
  return (
    <>
      <MainPage/>
    </>
  );
}


